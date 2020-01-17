// tslint:disable
import { BasemapWebRequestModelParametersBase } from './BasemapWebRequestModelParametersBase';
import { BoundingBoxWebModel } from './BoundingBoxWebModel';
import { LayerWebModel } from './LayerWebModel';
import { WmsLayerWebModel } from './WmsLayerWebModel';
import { WmsTileWebModel } from './WmsTileWebModel';
import { Basemap } from './Basemap';
/**
 * Web Map Service Custom Basemap model for create and edit parameters
 * @export
 * @interface WmsBasemapWebRequestModelParameters
 */
export interface WmsBasemapWebRequestModelParameters extends BasemapWebRequestModelParametersBase {
  /**
   * WMS Layers to show in the basemap
   * @type {Array<WmsLayerWebModel>}
   * @memberof WmsBasemapWebRequestModelParameters
   */
  layers: Array<WmsLayerWebModel>;
  /**
   * Optional CRS code for the layer coordinate system. Default to WGS84
   * @type {string}
   * @memberof WmsBasemapWebRequestModelParameters
   */
  crs?: string;
  /**
   * Optional bounding box for the basemap
   * @type {BoundingBoxWebModel}
   * @memberof WmsBasemapWebRequestModelParameters
   */
  boundingBox?: BoundingBoxWebModel;
  /**
   * This should be set only if Alloy is requesting tiles from the WMS If not set this means that Alloy will be requesting big images that cover the whole viewport instead
   * @type {WmsTileWebModel}
   * @memberof WmsBasemapWebRequestModelParameters
   */
  tile?: WmsTileWebModel;
}
