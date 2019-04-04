import OLIcon from 'ol/style/Icon';
import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { FontUtils } from '../../../utils/FontUtils';
import { StringUtils } from '../../../utils/StringUtils';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyStyleBuilderBuildState } from '../AlloyStyleBuilderBuildState';
import { AlloyStyleBuilderWithLayerStyles } from '../AlloyStyleBuilderWithLayerStyles';
import { AlloyBallUtils } from '../utils/AlloyBallUtils';
import { AlloyIconUtils } from '../utils/AlloyIconUtils';
import { AlloyScaleUtils } from '../utils/AlloyScaleUtils';
import { ColourUtils } from '../../../utils/ColourUtils';

/**
 * the text colour for clusters
 * @ignore
 */
const ICON_COLOUR = '#ffffff';

/**
 * builds styles for item features
 * @ignore
 */
export class AlloyItemStyleBuilder extends AlloyStyleBuilderWithLayerStyles<AlloyItemFeature> {
  /**
   * @override
   */
  protected getKey(
    feature: AlloyItemFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): string {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163769, 'missing layer style: ' + feature.properties.styleId);
    }

    return StringUtils.cacheKeyConcat(
      state,
      Math.floor(resolution),
      feature.properties.icon || layerStyle.icon,
      feature.properties.colour || layerStyle.colour,
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
      ICON_COLOUR,
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

  /**
   * @override
   */
  protected createHoverStyles(
    feature: AlloyItemFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554419738, 'missing layer style: ' + feature.properties.styleId);
    }

    const resolutionScale = AlloyScaleUtils.getScaleMultiplierForResolution(resolution);
    const radius = AlloyScaleUtils.POINT_RADIUS_MAX * resolutionScale;
    const iconCanvas = AlloyIconUtils.createIconCanvas(
      feature.properties.icon || layerStyle.icon,
      ICON_COLOUR,
      FontUtils.FONT_ALLOY_ICONS,
      FontUtils.FONT_WEIGHT_ALLOY_ICONS,
    );

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(
      feature.properties.colour || layerStyle.colour,
    );

    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(radius, hoverColour),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(radius, hoverColour),
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

  /**
   * @override
   */
  protected createSelectedStyles(
    feature: AlloyItemFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554419738, 'missing layer style: ' + feature.properties.styleId);
    }

    const resolutionScale = AlloyScaleUtils.getScaleMultiplierForResolution(resolution);
    const radius = AlloyScaleUtils.POINT_RADIUS_MAX * resolutionScale;
    const iconCanvas = AlloyIconUtils.createIconCanvas(
      feature.properties.icon || layerStyle.icon,
      ICON_COLOUR,
      FontUtils.FONT_ALLOY_ICONS,
      FontUtils.FONT_WEIGHT_ALLOY_ICONS,
    );

    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(radius, feature.properties.colour || layerStyle.colour),
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
