// tslint:disable
import { DesignWebModel } from './DesignWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfDesignWebModel
 */
export interface PaginatedWebResponseModelBaseOfDesignWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignWebModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<DesignWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfDesignWebModel
   */
  results: Array<DesignWebModel>;
}
