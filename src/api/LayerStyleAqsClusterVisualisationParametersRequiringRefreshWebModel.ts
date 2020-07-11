import { LayerStyleVisualisationParametersRequiringRefreshBaseWebModel } from './LayerStyleVisualisationParametersRequiringRefreshBaseWebModel';
/**
 * 
 * @export
 * @interface LayerStyleAqsClusterVisualisationParametersRequiringRefreshWebModel
 */
export interface LayerStyleAqsClusterVisualisationParametersRequiringRefreshWebModel extends LayerStyleVisualisationParametersRequiringRefreshBaseWebModel {
  /**
   * Only show cluster blobs where the tile contains the item's centroid
   * @type {boolean}
   * @memberof LayerStyleAqsClusterVisualisationParametersRequiringRefreshWebModel
   */
  clusterCentroidsOnly?: boolean;
}
