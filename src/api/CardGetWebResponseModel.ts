// tslint:disable
import { CardOperationsSummaryWebModel } from './CardOperationsSummaryWebModel';
import { CardWebModel } from './CardWebModel';
/**
 * Web model for a card
 * @export
 * @interface CardGetWebResponseModel
 */
export interface CardGetWebResponseModel {
  /**
   * The retrieved card
   * @type {CardWebModel}
   * @memberof CardGetWebResponseModel
   */
  card: CardWebModel;
  /**
   * The summary of the UAC operations allowed for this layer
   * @type {CardOperationsSummaryWebModel}
   * @memberof CardGetWebResponseModel
   */
  operationsSummary: CardOperationsSummaryWebModel;
}
