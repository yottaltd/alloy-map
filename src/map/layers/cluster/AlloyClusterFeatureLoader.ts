/* eslint-disable max-len */

import { LayerApiFetchParamCreator } from '@/api/LayerApiFetchParamCreator';
import { LayerGetClusterTileWebResponseModel } from '@/api/LayerGetClusterTileWebResponseModel';
import { AlloyMapError } from '@/error/AlloyMapError';
import { AlloyClusterFeature } from '@/map/features/AlloyClusterFeature';
import { AlloyFeatureType } from '@/map/features/AlloyFeatureType';
import { AlloyItemFeature } from '@/map/features/AlloyItemFeature';
import { AlloyClusterLayer } from '@/map/layers/cluster/AlloyClusterLayer';
import { AlloyTileCoordinate } from '@/map/layers/loaders/AlloyTileCoordinate';
import { AlloyTileFeatureLoader } from '@/map/layers/loaders/AlloyTileFeatureLoader';
import { AlloyTileFeatureRequest } from '@/map/layers/loaders/AlloyTileFeatureRequest';
import { tileResponseInterceptor } from '@/map/layers/loaders/tileResponseInterceptor';
import { PolyfillTileGrid } from '@/polyfills/PolyfillTileGrid';
import { FeatureUtils } from '@/utils/FeatureUtils';
import { ProjectionUtils } from '@/utils/ProjectionUtils';
import OLGeoJSON from 'ol/format/GeoJSON';

/* eslint-enable max-len */

/**
 * max zoom level supported for the tile grid (won't make requests beyond this point)
 * @ignore
 */
const TILE_GRID_MAX_ZOOM = 16;

/**
 * loads cluster layer features from the alloy api
 * @ignore
 * @internal
 */
export class AlloyClusterFeatureLoader extends AlloyTileFeatureLoader<
  AlloyClusterFeature | AlloyItemFeature
> {
  /**
   * the layer we are loading features for
   * @ignore
   * @internal
   */
  private readonly layer: AlloyClusterLayer;

  /**
   * the computed style ids for the current layer to loader
   * @ignore
   * @internal
   */
  private readonly styleIds: string[];

  /**
   * the format to load features in
   */
  private readonly olFormat = new OLGeoJSON();

  /**
   * indicates whether to clear the source the next time tiles load
   */
  private shouldClearSource = false;

  /**
   * creates a new instance
   * @param layer the layer to load features for
   * @ignore
   * @internal
   */
  constructor(layer: AlloyClusterLayer) {
    super(
      PolyfillTileGrid.createXYZ({ maxZoom: TILE_GRID_MAX_ZOOM }),
      layer.bounds.toMapExtent(),
      layer.debugger,
    );
    this.layer = layer;
    // calculate the style ids and cache
    this.styleIds = layer.styles.map((s) => s.styleId);
  }

  /**
   * sets the internal flag to clear the source on next valid tile load
   */
  public clearSourceOnNextLoad(): void {
    this.shouldClearSource = true;
  }

  /**
   * @override
   */
  protected getResolution(): number {
    return this.layer.map.olView.getResolution();
  }

  /**
   * @override
   */
  protected featuresLoaded(features: Array<AlloyClusterFeature | AlloyItemFeature>): void {
    // check if we need to clear the source before adding features
    if (this.shouldClearSource) {
      this.shouldClearSource = false;
      this.layer.clearFeatures();
    }
    this.layer.addFeatures(features);
  }

  /**
   * @override
   */
  protected requestTile(
    coordinate: AlloyTileCoordinate,
  ): AlloyTileFeatureRequest<AlloyClusterFeature | AlloyItemFeature> {
    const request = new AlloyTileFeatureRequest<AlloyClusterFeature | AlloyItemFeature>(coordinate);

    // start the http request (promisified), make sure this is setup before we return because others
    // will be listening for this to finish
    request.result = new Promise<Array<AlloyClusterFeature | AlloyItemFeature>>(
      (resolve, reject) => {
        try {
          const signal = request.controller.signal;

          const configuration = this.layer.map.apiConfiguration;
          const fetchCreator = LayerApiFetchParamCreator(configuration);
          const fetchArgs = fetchCreator.layerGetClusterLayerTile(
            this.layer.layerCode,
            coordinate.x, // x
            coordinate.y, // y
            coordinate.z, // z
            this.styleIds,
          );

          fetch(configuration.basePath + fetchArgs.url, {
            ...fetchArgs.options,
            signal,
          })
            .then((response) =>
              tileResponseInterceptor<LayerGetClusterTileWebResponseModel>(response),
            )
            .then((response) => resolve(this.parseResults(response)))
            .catch((error) => reject(error));
        } catch (e) {
          reject(e);
        }
      },
    );

    return request;
  }

  /**
   * parses a tile response into its features
   * @param response the response model to parse
   */
  private parseResults(
    response: LayerGetClusterTileWebResponseModel,
  ): Array<AlloyClusterFeature | AlloyItemFeature> {
    // return early if no results
    if (response.results.length === 0) {
      return [];
    }

    // first convert the results into openlayers features, use the bulk method as its optimised
    const olFeatures = this.olFormat.readFeatures(
      // wrap the results as a "feature collection" so we can use the bulk method
      {
        type: 'FeatureCollection',
        features: response.results,
      },
      {
        // the projection to convert the data into (should match the layer)
        featureProjection: ProjectionUtils.MAP_PROJECTION,
        // the projection the data is expected to be in
        dataProjection: ProjectionUtils.API_PROJECTION,
      },
    );

    // there be demons ahead! be warned we are working with a plain'ol JavaScript object for each
    // result in the following process, be careful when modifying these and make sure they match
    // what the service is giving us. Think about performance because there could be MANY results
    // and this is called potentially 30-40 times in a second when panning
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.results.map((r: any /* we don't have typings */, i: number) => {
      // we switch on "type" we know this exists because of the spec for the cluster endpoint
      const olFeature = olFeatures[i];

      const featureId = FeatureUtils.createFeatureId(this.layer.layerCode, olFeature);
      switch (r.properties.type) {
        case AlloyFeatureType.Cluster:
          return new AlloyClusterFeature(featureId, olFeature, r.properties, this.layer.id);
        case AlloyFeatureType.Item:
          return new AlloyItemFeature(featureId, olFeature, r.properties, this.layer.id);
        default:
          throw new AlloyMapError(
            1553737510,
            `unhandled alloy feature type ${r.properties.type}, expected Cluster or Item`,
          );
      }
    });
  }
}
