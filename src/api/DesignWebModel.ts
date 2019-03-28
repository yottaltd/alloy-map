// tslint:disable
import { CollectionCode } from './CollectionCode';
import { Context } from './Context';
import { DesignGeometryWebModel } from './DesignGeometryWebModel';
import { DodiAttributeWebModel } from './DodiAttributeWebModel';
import { DodiImplementsWebModel } from './DodiImplementsWebModel';
import { MetadataWebModel } from './MetadataWebModel';
/**
 * 
 * @export
 * @interface DesignWebModel
 */
export interface DesignWebModel {
  /**
   * 
   * @type {string}
   * @memberof DesignWebModel
   */
  name: string;
  /**
   * 
   * @type {string}
   * @memberof DesignWebModel
   */
  code: string;
  /**
   * 
   * @type {Context}
   * @memberof DesignWebModel
   */
  context: Context;
  /**
   * 
   * @type {Array<DodiImplementsWebModel>}
   * @memberof DesignWebModel
   */
  'implements': Array<DodiImplementsWebModel>;
  /**
   * 
   * @type {Array<DodiAttributeWebModel>}
   * @memberof DesignWebModel
   */
  attributes: Array<DodiAttributeWebModel>;
  /**
   * 
   * @type {MetadataWebModel}
   * @memberof DesignWebModel
   */
  metadata: MetadataWebModel;
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
   * @type {string}
   * @memberof DesignWebModel
   */
  title: string;
  /**
   * 
   * @type {string}
   * @memberof DesignWebModel
   */
  subtitle: string;
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
