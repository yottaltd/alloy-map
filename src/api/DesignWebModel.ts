import { CollectionCode } from './CollectionCode';
import { DesignGeometryWebModel } from './DesignGeometryWebModel';
import { DodiWebModel } from './DodiWebModel';
/**
 * 
 * @export
 * @interface DesignWebModel
 */
export interface DesignWebModel extends DodiWebModel {
  /**
   * The default design colour in the format #123456
   * @type {string}
   * @memberof DesignWebModel
   */
  colour: string;
  /**
   * The default design icon code
   * @type {string}
   * @memberof DesignWebModel
   */
  icon: string;
  /**
   * If true, the items of this design will have versioning enabled. This is needed for the timelord to work. A versioned item has one to many item versions and each of them represents the item in a specific temporal interval which is denoted by its start and end date. Only enable this feature if you are interest in the state of an item at a certain point in time, e.g. how the street light was 2 years ago. Delete items for this kind of designs will actually be end dated instead of being deleted, so that it will be possible to find them when going back in time
   * @type {boolean}
   * @memberof DesignWebModel
   */
  versioned: boolean;
  /**
   * The design geometry details
   * @type {DesignGeometryWebModel}
   * @memberof DesignWebModel
   */
  geometry: DesignGeometryWebModel;
  /**
   * The collections associated to this design
   * @type {Array<CollectionCode>}
   * @memberof DesignWebModel
   */
  collections: Array<CollectionCode>;
}
