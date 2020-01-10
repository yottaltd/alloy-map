// tslint:disable
import { BasemapWebModelBase } from './BasemapWebModelBase';
import { Basemap } from './Basemap';
/**
 * Web Map Tile Service Basemap
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
}
