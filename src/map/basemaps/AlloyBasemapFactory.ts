import { ProjectionUtils } from '../../utils/ProjectionUtils';
import { AlloyWmsParameters } from '../../wms/AlloyWmsParameters';
import { AlloyBasemap } from './AlloyBasemap';
import { AlloyBingBasemap } from './AlloyBingBasemap';
import { AlloyImageWmsBasemap } from './AlloyImageWmsBasemap';
import { AlloyTileBasemap } from './AlloyTileBasemap';
import { AlloyTileBasemapOptions } from './AlloyTileBasemapOptions';
import { AlloyWmsBasemap } from './AlloyWmsBasemap';

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
  // tslint:disable-next-line: max-line-length
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
      try {
        await ProjectionUtils.register(parseInt(options.crs.split(':')[1], 10));
      } catch (e) {
        // do not throw if failed to register projection
        // tslint:disable-next-line:no-console
        console.error('failed to register projection ' + options.crs, e);
      }
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
      try {
        await ProjectionUtils.register(parseInt(options.crs.split(':')[1], 10));
      } catch (e) {
        // do not throw if failed to register projection
        // tslint:disable-next-line:no-console
        console.error('failed to register projection ' + options.crs);
      }
    }
    return new AlloyImageWmsBasemap(options);
  }
}
