import { AlloyHeatmapLayerStyle } from './AlloyHeatmapLayerStyle';
import { AlloyWfsLayerStyleBase } from './AlloyWfsLayerStyleBase';

/**
 * an alloy wfs heatmap layer style informs an alloy layer about how to style its contents
 */
export class AlloyWfsHeatmapLayerStyle extends AlloyHeatmapLayerStyle
  implements AlloyWfsLayerStyleBase {
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
   * creates a new instance
   * @param styleId the style id
   * @param url url for WFS service
   * @param featureName WFS FeatureType name
   * @param epsg EPSG id to use for WFS responses
   * @param version version of WFS service
   * @param weightProperty WFS property to use for weight calculation
   * @param gardient colours array to use for heatmap styling
   * @param blur value in pixels that's used for bluring heatmap
   * @param radius value in pixels that's used for styling heatmap points
   * @param loadAll whether all items should be loaded in one go
   * @param outputFormat optional format to use for WFS requests
   */
  constructor(
    styleId: string,
    url: string,
    featureName: string,
    epsg: number,
    version: string,
    weightProperty: string,
    gradient?: string[],
    blur?: number,
    radius?: number,
    loadAll?: boolean,
    outputFormat?: string,
  ) {
    super(styleId, weightProperty, gradient, blur, radius);
    this.url = url;
    this.featureName = featureName;
    this.epsg = epsg;
    this.version = version;
    this.loadAll = loadAll;
    this.outputFormat = outputFormat;
  }
}
