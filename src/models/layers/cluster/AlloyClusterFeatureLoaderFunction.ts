import OLProjection from 'ol/proj/Projection';
import { AlloyFeatureLoaderFunction } from '../AlloyFeatureLoaderFunction';
import { AlloyClusterLayer } from './AlloyClusterLayer';
import { PolyfillExtent } from '../../../polyfills/PolyfillExtent';
import { AlloyFeature } from '../../features/AlloyFeature';

export class AlloyClusterFeatureLoaderFunction implements AlloyFeatureLoaderFunction {
  private readonly layer: AlloyClusterLayer;
  private readonly layerExtent: [number, number, number, number];

  constructor(layer: AlloyClusterLayer) {
    this.layer = layer;
    // calculate the extent once and cache
    this.layerExtent = layer.extent.toMapExtent();
  }

  public async func(
    extent: [number, number, number, number],
    resolution: number,
    projection: OLProjection,
  ): Promise<void> {
    // short circuit if the view is out of bounds
    if (!PolyfillExtent.intersects(this.layerExtent, extent)) {
      return;
    }

    // calculate the zoom level for the current resolution
    const zoom = this.layer.tileGrid.getZForResolution(resolution);

    const requests: Array<Promise<AlloyFeature[]>> = [];

    // iterate through tile coords for the current extent and zoom
    this.layer.tileGrid.forEachTileCoord(extent, zoom, (coordinate: [number, number, number]) => {
      // short circuit if the tile is out of bounds
      if (!PolyfillExtent.intersects(this.layerExtent, extent)) {
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

  private async requestTile(coordinate: [number, number, number]): Promise<AlloyFeature[]> {
    return [];
  }
}
