import { AlloyMapError } from '@/error/AlloyMapError';
import { EpsgIoSearchResponse } from '@/utils/epsg-io/EpsgIoSearchResponse';

/**
 * Utils for seaching https://epsg.io for EPSG definitions
 */
export abstract class EpsgIo {
  /**
   * Requests an EPSG defintion from the public database on https://epsg.io/
   * @param query epsg code to query for
   */
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
