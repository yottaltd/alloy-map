import { Context } from './Context';
import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
import { DodiAttributeType } from './DodiAttributeType';
/**
 * Web model for a dodi attribute
 * @export
 * @interface DodiAttributeWebModel
 */
export interface DodiAttributeWebModel {
  /**
   * The dodi attribute name
   * @type {string}
   * @memberof DodiAttributeWebModel
   */
  name: string;
  /**
   * The dodi attribute Guc
   * @type {string}
   * @memberof DodiAttributeWebModel
   */
  code: string;
  /**
   * The parent dodi Guc, i.e. the dodi that defines this attribute
   * @type {string}
   * @memberof DodiAttributeWebModel
   */
  parent: string;
  /**
   * The Context of the attribute. It specifies whether this attribute is part of the core system, it belongs to a module, or it is on a customer level only
   * @type {Context}
   * @memberof DodiAttributeWebModel
   */
  context: Context;
  /**
   * The attribute type, e.g. number, boolean, geometry etc.
   * @type {DodiAttributeType}
   * @memberof DodiAttributeWebModel
   */
  type: DodiAttributeType;
  /**
   * If true, the attribute is required and cannot be left empty
   * @type {boolean}
   * @memberof DodiAttributeWebModel
   */
  required: boolean;
  /**
   * If true, the attribute is readonly and cannot be edited
   * @type {boolean}
   * @memberof DodiAttributeWebModel
   */
  readonly: boolean;
  /**
   * If true, the attribute value must be unique within a design
   * @type {boolean}
   * @memberof DodiAttributeWebModel
   */
  unique: boolean;
  /**
   * Optional tags to add to an attribute if it has to follow some special behaviour. For example, whether it represents a time duration
   * @type {Array<string>}
   * @memberof DodiAttributeWebModel
   */
  tags: Array<string>;
  /**
   * The attribute options containing options and additional info depending on the attribute type
   * @type {DodiAttributeOptionsWebModelBase}
   * @memberof DodiAttributeWebModel
   */
  options: DodiAttributeOptionsWebModelBase;
}
