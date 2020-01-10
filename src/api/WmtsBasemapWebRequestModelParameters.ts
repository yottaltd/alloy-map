// tslint:disable
import { BasemapWebRequestModelParametersBase } from './BasemapWebRequestModelParametersBase';
import { Basemap } from './Basemap';
/**
 * Web Map Tile Service Basemap model for create and edit parameters
 * @export
 * @interface WmtsBasemapWebRequestModelParameters
 */
export interface WmtsBasemapWebRequestModelParameters extends BasemapWebRequestModelParametersBase {
  /**
   * WMTS Service layer identifier
   * @type {string}
   * @memberof WmtsBasemapWebRequestModelParameters
   */
  layerIdentifier: string;
  /**
   * WMTS Service style identifier
   * @type {string}
   * @memberof WmtsBasemapWebRequestModelParameters
   */
  styleIdentifier: string;
  /**
   * HidDpi set true if the tile response is at high resolution
   * @type {boolean}
   * @memberof WmtsBasemapWebRequestModelParameters
   */
  hiDpi: boolean;
}
