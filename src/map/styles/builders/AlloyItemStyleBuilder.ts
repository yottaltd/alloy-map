import OLIcon from 'ol/style/Icon';
import OLStyle from 'ol/style/Style';
import { FontUtils } from '../../../utils/FontUtils';
import { AlloyMapError } from '../../core/AlloyMapError';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyStyleBuilderWithLayerStyles } from '../AlloyStyleBuilderWithLayerStyles';
import { AlloyBallUtils } from '../utils/AlloyBallUtils';
import { AlloyIconUtils } from '../utils/AlloyIconUtils';
import { AlloyScaleUtils } from '../utils/AlloyScaleUtils';

/**
 * builds styles for item features
 * @ignore
 */
export class AlloyItemStyleBuilder extends AlloyStyleBuilderWithLayerStyles<AlloyItemFeature> {
  /**
   * @override
   */
  protected getKey(feature: AlloyItemFeature, resolution: number): string {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163769, 'missing layer style: ' + feature.properties.styleId);
    }

    return (
      Math.floor(resolution) +
      ':' +
      (feature.properties.icon || layerStyle.icon) +
      ':' +
      (feature.properties.colour || layerStyle.colour)
    );
  }

  /**
   * @override
   */
  protected createStyles(
    feature: AlloyItemFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163777, 'missing layer style: ' + feature.properties.styleId);
    }

    const resolutionScale = AlloyScaleUtils.getScaleMultiplierForResolution(resolution);
    const radius = AlloyScaleUtils.POINT_RADIUS_MAX * resolutionScale;
    const iconCanvas = AlloyIconUtils.createIconCanvas(
      feature.properties.icon || layerStyle.icon,
      '#ffffff',
      FontUtils.FONT_ALLOY_ICONS,
      FontUtils.FONT_WEIGHT_ALLOY_ICONS,
    );

    return [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(radius, feature.properties.colour || layerStyle.colour),
      // the icon of the item
      new OLStyle({
        image: new OLIcon({
          img: iconCanvas,
          snapToPixel: false,
          scale: radius / iconCanvas.width,
          imgSize: [iconCanvas.width, iconCanvas.height],
        }),
      }),
    ];
  }
}
