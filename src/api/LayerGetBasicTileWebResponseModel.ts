import { LayerBasicFeatureWebModel } from './LayerBasicFeatureWebModel';
/**
 * Web response model for a layer Basic tile get operation
 * @export
 * @interface LayerGetBasicTileWebResponseModel
 */
export interface LayerGetBasicTileWebResponseModel {
  /**
   * The array of features matching the query, empty if none found
   * @type {Array<LayerBasicFeatureWebModel>}
   * @memberof LayerGetBasicTileWebResponseModel
   */
  results: Array<LayerBasicFeatureWebModel>;
}
