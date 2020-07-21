
/**
 * Web request model for a master session create operation
 * @export
 * @interface SessionMasterCreateWebRequestModel
 */
export interface SessionMasterCreateWebRequestModel {
  /**
   * The users email address       
   * @type {string}
   * @memberof SessionMasterCreateWebRequestModel
   */
  email: string;
  /**
   * The users password in plain text       
   * @type {string}
   * @memberof SessionMasterCreateWebRequestModel
   */
  password: string;
}
