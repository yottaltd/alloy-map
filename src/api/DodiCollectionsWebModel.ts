import { CollectionCode } from './CollectionCode';
/**
 * Web model for dodi collections
 * @export
 * @interface DodiCollectionsWebModel
 */
export interface DodiCollectionsWebModel {
  /**
   * The dodi collection codes
   * @type {Array<CollectionCode>}
   * @memberof DodiCollectionsWebModel
   */
  values: Array<CollectionCode>;
  /**
   * The parent dodi Guc, i.e. the dodi that defines collections
   * @type {string}
   * @memberof DodiCollectionsWebModel
   */
  parent: string;
}
