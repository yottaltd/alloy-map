import { AlloyWmsParameters } from '../../wms/AlloyWmsParameters';
import { AlloyBasemap } from './AlloyBasemap';
import { AlloyBingBasemap } from './AlloyBingBasemap';
import { AlloyTileBasemap } from './AlloyTileBasemap';
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
    return new AlloyTileBasemap(url, tileSize);
  }

  /**
   * creates the nightscape themed basemap (dark blue)
   */
  public static createNightscape(): AlloyBasemap {
    const url = mapboxUrl('cjypkiuvo028g1coyt63evhhy');
    const tileSize = 512;
    return new AlloyTileBasemap(url, tileSize);
  }

  /**
   * creates the satellite imagery basemap
   */
  public static createSatellite(): AlloyBasemap {
    const key = 'AiUUMcLkcSscFcv1TnQTULjz8WekxgKDHUkYeobCwdg1nXuSIrGxogbLEhqdGgTd';
    return new AlloyBingBasemap(key);
  }

  /**
   * creates the ordnance survey basemap
   */
  public static createOrdnanceSurvey(): AlloyBasemap {
    const url =
      // tslint:disable-next-line: max-line-length
      'https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG%3A3857/Outdoor 3857/{z}/{x}/{y}.png?key=KClxAC5fo36e8FYszmTfSrWxhm7sM4Zx';
    const tileSize = 256;
    return new AlloyTileBasemap(url, tileSize);
  }

  /**
   * creates the open streetmap basemap
   */
  public static createOpenStreetmap(): AlloyBasemap {
    const url = 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileSize = 512;
    return new AlloyTileBasemap(url, tileSize);
  }

  /**
   * creates a custom xyz basemap
   * @param url /{z}/{x}/{y} format url
   * @param tileSize tile dimensions returned by tile server
   */
  public static createXyz(url: string, tileSize: number): AlloyBasemap {
    return new AlloyTileBasemap(url, tileSize);
  }

  /**
   * creates a custom WMS basemap
   * @param options WMS url and layer options
   */
  public static createWms(options: AlloyWmsParameters): AlloyBasemap {
    return new AlloyWmsBasemap(options);
  }
}
