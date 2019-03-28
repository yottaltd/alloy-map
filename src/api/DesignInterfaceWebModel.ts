// tslint:disable
import { Context } from './Context';
import { DodiAttributeWebModel } from './DodiAttributeWebModel';
import { DodiImplementsWebModel } from './DodiImplementsWebModel';
import { MetadataWebModel } from './MetadataWebModel';
/**
 * 
 * @export
 * @interface DesignInterfaceWebModel
 */
export interface DesignInterfaceWebModel {
  /**
   * 
   * @type {string}
   * @memberof DesignInterfaceWebModel
   */
  name: string;
  /**
   * 
   * @type {string}
   * @memberof DesignInterfaceWebModel
   */
  code: string;
  /**
   * 
   * @type {Context}
   * @memberof DesignInterfaceWebModel
   */
  context: Context;
  /**
   * 
   * @type {Array<DodiImplementsWebModel>}
   * @memberof DesignInterfaceWebModel
   */
  'implements': Array<DodiImplementsWebModel>;
  /**
   * 
   * @type {Array<DodiAttributeWebModel>}
   * @memberof DesignInterfaceWebModel
   */
  attributes: Array<DodiAttributeWebModel>;
  /**
   * 
   * @type {MetadataWebModel}
   * @memberof DesignInterfaceWebModel
   */
  metadata: MetadataWebModel;
}
