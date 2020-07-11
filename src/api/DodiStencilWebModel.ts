import { DodiStencilControlWebModel } from './DodiStencilControlWebModel';
/**
 * Web model for stencil
 * @export
 * @interface DodiStencilWebModel
 */
export interface DodiStencilWebModel {
  /**
   * The controls that make up this stencil
   * @type {Array<DodiStencilControlWebModel>}
   * @memberof DodiStencilWebModel
   */
  controls: Array<DodiStencilControlWebModel>;
  /**
   * The Guc identifying the parent this stencil comes from
   * @type {string}
   * @memberof DodiStencilWebModel
   */
  parent: string;
}
