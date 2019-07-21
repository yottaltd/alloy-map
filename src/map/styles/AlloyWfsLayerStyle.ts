import { AlloyLayerStyle } from './AlloyLayerStyle';

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

  constructor(
    styleId: string,
    url: string,
    featureName: string,
    epsg: number,
    version: string,
    colour: string,
    icon: string,
  ) {
    super(styleId, colour, icon);
    this.url = url;
    this.featureName = featureName;
    this.epsg = epsg;
    this.version = version;
  }
}