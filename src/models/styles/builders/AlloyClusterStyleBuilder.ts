import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../core/AlloyMapError';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyStyleBuilderWithLayerStyles } from '../AlloyStyleBuilderWithLayerStyles';
import { AlloyScaleUtils } from '../utils/AlloyScaleUtils';

/**
 * cluster scale multiplier for the band 2 to 99 items
 * @ignore
 */
const CLUSTER_2_99 = Math.sqrt(2);

/**
 * cluster scale multiplier for the band 100 to 9999 items
 * @ignore
 */
const CLUSTER_100_9999 = Math.sqrt(4);

/**
 * cluster scale multiplier for the band 10000 to infinity items
 * @ignore
 */
const CLUSTER_10000_INFINITY = Math.sqrt(6);

/**
 * builds styles for cluster features
 * @ignore
 */
export class AlloyClusterStyleBuilder extends AlloyStyleBuilderWithLayerStyles<
  AlloyClusterFeature
> {
  /**
   * @override
   */
  protected getKey(feature: AlloyClusterFeature, resolution: number): string {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163345, 'missing layer style: ' + feature.properties.styleId);
    }

    const clusterScale = this.getScaleMultiplierForClusterCount(feature.properties.count);

    return (
      Math.floor(resolution) + ':' + layerStyle.icon + ':' + layerStyle.colour + ':' + clusterScale
    );
  }

  /**
   * @override
   */
  protected createStyles(
    feature: AlloyClusterFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163016, 'missing layer style: ' + feature.properties.styleId);
    }

    const clusterScale = this.getScaleMultiplierForClusterCount(feature.properties.count);
    const resolutionScale = AlloyScaleUtils.getScaleMultiplierForResolution(resolution);
    const radius = AlloyScaleUtils.POINT_RADIUS_MAX * resolutionScale * clusterScale;

    return new OLStyle({
      image: new OLCircle({
        radius,
        fill: new OLFill({
          color: layerStyle.colour,
        }),
      }),
    });
  }

  /**
   * gets the banded scale multiplier for cluster ranges
   * @param count the count to the get the scale for
   */
  private getScaleMultiplierForClusterCount(count: number): number {
    return count < 100 ? CLUSTER_2_99 : count < 10000 ? CLUSTER_100_9999 : CLUSTER_10000_INFINITY;
  }
}
