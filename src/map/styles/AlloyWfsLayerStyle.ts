import { AlloyLayerStyle } from './AlloyLayerStyle';
import { AlloyLayerStyleLabelMode } from './AlloyLayerStyleLabelMode';
import { AlloyLayerStyleOpacity } from './AlloyLayerStyleOpacity';
import { AlloyLayerStyleScale } from './AlloyLayerStyleScale';

/**
 * an alloy wfs layer style informs an alloy layer about how to style its contents
 */
export class AlloyWfsLayerStyle extends AlloyLayerStyle {
  /**
   * WFS service url
   * @ignore
   * @internal
   */
  public readonly url: string;

  /**
   * WFS service feature set / layer name
   * @ignore
   * @internal
   */
  public readonly featureName: string;

  /**
   * EPSG code numeric id to use for style
   * @ignore
   * @internal
   */
  public readonly epsg: number;

  /**
   * WFS service version
   * @ignore
   * @internal
   */
  public readonly version: string;

  /**
   * the WFS property name to use for the title
   */
  public readonly labelTitle?: string;

  /**
   * the WFS property name to use for the subtitle
   */
  public readonly labelSubtitle?: string;

  /**
   * creates a new instance
   * @param styleId the style id
   * @param url url for WFS service
   * @param featureName WFS FeatureType name
   * @param epsg EPSG id to use for WFS responses
   * @param version version of WFS service
   * @param colour the colour of the style
   * @param icon the icon font class name
   * @param labelTitle WFS property name to use for the title
   * @param labelSubtitle WFS property name to use for the subtitle
   * @param scale the scale to use when displaying style features, defaults to 1
   */
  constructor(
    styleId: string,
    url: string,
    featureName: string,
    epsg: number,
    version: string,
    colour: string,
    icon?: string,
    labelTitle?: string,
    labelSubtitle?: string,
    opacity?: AlloyLayerStyleOpacity,
    scale?: AlloyLayerStyleScale,
  ) {
    let mode: AlloyLayerStyleLabelMode = AlloyLayerStyleLabelMode.None;
    if (labelTitle) {
      if (labelSubtitle) {
        mode = AlloyLayerStyleLabelMode.TitleAndSubtitle;
      } else {
        mode = AlloyLayerStyleLabelMode.Title;
      }
    }
    super(styleId, colour, icon, mode, opacity, scale);
    this.url = url;
    this.featureName = featureName;
    this.epsg = epsg;
    this.version = version;
    this.labelTitle = labelTitle;
    this.labelSubtitle = labelSubtitle;
  }
}
