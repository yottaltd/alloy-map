import { BasemapWebModelBase } from './BasemapWebModelBase';
/**
 * 
 * @export
 * @interface WmtsBasemapWebModel
 */
export interface WmtsBasemapWebModel extends BasemapWebModelBase {
  /**
   * WMTS Service layer identifier
   * @type {string}
   * @memberof WmtsBasemapWebModel
   */
  layerIdentifier: string;
  /**
   * WMTS Service style identifier
   * @type {string}
   * @memberof WmtsBasemapWebModel
   */
  styleIdentifier: string;
  /**
   * HidDpi set true if the tile response is at high resolution
   * @type {boolean}
   * @memberof WmtsBasemapWebModel
   */
  hiDpi: boolean;
  /**
   * Which tile matrix to use from those available (optional). If this is not set, the default matrix is used
   * @type {string}
   * @memberof WmtsBasemapWebModel
   */
  tileMatrixIdentifier?: string;
}
