import { JObject } from './JObject';
import { LogAction } from './LogAction';
/**
 * Web response model for an audit log
 * @export
 * @interface AuditLogWebModel
 */
export interface AuditLogWebModel {
  /**
   * The mongo collection name that this log relates to
   * @type {string}
   * @memberof AuditLogWebModel
   */
  mongoCollection: string;
  /**
   * The document code that this log relates to
   * @type {string}
   * @memberof AuditLogWebModel
   */
  documentCode: string;
  /**
   * The action audited by this log entry
   * @type {LogAction}
   * @memberof AuditLogWebModel
   */
  action: LogAction;
  /**
   * The date time at which the action happened
   * @type {string}
   * @memberof AuditLogWebModel
   */
  date: string;
  /**
   * The username of the user executing the action
   * @type {string}
   * @memberof AuditLogWebModel
   */
  username?: string;
  /**
   * Notes that go with the operation
   * @type {string}
   * @memberof AuditLogWebModel
   */
  note?: string;
  /**
   * The state of the item before the operation, null if it is a create operation
   * @type {JObject}
   * @memberof AuditLogWebModel
   */
  before?: JObject;
  /**
   * The state of the item after the operation, null if it is a delete operation
   * @type {JObject}
   * @memberof AuditLogWebModel
   */
  after?: JObject;
}
