// tslint:disable
import { DesignInterfaceGetWebResponseModel } from './DesignInterfaceGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfDesignInterfaceGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfDesignInterfaceGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignInterfaceGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignInterfaceGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignInterfaceGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignInterfaceGetWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<DesignInterfaceGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfDesignInterfaceGetWebResponseModel
   */
  results: Array<DesignInterfaceGetWebResponseModel>;
}
