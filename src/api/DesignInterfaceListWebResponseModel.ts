// tslint:disable
import { DesignInterfaceGetWebResponseModel } from './DesignInterfaceGetWebResponseModel';
/**
 * Web response model for a design interface list operation
 * @export
 * @interface DesignInterfaceListWebResponseModel
 */
export interface DesignInterfaceListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof DesignInterfaceListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof DesignInterfaceListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof DesignInterfaceListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof DesignInterfaceListWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<DesignInterfaceGetWebResponseModel>}
   * @memberof DesignInterfaceListWebResponseModel
   */
  results: Array<DesignInterfaceGetWebResponseModel>;
}
