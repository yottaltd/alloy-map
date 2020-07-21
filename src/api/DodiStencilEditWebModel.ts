import { DodiStencilControlWebModel } from './DodiStencilControlWebModel';
/**
 * Web model for stencil
 * @export
 * @interface DodiStencilEditWebModel
 */
export interface DodiStencilEditWebModel {
  /**
   * The controls that make up this stencil
   * @type {Array<DodiStencilControlWebModel>}
   * @memberof DodiStencilEditWebModel
   */
  controls: Array<DodiStencilControlWebModel>;
}
