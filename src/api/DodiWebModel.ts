import { Context } from './Context';
import { DodiAttributeWebModel } from './DodiAttributeWebModel';
import { DodiImplementsWebModel } from './DodiImplementsWebModel';
import { DodiStencilWebModel } from './DodiStencilWebModel';
import { MetadataWebModel } from './MetadataWebModel';
/**
 * The web model for a dodi
 * @export
 * @interface DodiWebModel
 */
export interface DodiWebModel {
  /**
   * The dodi name
   * @type {string}
   * @memberof DodiWebModel
   */
  name: string;
  /**
   * The dodi Guc
   * @type {string}
   * @memberof DodiWebModel
   */
  code: string;
  /**
   * The dodi Context
   * @type {Context}
   * @memberof DodiWebModel
   */
  context: Context;
  /**
   * The dodi codes Guc that this dodi implements
   * @type {Array<DodiImplementsWebModel>}
   * @memberof DodiWebModel
   */
  'implements': Array<DodiImplementsWebModel>;
  /**
   * List of dodi attributes on this design
   * @type {Array<DodiAttributeWebModel>}
   * @memberof DodiWebModel
   */
  attributes: Array<DodiAttributeWebModel>;
  /**
   * The optional title template to use to generate the title for an item at runtime. Mustache notation can be used in this template with attribute codes within the curly braces. For example \"Job-{{attributes_jobNumber}}\" will evaluate to \"Job-1232\"
   * @type {string}
   * @memberof DodiWebModel
   */
  title?: string;
  /**
   * The optional subtitle template to use to generate the subtitle for an item at runtime. Mustache notation can be used in this template with attribute codes within the curly braces. For example \"Light {{attributes_unitNumber}}\" will evaluate to \"Light 007\"
   * @type {string}
   * @memberof DodiWebModel
   */
  subtitle?: string;
  /**
   * The metadata for a design or design interface
   * @type {MetadataWebModel}
   * @memberof DodiWebModel
   */
  metadata: MetadataWebModel;
  /**
   * The stencil used by this dodi and the ones implementing it. Note that a stencil in a closer \"dodi\" overrides any stencil in a \"further away\" dodi
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
