import { CardWithOperationsSummaryWebResponseModel } from './CardWithOperationsSummaryWebResponseModel';
/**
 * Web model for a dodi attribute
 * @export
 * @interface CardQueryCreateWebResponseModel
 */
export interface CardQueryCreateWebResponseModel {
  /**
   * The new card query Alloy Id
   * @type {string}
   * @memberof CardQueryCreateWebResponseModel
   */
  id: string;
  /**
   * The card model into which new query is added
   * @type {CardWithOperationsSummaryWebResponseModel}
   * @memberof CardQueryCreateWebResponseModel
   */
  cardWithOperationsSummary: CardWithOperationsSummaryWebResponseModel;
}
