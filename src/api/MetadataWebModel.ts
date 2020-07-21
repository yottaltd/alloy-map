
/**
 * Web model for the metadata
 * @export
 * @interface MetadataWebModel
 */
export interface MetadataWebModel {
  /**
   * The datetime at which this element was created
   * @type {string}
   * @memberof MetadataWebModel
   */
  createdDate: string;
  /**
   * The username of the user that created this element
   * @type {string}
   * @memberof MetadataWebModel
   */
  createdUserUsername: string;
  /**
   * The datetime at which this element was edited
   * @type {string}
   * @memberof MetadataWebModel
   */
  lastEditDate?: string;
  /**
   * The username of the user that last edited this element
   * @type {string}
   * @memberof MetadataWebModel
   */
  lastEditUserUsername?: string;
  /**
   * The signature to send for every edit/delete operation related to this element
   * @type {string}
   * @memberof MetadataWebModel
   */
  signature: string;
}
