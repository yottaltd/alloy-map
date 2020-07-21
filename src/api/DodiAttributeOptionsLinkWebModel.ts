import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsLinkWebModel
 */
export interface DodiAttributeOptionsLinkWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * The dodi Guc that this attribute can link to
   * @type {string}
   * @memberof DodiAttributeOptionsLinkWebModel
   */
  code: string;
  /**
   * The graph type that this link belongs to
   * @type {string}
   * @memberof DodiAttributeOptionsLinkWebModel
   */
  graph: string;
  /**
   * When an item is deleted, all its children connected through links which are NOT weak references, will be deleted as well. Setting this parameter will currently have no effect and it is set internally
   * @type {boolean}
   * @memberof DodiAttributeOptionsLinkWebModel
   */
  weakReference: boolean;
  /**
   * The maximum number of connections
   * @type {number}
   * @memberof DodiAttributeOptionsLinkWebModel
   */
  max?: number;
  /**
   * The optional default value of this attribute
   * @type {Array<string>}
   * @memberof DodiAttributeOptionsLinkWebModel
   */
  defaultValue?: Array<string>;
}
