import { DodiAttributeOperationsSummaryWebModel } from './DodiAttributeOperationsSummaryWebModel';
/**
 * Web model for dodi operation summary
 * @export
 * @interface DodiOperationsSummaryWebModel
 */
export interface DodiOperationsSummaryWebModel {
  /**
   * If true, the current user has permissions to edit this design
   * @type {boolean}
   * @memberof DodiOperationsSummaryWebModel
   */
  canWrite: boolean;
  /**
   * If true, the current user has permissions to delete this design
   * @type {boolean}
   * @memberof DodiOperationsSummaryWebModel
   */
  canDelete: boolean;
  /**
   * If true, the user has permission to read items in this design
   * @type {boolean}
   * @memberof DodiOperationsSummaryWebModel
   */
  canReadItems: boolean;
  /**
   * If true, the user has permission to edit items in this design
   * @type {boolean}
   * @memberof DodiOperationsSummaryWebModel
   */
  canEditItems: boolean;
  /**
   * If true, the user has permission to delete items in this design
   * @type {boolean}
   * @memberof DodiOperationsSummaryWebModel
   */
  canDeleteItems: boolean;
  /**
   * If true, the user has permission to create items in this design
   * @type {boolean}
   * @memberof DodiOperationsSummaryWebModel
   */
  canCreateItems: boolean;
  /**
   * The operations summaries for the attributes belonging to this design
   * @type {Array<DodiAttributeOperationsSummaryWebModel>}
   * @memberof DodiOperationsSummaryWebModel
   */
  attributeOperationsSummary: Array<DodiAttributeOperationsSummaryWebModel>;
}
