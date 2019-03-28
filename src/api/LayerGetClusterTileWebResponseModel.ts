// tslint:disable
import { LayerClusterFeatureWebModel } from './LayerClusterFeatureWebModel';
/**
 * Web response model for a layer cluster tile get operation
 * @export
 * @interface LayerGetClusterTileWebResponseModel
 */
export interface LayerGetClusterTileWebResponseModel {
  /**
   * The array of tiles matching the query, empty if none found
   * @type {Array<LayerClusterFeatureWebModel>}
   * @memberof LayerGetClusterTileWebResponseModel
   */
  results: Array<LayerClusterFeatureWebModel>;
}
