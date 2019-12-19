// tslint:disable
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
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    taskTasks(options?: any) {
      return ForgeTaskApiFp(configuration).taskTasks(options)(fetch, basePath);
    },
  };
};
