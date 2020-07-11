import { BasemapWebRequestModelParametersBase } from './BasemapWebRequestModelParametersBase';
/**
 * 
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
  /**
   * Which tile matrix to use from those available (optional). If this is not set, the default matrix is used
   * @type {string}
   * @memberof WmtsBasemapWebRequestModelParameters
   */
  tileMatrixIdentifier?: string;
}
