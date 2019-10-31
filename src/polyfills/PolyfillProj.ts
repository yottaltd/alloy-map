import { Coordinate as OLCoordinate } from 'ol/coordinate';
import { Extent as OLExtent } from 'ol/extent';
import { fromLonLat, get, toLonLat, transformExtent } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import OLProjection from 'ol/proj/Projection';

// ugly hack to allow building taken from here
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/15663
import * as proj4x from 'proj4';
const proj4 = (proj4x as any).default;

/**
 * utility class for accessing ol/proj functions due to typing issues.
 * see: https://openlayers.org/en/latest/apidoc/module-ol_proj.html
 * @ignore
 * @internal
 */
export abstract class PolyfillProj {
  /**
   * transforms a coordinate to lon lat [EPSG:4326](https://epsg.io/4326)
   * @param coordinate the coordinate to transform
   * @param projection the optional projection to use defaults to [EPSG:3857](https://epsg.io/3857)
   */
  public static toLonLat(coordinate: OLCoordinate, projection?: string): OLCoordinate {
    return toLonLat(coordinate, projection);
  }

  /**
   * transforms a coordinate from lon lat [EPSG:4326](https://epsg.io/4326)
   * @param coordinate the coordinate to transform
   * @param projection the optional projection to use defaults to [EPSG:4326](https://epsg.io/4326)
   */
  public static fromLonLat(coordinate: OLCoordinate, projection?: string): OLCoordinate {
    return fromLonLat(coordinate, projection);
  }

  /**
   * fetches a Projection object for the code specified
   * @param projection the projection code to fetch e.g. EPSG:4326
   */
  public static get(projection: string): OLProjection | null {
    return get(projection) || null;
  }

  /**
   * Registers proj4 with openlayers
   * @param proj proj4 object to register with openlayers
   */
  public static register(code: string, def: string | proj4x.ProjectionDefinition) {
    proj4.defs(code, def);
    register(proj4);
  }

  /**
   * Transforms an extent from one projection to another
   * @param extent extent to transform
   * @param from source projection
   * @param to destination projection
   */
  public static transformExtent(extent: OLExtent, from: OLProjection, to: OLProjection): OLExtent {
    return transformExtent(extent, from, to);
  }
}
