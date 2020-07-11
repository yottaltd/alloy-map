import { BasemapWebModelBase } from './BasemapWebModelBase';
import { BoundingBoxWebModel } from './BoundingBoxWebModel';
import { LayerWebModel } from './LayerWebModel';
import { WmsLayerWebModel } from './WmsLayerWebModel';
import { WmsTileWebModel } from './WmsTileWebModel';
/**
 * 
 * @export
 * @interface WmsBasemapWebModel
 */
export interface WmsBasemapWebModel extends BasemapWebModelBase {
  /**
   * WMS Layers to show in the basemap
   * @type {Array<WmsLayerWebModel>}
   * @memberof WmsBasemapWebModel
   */
  layers: Array<WmsLayerWebModel>;
  /**
   * Optional CRS code for the layer coordinate system. Default to WGS84
   * @type {string}
   * @memberof WmsBasemapWebModel
   */
  crs?: string;
  /**
   * Optional bounding box for the basemap
   * @type {BoundingBoxWebModel}
   * @memberof WmsBasemapWebModel
   */
  boundingBox?: BoundingBoxWebModel;
  /**
   * This will be set only if Alloy is requesting tiles from the WMS If not set this means that Alloy will be requesting big images that cover the whole viewport instead
   * @type {WmsTileWebModel}
   * @memberof WmsBasemapWebModel
   */
  tile?: WmsTileWebModel;
}
