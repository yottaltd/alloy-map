import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ForgeTaskApiFp } from './ForgeTaskApiFp';
import { ForgeTaskApi } from './ForgeTaskApi';
/**
 * ForgeTaskApi - factory interface
 * @export
 */
export const ForgeTaskApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary List all running tasks and their state
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    taskTask(id: string, options?: any) {
      return ForgeTaskApiFp(configuration).taskTask(id, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List all running tasks and their state
     * @param {string} [query] Optional query to filter the tasks by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    taskTasks(query?: string, page?: number, pageSize?: number, options?: any) {
      return ForgeTaskApiFp(configuration).taskTasks(query, page, pageSize, options)(fetch, basePath);
    },
  };
};
