import OLIcon from 'ol/style/Icon';
import OLStyle from 'ol/style/Style';
import { NumberFormatUtils } from '../../../utils/NumberFormatUtils';
import { AlloyMapError } from '../../core/AlloyMapError';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyStyleBuilderWithLayerStyles } from '../AlloyStyleBuilderWithLayerStyles';
import { AlloyBallUtils } from '../utils/AlloyBallUtils';
import { AlloyScaleUtils } from '../utils/AlloyScaleUtils';
import { AlloyTextUtils } from '../utils/AlloyTextUtils';

/**
 * cluster scale multiplier for the band 2 to 99 items
 * @ignore
 */
const CLUSTER_2_99 = 1.125;

/**
 * cluster scale multiplier for the band 100 to 9999 items
 * @ignore
 */
const CLUSTER_100_9999 = 1.25;

/**
 * cluster scale multiplier for the band 10000 to infinity items
 * @ignore
 */
const CLUSTER_10000_INFINITY = 1.4;

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

    // key on the resulting text as this could be quite common after rounding and its just some
    // string concatenation
    const text = NumberFormatUtils.smallFormatNumber(feature.properties.count);
    return Math.floor(resolution) + ':' + layerStyle.colour + ':' + text;
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
    const radius = AlloyScaleUtils.POINT_RADIUS_MAX * clusterScale;
    const textCanvas = AlloyTextUtils.createTextCanvas(
      NumberFormatUtils.smallFormatNumber(feature.properties.count),
      '#ffffff',
    );

    return [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(radius, layerStyle.colour),
      // the text in the cluster
      new OLStyle({
        image: new OLIcon({
          img: textCanvas,
          snapToPixel: false,
          scale: 1,
          imgSize: [textCanvas.width, textCanvas.height],
        }),
      }),
    ];
  }

  /**
   * gets the banded scale multiplier for cluster ranges
   * @param count the count to the get the scale for
   */
  private getScaleMultiplierForClusterCount(count: number): number {
    return count < 100 ? CLUSTER_2_99 : count < 10000 ? CLUSTER_100_9999 : CLUSTER_10000_INFINITY;
  }
}
