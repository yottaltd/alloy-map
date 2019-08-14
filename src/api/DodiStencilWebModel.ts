// tslint:disable
import { DodiStencilControlWebModel } from './DodiStencilControlWebModel';
/**
 * 
 * @export
 * @interface DodiStencilWebModel
 */
export interface DodiStencilWebModel {
  /**
   * 
   * @type {Array<DodiStencilControlWebModel>}
   * @memberof DodiStencilWebModel
   */
  controls: Array<DodiStencilControlWebModel>;
  /**
   * 
   * @type {string}
   * @memberof DodiStencilWebModel
   */
  parent: string;
}
