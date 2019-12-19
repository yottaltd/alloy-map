// tslint:disable
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
/**
 * Supports dynamic parts formatted by: $context$expression$. Currently supports: `$input$[AttributeCode]$`: Substitute the value of an attribute from the input to the action. `$input$itemId$`: Substitute the ItemId of the input item to the action. `$input(N)$[AttributeCode]$`: Substitute the value of an attribute from the Nth input to the action. `$output([ActionId])$[AttributeCode]$`: Substitute the value of an attribute from a specific action within the workflow. `$utcnow$[signed integer milliseconds]$`: Substitute the current time in the workflow run, offset by a number of milliseconds. Combinations are allowed and will be concatenated as a string, and attempted to be parsed back to the specified attribute type.  This allows templating of AQS queries, or simple building of string attributes,  e.g. `$input(0)$attributes_name$ has £$input(1)$attributes_balance$`
 * @export
 * @interface WorkflowVirtualItemAttributeWebModel
 */
export interface WorkflowVirtualItemAttributeWebModel extends WorkflowActionParameterValueWebModelBase {
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
