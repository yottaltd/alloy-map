import { AlloyBasemap } from './AlloyBasemap';
import { AlloyBingBasemap } from './AlloyBingBasemap';
import { AlloyTileBasemap } from './AlloyTileBasemap';

/**
 * factory for creating standard alloy basemaps
 */
export abstract class AlloyBasemapFactory {
  /**
   * creates the skyward themed basemap (light blue)
   */
  public static createSkyward(): AlloyBasemap {
    const url =
      // tslint:disable-next-line: max-line-length
      'https://api.mapbox.com/styles/v1/michalcako/cis4nzuj80015hhmdynwp4ekv/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGFsY2FrbyIsImEiOiJjaWpsandvNTAwMDE1dzFtM3EyNHBrbzZlIn0.ruWnLF0Ckv94WIMFqmhFgw';
    const tileSize = 512;
    return new AlloyTileBasemap(url, tileSize);
  }

  /**
   * creates the nightscape themed basemap (dark blue)
   */
  public static createNightscape(): AlloyBasemap {
    const url =
      // tslint:disable-next-line: max-line-length
      'https://api.mapbox.com/styles/v1/michalcako/cis4nmh790013hhmdwa1yms0m/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGFsY2FrbyIsImEiOiJjaWpsandvNTAwMDE1dzFtM3EyNHBrbzZlIn0.ruWnLF0Ckv94WIMFqmhFgw';
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
}
