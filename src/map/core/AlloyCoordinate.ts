import { PolyfillProj } from '@/polyfills/PolyfillProj';
import { MathUtils } from '@/utils/MathUtils';
import { Coordinate as OLCoordinate } from 'ol/coordinate';

/**
 * the difference between two lat/lon values allowed to be considered as the same value
 * @ignore
 */
const ALLOWED_EQUALITY_DIFFERENCE = 0.00001;

/**
 * an alloy coordinate represents lon/lat positions on the map, it is normalised to always represent
 * longitude and latitude in [EPSG:4326](https://epsg.io/4326)
 */
export class AlloyCoordinate {
  /**
   * creates an alloy coordinate instance from an array of numbers provided by the map, this
   * function will convert the values into normalised lon lat
   * @param array assumed to be in `[x,y]` format [EPSG:3857](https://epsg.io/3857)
   * @ignore
   * @internal
   */
  public static fromMapCoordinate(array: OLCoordinate) {
    array = PolyfillProj.toLonLat(array);
    return new AlloyCoordinate(array[0], array[1]);
  }

  /**
   * the latitude (y)
   */
  public lat: number;

  /**
   * the longitude (x)
   */
  public lon: number;

  /**
   * creates a new instance
   * @param lon longitude (x)
   * @param lat latitude (y)
   */
  constructor(lon: number, lat: number) {
    this.lat = lat;
    this.lon = lon;
  }

  /**
   * creates an array ready to be used on the map, this function will convert the values into
   * [EPSG:3857](https://epsg.io/3857)
   * @ignore
   * @internal
   */
  public toMapCoordinate(): OLCoordinate {
    return PolyfillProj.fromLonLat([this.lon, this.lat]);
  }

  /**
   * checks equality of this instance with another alloy coordinate
   * @param other the other coordinate to compare
   */
  public equals(other: AlloyCoordinate) {
    return (
      MathUtils.approximateEquals(this.lat, other.lat, ALLOWED_EQUALITY_DIFFERENCE) &&
      MathUtils.approximateEquals(this.lon, other.lon, ALLOWED_EQUALITY_DIFFERENCE)
    );
  }

  /**
   * deep clones the alloy coordinate
   */
  public clone(): AlloyCoordinate {
    return new AlloyCoordinate(this.lon, this.lat);
  }
}
