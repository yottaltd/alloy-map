
/**
 * Web request model to add the specified design interface to the ones implemented by the design
 * @export
 * @interface DesignAddDesignInterfaceWebRequestModel
 */
export interface DesignAddDesignInterfaceWebRequestModel {
  /**
   * The Guc of the interface to be added
   * @type {string}
   * @memberof DesignAddDesignInterfaceWebRequestModel
   */
  interfaceCode: string;
  /**
   * The signature is used to ensure that the design being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same design
   * @type {string}
   * @memberof DesignAddDesignInterfaceWebRequestModel
   */
  signature: string;
}
