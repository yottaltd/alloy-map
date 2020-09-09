import { SortingOrder } from './SortingOrder';
/**
 * 
 * @export
 * @interface DataSourceColumnSortData
 */
export interface DataSourceColumnSortData {
  /**
   * 
   * @type {string}
   * @memberof DataSourceColumnSortData
   */
  columnName: string;
  /**
   * 
   * @type {SortingOrder}
   * @memberof DataSourceColumnSortData
   */
  sortingOrder: SortingOrder;
}
