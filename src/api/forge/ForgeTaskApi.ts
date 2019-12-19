// tslint:disable
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
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeTaskApi
   */
  public taskTasks(options?: any) {
    return ForgeTaskApiFp(this.configuration).taskTasks(options)(this.fetch, this.basePath);
  }

}
