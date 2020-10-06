import { AlloyMapError } from '@/error/AlloyMapError';
import { AlloyBasemap } from '@/map/basemaps/AlloyBasemap';
import { AlloyBingBasemap } from '@/map/basemaps/AlloyBingBasemap';
import { AlloyImageWmsBasemap } from '@/map/basemaps/AlloyImageWmsBasemap';
import { AlloyTileBasemap } from '@/map/basemaps/AlloyTileBasemap';
import { AlloyTileBasemapOptions } from '@/map/basemaps/AlloyTileBasemapOptions';
import { AlloyWmsBasemap } from '@/map/basemaps/AlloyWmsBasemap';
import { AlloyWmtsBasemap } from '@/map/basemaps/AlloyWmtsBasemap';
import { ProjectionUtils } from '@/utils/ProjectionUtils';
import { AlloyWmsParameters } from '@/wms/AlloyWmsParameters';
import { AlloyWmtsParameters } from '@/wmts/AlloyWmtsParameters';
import { WmtsUtils } from '@/wmts/WmtsUtils';

/**
 * the mapbox user account we use
 * @ignore
 */
const MAPBOX_ACCOUNT = 'cmcnicholas';

/**
 * the public mapbox access token
 * @ignore
 */
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiY21jbmljaG9sYXMiLCJhIjoiY2p5cGsweGl2MGJlNDNtdWd6d3ZlbnV3OCJ9.pL0aMazFuVgKqwLqITAcBg';

/**
 * generates a mapbox url
 * @param style the style id to generate a url for
 * @ignore
 */
function mapboxUrl(style: string): string {
  return `https://api.mapbox.com/styles/v1/${MAPBOX_ACCOUNT}/${style}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`;
}

/**
 * factory for creating standard alloy basemaps
 */
export abstract class AlloyBasemapFactory {
  /**
   * creates the skyward themed basemap (light blue)
   */
  public static createSkyward(): AlloyBasemap {
    const url = mapboxUrl('cjypjvqqv021j1cuhzwgudzw7');
    const tileSize = 512;
    return new AlloyTileBasemap({ url, tileSize });
  }

  /**
   * creates the nightscape themed basemap (dark blue)
   */
  public static createNightscape(): AlloyBasemap {
    const url = mapboxUrl('cjypkiuvo028g1coyt63evhhy');
    const tileSize = 512;
    return new AlloyTileBasemap({ url, tileSize });
  }

  /**
   * creates the satellite imagery basemap
   */
  public static createSatellite(): AlloyBasemap {
    const key = 'AiUUMcLkcSscFcv1TnQTULjz8WekxgKDHUkYeobCwdg1nXuSIrGxogbLEhqdGgTd';
    return new AlloyBingBasemap(key);
  }

  /**
   * creates the open streetmap basemap
   */
  public static createOpenStreetmap(): AlloyBasemap {
    const url = 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileSize = 512;
    return new AlloyTileBasemap({ url, tileSize });
  }

  /**
   * creates a custom xyz basemap
   * @param options the options to apply to the basemap
   */
  public static createXyz(options: AlloyTileBasemapOptions): AlloyBasemap {
    return new AlloyTileBasemap(options);
  }

  /**
   * creates a custom tiled WMS basemap
   * @param options WMS url and layer options
   */
  public static async createWms(options: AlloyWmsParameters): Promise<AlloyBasemap> {
    // register projection
    if (options.crs) {
      await AlloyBasemapFactory.registerProjection(options.crs);
    }
    return new AlloyWmsBasemap(options);
  }

  /**
   * creates a custom image WMS basemap
   * @param options WMS url and layer options
   */
  public static async createImageWms(options: AlloyWmsParameters): Promise<AlloyBasemap> {
    // register projection
    if (options.crs) {
      await AlloyBasemapFactory.registerProjection(options.crs);
    }
    return new AlloyImageWmsBasemap(options);
  }

  /**
   * creates a custom WMTS basemap
   * @param options WMTS url and layer options
   */
  public static async createWmts(options: AlloyWmtsParameters): Promise<AlloyBasemap> {
    const capabilities = await WmtsUtils.getCapabilities(options.url);
    const layer = capabilities.layers.find((l) => l.identifier === options.layer);
    if (!layer) {
      throw new AlloyMapError(1574876271, 'layer does not exist in WMTS capabilities');
    }
    const tileMatrixId = options.tileMatrixId ?? layer.tileMatrixIdentifiers[0];
    const tileMatrixSet = capabilities.capabilities.TileMatrixSet.find(
      (tileMatrix) => tileMatrix.Identifier === tileMatrixId,
    );
    if (tileMatrixSet) {
      await AlloyBasemapFactory.registerProjection(tileMatrixSet.SupportedCRS);
    }
    return new AlloyWmtsBasemap(capabilities, options);
  }

  /**
   * Tries to parse epsg code from crs string and register it
   * @param crs corrdinate reference system string
   * @ignore
   * @internal
   */
  private static async registerProjection(crs: string): Promise<void> {
    try {
      const split = crs.split(':');
      const epsg = parseInt(split[split.length - 1], 10);
      if (isNaN(epsg)) {
        throw new AlloyMapError(1577964771, 'epsg code was not a number');
      }
      await ProjectionUtils.register(epsg);
    } catch (e) {
      // do not throw if failed to register projection
      // eslint-disable-next-line no-console
      console.error(`failed to register projection - ${crs}`, e);
    }
  }
}
