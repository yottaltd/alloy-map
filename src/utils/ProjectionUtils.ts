import OLProjection from 'ol/proj/Projection';
import OLGeoJson from 'ol/format/GeoJSON';
import { AlloyMapError } from '../error/AlloyMapError';
import { PolyfillProj } from '../polyfills/PolyfillProj';

/**
 * utility class for playing with projections
 * @ignore
 */
export abstract class ProjectionUtils {
  /**
   * epsg:3857 projection see: https://epsg.io/3857
   */
  public static readonly EPSG3857: OLProjection = ProjectionUtils.getProjectionOrThrow('EPSG:3857');

  /**
   * epsg:4326 projection see: https://epsg.io/4326
   */
  public static readonly EPSG4326: OLProjection = ProjectionUtils.getProjectionOrThrow('EPSG:4326');

  /**
   * the alloy map projection, same as `EPSG3857`
   */
  public static readonly MAP_PROJECTION: OLProjection = ProjectionUtils.EPSG3857;

  /**
   * the alloy api projection, same as `EPSG4326`
   */
  public static readonly API_PROJECTION: OLProjection = ProjectionUtils.EPSG4326;

  public static readonly GEOJSON = new OLGeoJson({
    // the projection to convert the data into (should match the layer)
    featureProjection: ProjectionUtils.MAP_PROJECTION,
    // the projection the data is expected to be in
    defaultDataProjection: ProjectionUtils.API_PROJECTION,
  });

  /**
   * gets a projection code or throws
   * @param projection the projection code to get
   */
  public static getProjectionOrThrow(projection: string): OLProjection {
    const proj = PolyfillProj.get(projection);
    if (!proj) {
      throw new AlloyMapError(1553794154, 'failed to get projection with code: ' + projection);
    }
    return proj;
  }
}
