import OLGeoJson from 'ol/format/GeoJSON';
import OLProjection from 'ol/proj/Projection';
import { AlloyMapError } from '../error/AlloyMapError';
import { PolyfillProj } from '../polyfills/PolyfillProj';
import { EpsgIo } from './epsg-io/EpsgIo';
import { EpsgIoSearchResponse } from './epsg-io/EpsgIoSearchResponse';

/**
 * utility class for playing with projections
 * @ignore
 * @internal
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

  /**
   * The GeoJson formatter to convert geometry from API projection to feature map projection
   */
  public static readonly GEOJSON = new OLGeoJson({
    // the projection to convert the data into (should match the layer)
    featureProjection: ProjectionUtils.MAP_PROJECTION,
    // the projection the data is expected to be in
    dataProjection: ProjectionUtils.API_PROJECTION,
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

  /**
   * Registers a projection
   * @param epsg espg number to register projection for
   */
  public static async register(epsg: number): Promise<void> {
    const code = 'EPSG:' + epsg;
    try {
      ProjectionUtils.getProjectionOrThrow(code);
    } catch (e) {
      const epsgDef: string = await this.requestEpsgDefinition(epsg);
      PolyfillProj.register(code, epsgDef);
    }
  }

  /**
   * Internal method to request epsg defintion from epsg.io
   * @param epsg epsg number to find defintion for
   * @ignore
   * @internal
   */
  private static async requestEpsgDefinition(epsg: number): Promise<string> {
    const code = 'EPSG:' + epsg;
    let epsgResponse: EpsgIoSearchResponse;
    try {
      epsgResponse = await EpsgIo.search(epsg.toString());
      if (epsgResponse.results.length === 0) {
        throw new AlloyMapError(1559555257, `Could not find projection ${code} on epsg.io`);
      }
    } catch (e) {
      throw new AlloyMapError(1562246276, `Failed to get projection for ${code}`);
    }
    return epsgResponse.results[0].proj4;
  }
}
