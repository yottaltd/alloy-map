// tslint:disable
import { CardOperationsSummaryWebModel } from './CardOperationsSummaryWebModel';
import { CardWebModel } from './CardWebModel';
/**
 * Web model for a card
 * @export
 * @interface CardWithOperationsSummaryWebResponseModel
 */
export interface CardWithOperationsSummaryWebResponseModel {
  /**
   * The retrieved card
   * @type {CardWebModel}
   * @memberof CardWithOperationsSummaryWebResponseModel
   */
  card: CardWebModel;
  /**
   * The summary of the UAC operations allowed for this layer
   * @type {CardOperationsSummaryWebModel}
   * @memberof CardWithOperationsSummaryWebResponseModel
   */
  operationsSummary: CardOperationsSummaryWebModel;
}
