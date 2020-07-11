import { BaseAPI } from './BaseAPI';
import { ForgeTaskApiFp } from './ForgeTaskApiFp';
/**
 * ForgeTaskApi - object-oriented interface
 * @export
 * @class ForgeTaskApi
 * @extends {BaseAPI}
 */
export class ForgeTaskApi extends BaseAPI {
  /**
   * 
   * @summary List all running tasks and their state
   * @param {string} id 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeTaskApi
   */
  public taskTask(id: string, options?: any) {
    return ForgeTaskApiFp(this.configuration).taskTask(id, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List all running tasks and their state
   * @param {string} [query] Optional query to filter the tasks by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeTaskApi
   */
  public taskTasks(query?: string, page?: number, pageSize?: number, options?: any) {
    return ForgeTaskApiFp(this.configuration).taskTasks(query, page, pageSize, options)(this.fetch, this.basePath);
  }

}
