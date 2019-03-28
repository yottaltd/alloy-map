// tslint:disable
import { DesignWebModel } from './DesignWebModel';
/**
 * Web model for a dodi attribute
 * @export
 * @interface DodiAttributeCreateWebResponseModel
 */
export interface DodiAttributeCreateWebResponseModel {
  /**
   * The created dodi attribute Guc
   * @type {string}
   * @memberof DodiAttributeCreateWebResponseModel
   */
  attributeCode: string;
  /**
   * The design model into which new attribute is added
   * @type {DesignWebModel}
   * @memberof DodiAttributeCreateWebResponseModel
   */
  design: DesignWebModel;
}
