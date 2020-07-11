import { BasemapWebRequestModelParametersBase } from './BasemapWebRequestModelParametersBase';
/**
 * The web request model used to edit a basemap
 * @export
 * @interface BasemapEditWebRequestModel
 */
export interface BasemapEditWebRequestModel {
  /**
   * The basemap parameters
   * @type {BasemapWebRequestModelParametersBase}
   * @memberof BasemapEditWebRequestModel
   */
  editParameters: BasemapWebRequestModelParametersBase;
  /**
   * The signature is used to ensure that the basemap being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same basemap
   * @type {string}
   * @memberof BasemapEditWebRequestModel
   */
  signature: string;
}
