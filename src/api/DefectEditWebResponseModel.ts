import { ItemWebModel } from './ItemWebModel';
/**
 * Web model for defect editing
 * @export
 * @interface DefectEditWebResponseModel
 */
export interface DefectEditWebResponseModel {
  /**
   * The edited defect item
   * @type {ItemWebModel}
   * @memberof DefectEditWebResponseModel
   */
  defectItem: ItemWebModel;
}
