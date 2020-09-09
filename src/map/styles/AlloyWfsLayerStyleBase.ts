/**
 * an alloy wfs layer style informs an alloy layer about how to style its contents
 */
export interface AlloyWfsLayerStyleBase {
  /**
   * WFS service url
   * @ignore
   * @internal
   */
  readonly url: string;

  /**
   * WFS service feature set / layer name
   * @ignore
   * @internal
   */
  readonly featureName: string;

  /**
   * EPSG code numeric id to use for style
   * @ignore
   * @internal
   */
  readonly epsg: number;

  /**
   * WFS service version
   * @ignore
   * @internal
   */
  readonly version: string;

  /**
   * Whether to load all WFS features for this style in one go
   * @ignore
   * @internal
   */
  readonly loadAll?: boolean;

  /**
   * WFS service supported output format to use for requests
   * @ignore
   * @internal
   */
  readonly outputFormat?: string;
}
