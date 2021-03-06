import { AlloyMapError } from '@/error/AlloyMapError';
import { AlloyClusterFeature } from '@/map/features/AlloyClusterFeature';
import { AlloyLayerStyleOpacity } from '@/map/styles/AlloyLayerStyleOpacity';
import { AlloyLayerStyleScale } from '@/map/styles/AlloyLayerStyleScale';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { AlloyStyleBuilderWithLayerStyles } from '@/map/styles/AlloyStyleBuilderWithLayerStyles';
import { AlloyBallUtils } from '@/map/styles/utils/AlloyBallUtils';
import { AlloyScaleUtils } from '@/map/styles/utils/AlloyScaleUtils';
import { AlloyTextUtils } from '@/map/styles/utils/AlloyTextUtils';
import { ColourUtils } from '@/utils/ColourUtils';
import { NumberFormatUtils } from '@/utils/NumberFormatUtils';
import { StringUtils } from '@/utils/StringUtils';
import OLIcon from 'ol/style/Icon';
import OLStyle from 'ol/style/Style';

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
 * the text colour for clusters
 * @ignore
 */
const TEXT_COLOUR = '#ffffff';

/**
 * builds styles for cluster features, we only expect point features in this builder because
 * clusters can't be anything else
 * @ignore
 * @internal
 */
export class AlloyClusterStyleBuilder extends AlloyStyleBuilderWithLayerStyles<
  AlloyClusterFeature
> {
  /**
   * @override
   */
  protected getKey(
    feature: AlloyClusterFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): string {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163345, 'missing layer style: ' + feature.properties.styleId);
    }

    // key on the resulting text as this could be quite common after rounding and its just some
    // string concatenation
    const text = NumberFormatUtils.smallFormatNumber(feature.properties.count);

    return StringUtils.cacheKeyConcat(
      state,
      resolution,
      // icon is not in here because clusters don't have them
      layerStyle.colour,
      state === AlloyStyleBuilderBuildState.Default ? layerStyle.opacity.value : 1,
      layerStyle.scale,
      text,
    );
  }

  /**
   * @override
   */
  protected createStyles(feature: AlloyClusterFeature, resolution: number): OLStyle | OLStyle[] {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163016, 'missing layer style: ' + feature.properties.styleId);
    }

    const clusterScale = this.getScaleMultiplierForClusterCount(feature.properties.count);
    const radius =
      AlloyScaleUtils.POINT_RADIUS_MAX * clusterScale * this.getStyleScale(layerStyle.scale);
    const textCanvas = AlloyTextUtils.createTextCanvas(
      NumberFormatUtils.smallFormatNumber(feature.properties.count),
      TEXT_COLOUR,
    );

    return [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(radius, layerStyle.colour, layerStyle.opacity),
      // the text in the cluster
      new OLStyle({
        image: new OLIcon({
          img: textCanvas,
          scale: this.getStyleScale(layerStyle.scale),
          imgSize: [textCanvas.width, textCanvas.height],
          opacity: layerStyle.opacity.value,
        }),
      }),
    ];
  }

  /**
   * @override
   */
  protected createHoverStyles(
    feature: AlloyClusterFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554418359, 'missing layer style: ' + feature.properties.styleId);
    }

    const clusterScale = this.getScaleMultiplierForClusterCount(feature.properties.count);
    const radius =
      AlloyScaleUtils.POINT_RADIUS_MAX * clusterScale * this.getStyleScale(layerStyle.scale);
    const textCanvas = AlloyTextUtils.createTextCanvas(
      NumberFormatUtils.smallFormatNumber(feature.properties.count),
      TEXT_COLOUR,
    );

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);

    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(radius, hoverColour, AlloyLayerStyleOpacity.Opaque),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(radius, hoverColour, AlloyLayerStyleOpacity.Opaque),
      // the text in the cluster
      new OLStyle({
        image: new OLIcon({
          img: textCanvas,
          scale: this.getStyleScale(layerStyle.scale),
          imgSize: [textCanvas.width, textCanvas.height],
          opacity: 1,
        }),
      }),
    ];
  }

  /**
   * @override
   */
  protected createSelectedStyles(
    feature: AlloyClusterFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    throw new AlloyMapError(
      1554418800,
      'clusters have no selected state, they cannot be selected!',
    );
  }

  /**
   * gets the banded scale multiplier for cluster ranges
   * @param count the count to the get the scale for
   */
  private getScaleMultiplierForClusterCount(count: number): number {
    return count < 100 ? CLUSTER_2_99 : count < 10000 ? CLUSTER_100_9999 : CLUSTER_10000_INFINITY;
  }

  /**
   * Returns provided scale or default
   * @param scale this style scale or null
   */
  private getStyleScale(scale: AlloyLayerStyleScale | null): AlloyLayerStyleScale {
    return scale || AlloyLayerStyleScale.Medium;
  }
}
