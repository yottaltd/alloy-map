import { AlloyMapError } from '../../error/AlloyMapError';
import { EpsgIoSearchResponse } from './EpsgIoSearchResponse';

/**
 * @ignore
 * @internal
 */
export abstract class EpsgIo {
  // search the public database on https://epsg.io/
  public static async search(query: string): Promise<EpsgIoSearchResponse> {
    let response: Response;
    try {
      response = await fetch(`https://epsg.io/?q=${encodeURI(query)}&format=json`);
    } catch (error) {
      throw new AlloyMapError(1559492715, 'request to epsg.io failed', error);
    }

    try {
      return response.json();
    } catch (error) {
      throw new AlloyMapError(1559492711, 'failed to parse json response from epsg.io', error);
    }
  }
}
