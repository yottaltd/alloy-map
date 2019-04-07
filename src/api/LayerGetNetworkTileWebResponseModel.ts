// tslint:disable
import { LayerNetworkFeatureWebModel } from './LayerNetworkFeatureWebModel';
/**
 * Web response model for a layer cluster tile get operation
 * @export
 * @interface LayerGetNetworkTileWebResponseModel
 */
export interface LayerGetNetworkTileWebResponseModel {
  /**
   * The array of tiles matching the query, empty if none found
   * @type {Array<LayerNetworkFeatureWebModel>}
   * @memberof LayerGetNetworkTileWebResponseModel
   */
  results: Array<LayerNetworkFeatureWebModel>;
}
