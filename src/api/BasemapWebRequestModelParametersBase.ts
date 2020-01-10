// tslint:disable
import { Basemap } from './Basemap';
/**
 * Web model for create and edit parameters
 * @export
 * @interface BasemapWebRequestModelParametersBase
 */
export interface BasemapWebRequestModelParametersBase {
  /**
   * Name/Title for the basemap
   * @type {string}
   * @memberof BasemapWebRequestModelParametersBase
   */
  name: string;
  /**
   * Optional API key
   * @type {string}
   * @memberof BasemapWebRequestModelParametersBase
   */
  apiKeyValue?: string;
  /**
   * Optional background colour for the layer
   * @type {string}
   * @memberof BasemapWebRequestModelParametersBase
   */
  colour?: string;
  /**
   * Optional watermark, e.g. a URL
   * @type {string}
   * @memberof BasemapWebRequestModelParametersBase
   */
  watermark?: string;
  /**
   * URL for the mapping service
   * @type {string}
   * @memberof BasemapWebRequestModelParametersBase
   */
  url: string;
  /**
   * 
   * @type {string}
   * @memberof BasemapWebRequestModelParametersBase
   */
  discriminator: string;
}
