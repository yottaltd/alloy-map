// tslint:disable
import { Context } from './Context';
import { DodiAttributeWebModel } from './DodiAttributeWebModel';
import { DodiImplementsWebModel } from './DodiImplementsWebModel';
import { DodiStencilWebModel } from './DodiStencilWebModel';
import { MetadataWebModel } from './MetadataWebModel';
/**
 * 
 * @export
 * @interface DodiWebModel
 */
export interface DodiWebModel {
  /**
   * 
   * @type {string}
   * @memberof DodiWebModel
   */
  name: string;
  /**
   * 
   * @type {string}
   * @memberof DodiWebModel
   */
  code: string;
  /**
   * 
   * @type {Context}
   * @memberof DodiWebModel
   */
  context: Context;
  /**
   * 
   * @type {Array<DodiImplementsWebModel>}
   * @memberof DodiWebModel
   */
  'implements': Array<DodiImplementsWebModel>;
  /**
   * 
   * @type {Array<DodiAttributeWebModel>}
   * @memberof DodiWebModel
   */
  attributes: Array<DodiAttributeWebModel>;
  /**
   * 
   * @type {string}
   * @memberof DodiWebModel
   */
  title?: string;
  /**
   * 
   * @type {string}
   * @memberof DodiWebModel
   */
  subtitle?: string;
  /**
   * 
   * @type {MetadataWebModel}
   * @memberof DodiWebModel
   */
  metadata: MetadataWebModel;
  /**
   * 
   * @type {DodiStencilWebModel}
   * @memberof DodiWebModel
   */
  stencil?: DodiStencilWebModel;
  /**
   * 
   * @type {string}
   * @memberof DodiWebModel
   */
  discriminator: string;
}
