import { Configuration } from '../api/configuration';
import { Api } from './Api';
import { responseInterceptor } from './responseInterceptor';

/**
 * factory class for creating api instances
 * @ignore
 * @internal
 */
export abstract class ApiFactory {
  /**
   * creates a new api instance
   * @param apiUrl the basepath of the api
   * @param token the token to authenticate requests
   */
  public static api(apiUrl: string, token: string): Api {
    return new Api(
      new Configuration({
        basePath: apiUrl,
        responseInterceptor,
        apiKey: token,
      }),
    );
  }
}
