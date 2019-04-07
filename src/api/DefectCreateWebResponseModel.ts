// tslint:disable
import { ItemWebModel } from './ItemWebModel';
/**
 * Web response model for defect item creation
 * @export
 * @interface DefectCreateWebResponseModel
 */
export interface DefectCreateWebResponseModel {
  /**
   * The created defect item
   * @type {ItemWebModel}
   * @memberof DefectCreateWebResponseModel
   */
  defectItem: ItemWebModel;
}
