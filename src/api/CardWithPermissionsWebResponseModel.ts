import { CardOperationsSummaryWebModel } from './CardOperationsSummaryWebModel';
import { CardWebModel } from './CardWebModel';
import { CardPermissionResponseWebModel } from './CardPermissionResponseWebModel';
/**
 * Web model for a card
 * @export
 * @interface CardWithPermissionsWebResponseModel
 */
export interface CardWithPermissionsWebResponseModel {
  /**
   * The retrieved card
   * @type {CardWebModel}
   * @memberof CardWithPermissionsWebResponseModel
   */
  card: CardWebModel;
  /**
   * The summary of the UAC operations allowed for this layer
   * @type {CardOperationsSummaryWebModel}
   * @memberof CardWithPermissionsWebResponseModel
   */
  operationsSummary: CardOperationsSummaryWebModel;
  /**
   * The user groups associated to this card
   * @type {Array<CardPermissionResponseWebModel>}
   * @memberof CardWithPermissionsWebResponseModel
   */
  permissions: Array<CardPermissionResponseWebModel>;
}
