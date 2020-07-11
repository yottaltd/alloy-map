
/**
 * Base model for all syntax nodes that can be used to represent workflow variables and computed parameters
 * @export
 * @interface WorkflowSyntaxNodeBaseWebModel
 */
export interface WorkflowSyntaxNodeBaseWebModel {
  /**
   * 
   * @type {string}
   * @memberof WorkflowSyntaxNodeBaseWebModel
   */
  discriminator: string;
}
