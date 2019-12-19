// tslint:disable

/**
 * Web model for layer operation summary
 * @export
 * @interface LayerOperationsSummaryWebModel
 */
export interface LayerOperationsSummaryWebModel {
  /**
   * If true, the current user has permissions to edit this layer
   * @type {boolean}
   * @memberof LayerOperationsSummaryWebModel
   */
  canWrite: boolean;
  /**
   * If true, the current user has permissions to delete this layer
   * @type {boolean}
   * @memberof LayerOperationsSummaryWebModel
   */
  canDelete: boolean;
}
