import OLProjection from 'ol/proj/Projection';
import { PolyfillExtent } from '../../../polyfills/PolyfillExtent';
import { AlloyMapError } from '../../core/AlloyMapError';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyFeatureType } from '../../features/AlloyFeatureType';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyFeatureLoaderFunction } from '../AlloyFeatureLoaderFunction';
import { AlloyClusterLayer } from './AlloyClusterLayer';

export class AlloyClusterFeatureLoaderFunction implements AlloyFeatureLoaderFunction {
  private readonly layer: AlloyClusterLayer;
  private readonly olLayerExtent: [number, number, number, number];

  constructor(layer: AlloyClusterLayer) {
    this.layer = layer;
    // calculate the extent once and cache
    this.olLayerExtent = layer.extent.toMapExtent();
  }

  public async func(
    extent: [number, number, number, number],
    resolution: number,
    projection: OLProjection,
  ): Promise<void> {
    // short circuit if the view is out of bounds
    if (!PolyfillExtent.intersects(this.olLayerExtent, extent)) {
      return;
    }

    // calculate the zoom level for the current resolution
    const zoom = this.layer.olTileGrid.getZForResolution(resolution);

    const requests: Array<Promise<Array<AlloyItemFeature | AlloyClusterFeature>>> = [];

    // iterate through tile coords for the current extent and zoom
    this.layer.olTileGrid.forEachTileCoord(extent, zoom, (coordinate: [number, number, number]) => {
      // short circuit if the tile is out of bounds
      if (!PolyfillExtent.intersects(this.olLayerExtent, extent)) {
        return;
      }

      // make an outgoing request for the tile we want
      requests.push(this.requestTile(coordinate));
    });

    if (requests.length > 0) {
      const results = await Promise.all(requests);
      results.forEach((features) => {
        this.layer.addFeatures(features);
      });
    }
  }

  private async requestTile(
    coordinate: [number, number, number],
  ): Promise<Array<AlloyItemFeature | AlloyClusterFeature>> {
    const response = await this.layer.map.api.layer.layerGetClusterLayerTile(
      this.layer.layerCode,
      coordinate[0],
      coordinate[1],
      coordinate[2],
      [],
    );

    // there be demons ahead! be warned we are working with a plain'ol JavaScript object for each
    // result in the following process, be careful when modifying these and make sure they match
    // what the service is giving us. Think about performance because there could be MANY results
    // and this is called potentially 30-40 times in a second when panning
    return response.results.map((r: any) => {
      switch (r.properties.type) {
        case AlloyFeatureType.Cluster:
          return new AlloyClusterFeature(this.layer.olFormat.readFeature(r), r.properties);
        case AlloyFeatureType.Item:
          return new AlloyItemFeature(this.layer.olFormat.readFeature(r), r.properties);
        default:
          throw new AlloyMapError(1553737510, {
            message: `unhandled alloy feature type ${r.properties.type}, expected Cluster or Item`,
          });
      }
    });
  }
}
