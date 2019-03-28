// tslint:disable
import { BaseAPI } from './BaseAPI';
import { TaskApiFp } from './TaskApiFp';
/**
 * TaskApi - object-oriented interface
 * @export
 * @class TaskApi
 * @extends {BaseAPI}
 */
export class TaskApi extends BaseAPI {
  /**
   * 
   * @summary Get a task by its AId
   * @param {string} id The AId of the task to get
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TaskApi
   */
  public taskGet(id: string, options?: any) {
    return TaskApiFp(this.configuration).taskGet(id, options)(this.fetch, this.basePath);
  }

}
