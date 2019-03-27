import { fromLonLat, toLonLat } from 'ol/proj.js';

/**
 * utility class for accessing ol/proj functions due to typing issues
 */
export abstract class OLProj {
  /**
   * transforms a coordinate to lon lat [EPSG:4326](https://epsg.io/4326)
   * @param coordinate the coordinate to transform
   * @param projection the optional projection to use defaults to [EPSG:3857](https://epsg.io/3857)
   */
  public static toLonLat(coordinate: [number, number], projection?: string): [number, number] {
    return toLonLat(coordinate, projection);
  }

  /**
   * transforms a coordinate from lon lat [EPSG:4326](https://epsg.io/4326)
   * @param coordinate the coordinate to transform
   * @param projection the optional projection to use defaults to [EPSG:4326](https://epsg.io/4326)
   */
  public static fromLonLat(coordinate: [number, number], projection?: string): [number, number] {
    return fromLonLat(coordinate, projection);
  }
}
