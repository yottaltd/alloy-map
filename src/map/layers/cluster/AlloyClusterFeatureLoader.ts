import OLGeoJSON from 'ol/format/GeoJSON';
import { PolyfillTileGrid } from '../../../polyfills/PolyfillTileGrid';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { ProjectionUtils } from '../../../utils/ProjectionUtils';
import { AlloyMapError } from '../../core/AlloyMapError';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyFeatureType } from '../../features/AlloyFeatureType';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyTileFeatureLoader } from '../loaders/AlloyTileFeatureLoader';
import { AlloyClusterLayer } from './AlloyClusterLayer';

/**
 * max zoom level supported for the tile grid (won't make requests beyond this point)
 * @ignore
 */
const TILE_GRID_MAX_ZOOM = 18;

/**
 * loads cluster layer features from the alloy api
 * @ignore
 */
export class AlloyClusterFeatureLoader extends AlloyTileFeatureLoader<
  AlloyClusterFeature | AlloyItemFeature
> {
  /**
   * the layer we are loading features for
   */
  private readonly layer: AlloyClusterLayer;

  /**
   * the computed style ids for the current layer to loader
   */
  private readonly styleIds: string[];

  /**
   * the format to load features in
   */
  private readonly olFormat = new OLGeoJSON();

  /**
   * indicates whether to clear the source the next time tiles load
   */
  private shouldClearSource: boolean = false;

  /**
   * creates a new instance
   * @param layer the layer to load features for
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
  public clearSourceOnNextLoad() {
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
  protected async requestTile(
    x: number,
    y: number,
    z: number,
  ): Promise<Array<AlloyClusterFeature | AlloyItemFeature>> {
    const response = await this.layer.map.api.layer.layerGetClusterLayerTile(
      this.layer.layerCode,
      x,
      y,
      z,
      this.styleIds,
    );

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
