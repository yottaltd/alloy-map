import { DodiStencilControlWebModel } from './DodiStencilControlWebModel';
/**
 * Web model for stencil
 * @export
 * @interface DodiStencilCreateWebModel
 */
export interface DodiStencilCreateWebModel {
  /**
   * The controls that make up this stencil
   * @type {Array<DodiStencilControlWebModel>}
   * @memberof DodiStencilCreateWebModel
   */
  controls: Array<DodiStencilControlWebModel>;
}
