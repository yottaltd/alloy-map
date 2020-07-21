import { BasemapWebRequestModelParametersBase } from './BasemapWebRequestModelParametersBase';
/**
 * Web request model to create a basemap
 * @export
 * @interface BasemapCreateWebRequestModel
 */
export interface BasemapCreateWebRequestModel {
  /**
   * Parameters required for creating the basemap
   * @type {BasemapWebRequestModelParametersBase}
   * @memberof BasemapCreateWebRequestModel
   */
  createParameters: BasemapWebRequestModelParametersBase;
}
