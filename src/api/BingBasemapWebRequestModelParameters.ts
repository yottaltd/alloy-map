import { BasemapWebRequestModelParametersBase } from './BasemapWebRequestModelParametersBase';
/**
 * 
 * @export
 * @interface BingBasemapWebRequestModelParameters
 */
export interface BingBasemapWebRequestModelParameters extends BasemapWebRequestModelParametersBase {
  /**
   * The Bing Imagery Set identifier, e.g. AerialWithLabelsOnDemand
   * @type {string}
   * @memberof BingBasemapWebRequestModelParameters
   */
  imagerySet: string;
}
