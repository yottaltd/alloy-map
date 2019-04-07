// tslint:disable
import { DodiAttributeOperationsSummaryWebModel } from './DodiAttributeOperationsSummaryWebModel';
/**
 * 
 * @export
 * @interface DodiOperationsSummaryWebModel
 */
export interface DodiOperationsSummaryWebModel {
  /**
   * 
   * @type {boolean}
   * @memberof DodiOperationsSummaryWebModel
   */
  canWrite: boolean;
  /**
   * 
   * @type {boolean}
   * @memberof DodiOperationsSummaryWebModel
   */
  canReadItems: boolean;
  /**
   * 
   * @type {boolean}
   * @memberof DodiOperationsSummaryWebModel
   */
  canEditItems: boolean;
  /**
   * 
   * @type {boolean}
   * @memberof DodiOperationsSummaryWebModel
   */
  canDeleteItems: boolean;
  /**
   * 
   * @type {Array<DodiAttributeOperationsSummaryWebModel>}
   * @memberof DodiOperationsSummaryWebModel
   */
  attributeOperationsSummary: Array<DodiAttributeOperationsSummaryWebModel>;
}
