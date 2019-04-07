// tslint:disable

/**
 * Web request model for a remove interface from design operation
 * @export
 * @interface DesignRemoveDesignInterfaceWebRequestModel
 */
export interface DesignRemoveDesignInterfaceWebRequestModel {
  /**
   * The signature is used to ensure that the design being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same design
   * @type {string}
   * @memberof DesignRemoveDesignInterfaceWebRequestModel
   */
  signature: string;
}
