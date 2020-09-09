import { BasemapWebModelBase } from './BasemapWebModelBase';
/**
 * 
 * @export
 * @interface BingBasemapWebModel
 */
export interface BingBasemapWebModel extends BasemapWebModelBase {
  /**
   * The Bing Imagery Set identifier, e.g. AerialWithLabelsOnDemand
   * @type {string}
   * @memberof BingBasemapWebModel
   */
  imagerySet: string;
}
