import { AlloyLayerStyle } from '@/map/styles/AlloyLayerStyle';
import { AlloyLayerStyleLabelMode } from '@/map/styles/AlloyLayerStyleLabelMode';
import { AlloyLayerStyleOpacity } from '@/map/styles/AlloyLayerStyleOpacity';
import { AlloyLayerStyleScale } from '@/map/styles/AlloyLayerStyleScale';

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
   * Whether to load all WFS features for this style in one go
   */
  public readonly loadAll?: boolean;

  /**
   * WFS service supported output format to use for requests
   */
  public readonly outputFormat?: string;

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
   * @param opacity the opacity to use when displaying style features, defaults to 1
   * @param scale the scale to use when displaying style features, defaults to 1
   * @param loadAll whether all items should be loaded in one go
   * @param outputFormat optional format to use for WFS requests
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
    loadAll?: boolean,
    outputFormat?: string,
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
    this.loadAll = loadAll;
    this.outputFormat = outputFormat;
  }
}
