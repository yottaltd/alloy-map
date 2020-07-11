import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * Web request model for a dodi attribute edit operation
 * @export
 * @interface DodiAttributeEditWebRequestModel
 */
export interface DodiAttributeEditWebRequestModel {
  /**
   * The dodi attribute name
   * @type {string}
   * @memberof DodiAttributeEditWebRequestModel
   */
  name: string;
  /**
   * If true, the dodi attribute is required an must be specified during creation
   * @type {boolean}
   * @memberof DodiAttributeEditWebRequestModel
   */
  required: boolean;
  /**
   * If true, the attribute can never be edited
   * @type {boolean}
   * @memberof DodiAttributeEditWebRequestModel
   */
  readonly: boolean;
  /**
   * If true, the other items within the same design cannot have the same value for this attribute
   * @type {boolean}
   * @memberof DodiAttributeEditWebRequestModel
   */
  unique: boolean;
  /**
   * Optional tags to add to an attribute if it has to follow some special behaviour. For example, whether it represents a time duration
   * @type {Array<string>}
   * @memberof DodiAttributeEditWebRequestModel
   */
  tags: Array<string>;
  /**
   * The attribute options containing options and additional info depending on the attribute type
   * @type {DodiAttributeOptionsWebModelBase}
   * @memberof DodiAttributeEditWebRequestModel
   */
  options: DodiAttributeOptionsWebModelBase;
  /**
   * The signature is used to ensure that the dodi being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same dodi
   * @type {string}
   * @memberof DodiAttributeEditWebRequestModel
   */
  signature: string;
}
