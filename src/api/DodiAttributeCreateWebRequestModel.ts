import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * Web request model for a dodi attribute create operation
 * @export
 * @interface DodiAttributeCreateWebRequestModel
 */
export interface DodiAttributeCreateWebRequestModel {
  /**
   * The name of the dodi attribute
   * @type {string}
   * @memberof DodiAttributeCreateWebRequestModel
   */
  name: string;
  /**
   * If true, this is a required attribute
   * @type {boolean}
   * @memberof DodiAttributeCreateWebRequestModel
   */
  required: boolean;
  /**
   * If true this, is a readonly attribute and can only be set on creation
   * @type {boolean}
   * @memberof DodiAttributeCreateWebRequestModel
   */
  readonly: boolean;
  /**
   * If true, this attribute must be unique within a design
   * @type {boolean}
   * @memberof DodiAttributeCreateWebRequestModel
   */
  unique: boolean;
  /**
   * Optional tags to add to an attribute if it has to follow some special behaviour. For example, whether it represents a time duration
   * @type {Array<string>}
   * @memberof DodiAttributeCreateWebRequestModel
   */
  tags?: Array<string>;
  /**
   * The attribute options containing options and additional info depending on the attribute type
   * @type {DodiAttributeOptionsWebModelBase}
   * @memberof DodiAttributeCreateWebRequestModel
   */
  options: DodiAttributeOptionsWebModelBase;
  /**
   * The signature is used to ensure that the design being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same dodi
   * @type {string}
   * @memberof DodiAttributeCreateWebRequestModel
   */
  signature: string;
}
