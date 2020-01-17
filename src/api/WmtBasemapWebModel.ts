// tslint:disable
import { BasemapWebModelBase } from './BasemapWebModelBase';
import { BoundingBoxWebModel } from './BoundingBoxWebModel';
import { LayerWebModel } from './LayerWebModel';
import { WmsLayerWebModel } from './WmsLayerWebModel';
import { WmsTileWebModel } from './WmsTileWebModel';
import { Basemap } from './Basemap';
/**
 * Web Map Service Custom Basemap - web model        WMS data is queried using a rectangle with any coordinates within the bounding box
 * @export
 * @interface WmtBasemapWebModel
 */
export interface WmtBasemapWebModel extends BasemapWebModelBase {
  /**
   * WMS Layers to show in the basemap
   * @type {Array<WmsLayerWebModel>}
   * @memberof WmtBasemapWebModel
   */
  layers: Array<WmsLayerWebModel>;
  /**
   * Optional CRS code for the layer coordinate system. Default to WGS84
   * @type {string}
   * @memberof WmtBasemapWebModel
   */
  crs?: string;
  /**
   * Optional bounding box for the basemap
   * @type {BoundingBoxWebModel}
   * @memberof WmtBasemapWebModel
   */
  boundingBox?: BoundingBoxWebModel;
  /**
   * This will be set only if Alloy is requesting tiles from the WMS If not set this means that Alloy will be requesting big images that cover the whole viewport instead
   * @type {WmsTileWebModel}
   * @memberof WmtBasemapWebModel
   */
  tile?: WmsTileWebModel;
}
