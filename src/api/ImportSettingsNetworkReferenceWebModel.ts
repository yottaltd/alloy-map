// tslint:disable

/**
 * Web model for import settings network references
 * @export
 * @interface ImportSettingsNetworkReferenceWebModel
 */
export interface ImportSettingsNetworkReferenceWebModel {
  /**
   * The header name on the import that contains the unique identifier of the network section
   * @type {string}
   * @memberof ImportSettingsNetworkReferenceWebModel
   */
  referenceHeader: string;
  /**
   * The header name on the import that contains the start chainage value
   * @type {string}
   * @memberof ImportSettingsNetworkReferenceWebModel
   */
  startChainageHeader?: string;
  /**
   * The header name on the import that contains the end chainage value
   * @type {string}
   * @memberof ImportSettingsNetworkReferenceWebModel
   */
  endChainageHeader?: string;
  /**
   * The header name on the import that contains the xsp value
   * @type {string}
   * @memberof ImportSettingsNetworkReferenceWebModel
   */
  xspHeader?: string;
  /**
   * The design code of the network that contains sections to reference against, the design should be network referenceable
   * @type {string}
   * @memberof ImportSettingsNetworkReferenceWebModel
   */
  networkDesignCode: string;
  /**
   * The attribute code of the unique identifier for the network section, used to match referenceHeader on
   * @type {string}
   * @memberof ImportSettingsNetworkReferenceWebModel
   */
  networkReferenceAttributeCode: string;
}
