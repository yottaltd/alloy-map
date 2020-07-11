import { AqsJoinResultQueryWebModel } from './AqsJoinResultQueryWebModel';
/**
 * Web model of an aqs join result
 * @export
 * @interface AqsJoinResultWebModel
 */
export interface AqsJoinResultWebModel {
  /**
   * The item AId
   * @type {string}
   * @memberof AqsJoinResultWebModel
   */
  itemId: string;
  /**
   * The join queries executed grouping join attributes by common paths.
   * @type {Array<AqsJoinResultQueryWebModel>}
   * @memberof AqsJoinResultWebModel
   */
  joinQueries: Array<AqsJoinResultQueryWebModel>;
}
