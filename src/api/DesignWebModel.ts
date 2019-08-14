// tslint:disable
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
   * 
   * @type {string}
   * @memberof DesignWebModel
   */
  colour: string;
  /**
   * 
   * @type {string}
   * @memberof DesignWebModel
   */
  icon: string;
  /**
   * 
   * @type {boolean}
   * @memberof DesignWebModel
   */
  versioned: boolean;
  /**
   * 
   * @type {DesignGeometryWebModel}
   * @memberof DesignWebModel
   */
  geometry: DesignGeometryWebModel;
  /**
   * 
   * @type {Array<CollectionCode>}
   * @memberof DesignWebModel
   */
  collections: Array<CollectionCode>;
}
