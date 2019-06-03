import { AlloyLayerStyle } from './AlloyLayerStyle';

/**
 * an alloy wfs layer style informs an alloy layer about how to style its contents
 */
export class AlloyWfsLayerStyle extends AlloyLayerStyle {
  /**
   * @ignore
   * @internal
   */
  public readonly url: string;
  /**
   * @ignore
   * @internal
   */
  public readonly featureName: string;
  /**
   * @ignore
   * @internal
   */
  public readonly epsg: number;
  /**
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
