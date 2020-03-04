import { AlloyLayerStyle } from './AlloyLayerStyle';
import { AlloyLayerStyleOpacity } from './AlloyLayerStyleOpacity';

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

  constructor(
    styleId: string,
    url: string,
    featureName: string,
    epsg: number,
    version: string,
    colour: string,
    icon: string,
    labelTitle?: string,
    labelSubtitle?: string,
    opacity?: AlloyLayerStyleOpacity,
  ) {
    super(styleId, colour, icon, undefined, opacity);
    this.url = url;
    this.featureName = featureName;
    this.epsg = epsg;
    this.version = version;
    this.labelTitle = labelTitle;
    this.labelSubtitle = labelSubtitle;
  }
}
