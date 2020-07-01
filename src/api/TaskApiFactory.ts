import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { TaskApiFp } from './TaskApiFp';
import { TaskApi } from './TaskApi';
/**
 * TaskApi - factory interface
 * @export
 */
export const TaskApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary Get a task by its identifier
     * @param {string} id The identifier of the task to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    taskGet(id: string, options?: any) {
      return TaskApiFp(configuration).taskGet(id, options)(fetch, basePath);
    },
  };
};
