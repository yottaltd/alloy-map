import { AlloyLayerStyle } from './AlloyLayerStyle';
import { AlloyLayerStyleLabelMode } from './AlloyLayerStyleLabelMode';
import { AlloyLayerStyleOpacity } from './AlloyLayerStyleOpacity';
import { AlloyLayerStyleScale } from './AlloyLayerStyleScale';
import { AlloyWfsLayerStyleBase } from './AlloyWfsLayerStyleBase';

/**
 * an alloy wfs layer style informs an alloy layer about how to style its contents
 */
export class AlloyWfsLayerStyle extends AlloyLayerStyle implements AlloyWfsLayerStyleBase {
  /**
   * @implements
   */
  public readonly url: string;

  /**
   * @implements
   */
  public readonly featureName: string;

  /**
   * @implements
   */
  public readonly epsg: number;

  /**
   * @implements
   */
  public readonly version: string;

  /**
   * @implements
   */
  public readonly loadAll?: boolean;

  /**
   * @implements
   */
  public readonly outputFormat?: string;

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
