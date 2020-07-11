
/**
 * Web model for a user session
 * @export
 * @interface UserSessionWebModel
 */
export interface UserSessionWebModel {
  /**
   * The session token
   * @type {string}
   * @memberof UserSessionWebModel
   */
  token: string;
  /**
   * If true, this is a master session
   * @type {boolean}
   * @memberof UserSessionWebModel
   */
  isMaster: boolean;
  /**
   * The customer Guc that this session is on. Null if this is a master session
   * @type {string}
   * @memberof UserSessionWebModel
   */
  customerCode?: string;
}
