// tslint:disable

/**
 * Web model for card operation summary
 * @export
 * @interface CardOperationsSummaryWebModel
 */
export interface CardOperationsSummaryWebModel {
  /**
   * If true, the current user has permissions to edit this card
   * @type {boolean}
   * @memberof CardOperationsSummaryWebModel
   */
  canWrite: boolean;
  /**
   * If true, the current user has permissions to delete this card
   * @type {boolean}
   * @memberof CardOperationsSummaryWebModel
   */
  canDelete: boolean;
}
