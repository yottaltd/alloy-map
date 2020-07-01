
/**
 * Blueprint apply request
 * @export
 * @interface BlueprintApplyWebRequestModel
 */
export interface BlueprintApplyWebRequestModel {
  /**
   * Customer to apply the module to
   * @type {string}
   * @memberof BlueprintApplyWebRequestModel
   */
  customerId: string;
  /**
   * locale to use
   * @type {string}
   * @memberof BlueprintApplyWebRequestModel
   */
  locale: string;
  /**
   * Id of module to apply
   * @type {string}
   * @memberof BlueprintApplyWebRequestModel
   */
  moduleCode: string;
}
