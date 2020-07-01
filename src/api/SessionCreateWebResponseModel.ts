
/**
 * Web response model for a session create operation
 * @export
 * @interface SessionCreateWebResponseModel
 */
export interface SessionCreateWebResponseModel {
  /**
   * The session token to use for authenticated operations
   * @type {string}
   * @memberof SessionCreateWebResponseModel
   */
  token: string;
}
