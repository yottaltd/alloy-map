// tslint:disable
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
/**
 * Supports dynamic parts formatted by: $context$expression$. Currently supports: `$input$[AttributeCode]$`: Substitute the value of an attribute from the input to the action. `$utcnow$[signed integer milliseconds]$`: Substitute the current time in the workflow run, offset by a number of milliseconds.
 * @export
 * @interface WorkflowVirtualItemAttributeWebModel
 */
export interface WorkflowVirtualItemAttributeWebModel {
  /**
   * The attribute to apply the virtual definition to
   * @type {string}
   * @memberof WorkflowVirtualItemAttributeWebModel
   */
  attributeCode: string;
  /**
   * The virtual definition
   * @type {string}
   * @memberof WorkflowVirtualItemAttributeWebModel
   */
  virtualDefinition: string;
}
