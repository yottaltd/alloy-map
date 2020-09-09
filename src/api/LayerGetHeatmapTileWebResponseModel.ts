import { LayerHeatmapFeatureWebModel } from './LayerHeatmapFeatureWebModel';
/**
 * Web response model for a layer cluster tile get operation
 * @export
 * @interface LayerGetHeatmapTileWebResponseModel
 */
export interface LayerGetHeatmapTileWebResponseModel {
  /**
   * The array of tiles matching the query, empty if none found
   * @type {Array<LayerHeatmapFeatureWebModel>}
   * @memberof LayerGetHeatmapTileWebResponseModel
   */
  results: Array<LayerHeatmapFeatureWebModel>;
}
