// tslint:disable

/**
 * Web model for mesh operation summary
 * @export
 * @interface MeshOperationsSummaryWebModel
 */
export interface MeshOperationsSummaryWebModel {
  /**
   * If true, the current user has permissions to edit or delete this mesh
   * @type {boolean}
   * @memberof MeshOperationsSummaryWebModel
   */
  canWrite: boolean;
}
