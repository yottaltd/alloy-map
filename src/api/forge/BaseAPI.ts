// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
  protected configuration?: Configuration;

  constructor(configuration?: Configuration, protected basePath: string = '', protected fetch: FetchAPI = portableFetch) {
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath || this.basePath;
    }
  }
};
