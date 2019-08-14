// tslint:disable
import { LayerStyleConfigWebModelBase } from './LayerStyleConfigWebModelBase';
/**
 * Web model for a layer style config wfs object
 * @export
 * @interface LayerStyleConfigWfsWebModel
 */
export interface LayerStyleConfigWfsWebModel extends LayerStyleConfigWebModelBase {
  /**
   * The wfs base url
   * @type {string}
   * @memberof LayerStyleConfigWfsWebModel
   */
  baseUrl: string;
  /**
   * The Epsg Code
   * @type {number}
   * @memberof LayerStyleConfigWfsWebModel
   */
  epsgCode: number;
  /**
   * The Wfs layer type
   * @type {string}
   * @memberof LayerStyleConfigWfsWebModel
   */
  wfsLayerType: string;
  /**
   * If true, it loads all resources within the layer
   * @type {boolean}
   * @memberof LayerStyleConfigWfsWebModel
   */
  loadAll: boolean;
  /**
   * The version can only be one of \"1.1.0\", \"1.2.0\", \"1.3.0\"
   * @type {string}
   * @memberof LayerStyleConfigWfsWebModel
   */
  version: string;
}
