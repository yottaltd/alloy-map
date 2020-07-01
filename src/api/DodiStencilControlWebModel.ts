import { JObject } from './JObject';
/**
 * Dodi stencil control web model
 * @export
 * @interface DodiStencilControlWebModel
 */
export interface DodiStencilControlWebModel {
  /**
   * The control code
   * @type {string}
   * @memberof DodiStencilControlWebModel
   */
  code: string;
  /**
   * The properties to configure the control, see: https://github.com/yottaltd/alloy-web for specification
   * @type {JObject}
   * @memberof DodiStencilControlWebModel
   */
  properties: JObject;
  /**
   * Whether the control should be ignored when rendering
   * @type {boolean}
   * @memberof DodiStencilControlWebModel
   */
  hidden: boolean;
  /**
   * The optional attribute code which ties the control to an attribute on the dodi
   * @type {string}
   * @memberof DodiStencilControlWebModel
   */
  attributeCode?: string;
}
