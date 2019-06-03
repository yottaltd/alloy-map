import * as _ from 'lodash';
import OLTileWMS from 'ol/source/TileWMS';
import OLTileGrid from 'ol/tilegrid/TileGrid';
import { AlloyBounds } from '../map/core/AlloyBounds';
import { AlloyCoordinate } from '../map/core/AlloyCoordinate';
import { PolyfillTileGrid } from '../polyfills/PolyfillTileGrid';
import { PolyfillWms } from '../polyfills/PolyfillWms';
import { AlloyWmsCapabilities } from './AlloyWmsCapabilities';
import { AlloyWmsCapabilitiesLayer } from './AlloyWmsCapabilitiesLayer';
import { AlloyWmsCapabilitiesLayerStyle } from './AlloyWmsCapabilitiesLayerStyle';
import { AlloyWmsCapabilitiesLayerStyleLegend } from './AlloyWmsCapabilitiesLayerStyleLegend';
import { AlloyWmsParameters } from './AlloyWmsParameters';

/**
 * Public WMS utils class for getting and processing capabilties
 */
export abstract class WmsUtils {
  /**
   * Gets capabilities for WMS server at given url
   * @param url url for WMS server without any query parameters
   */
  public static async getCapabilities(url: string): Promise<AlloyWmsCapabilities> {
    const capsText = await (await fetch(url + '&REQUEST=GetCapabilities&SERVICE=WMS')).text();
    const parsedCaps = PolyfillWms.read(capsText);

    const capabilities: AlloyWmsCapabilities = {
      title: parsedCaps.Service.Title,
      url,
      layer: WmsUtils.parseWmsLayer(parsedCaps.Capability.Layer),
    };
    return capabilities;
  }

  /**
   * Creates OLTileWMS source from AlloyWmsParameters
   * @param options AlloyWMSParameters to build options for OLTileWms
   * @param transparent whether to request transparent tiles
   * @internal
   * @ignore
   */
  public static createTileWmsSourceFromParameters(
    options: AlloyWmsParameters,
    transparent: boolean,
  ): OLTileWMS {
    let tileGrid: OLTileGrid | undefined;
    if (options.width && options.height) {
      tileGrid = PolyfillTileGrid.createXYZ({
        extent: options.bbox ? options.bbox.toMapExtent() : undefined,
        maxZoom: 21,
        tileSize: [options.width, options.height],
      });
    }
    return new OLTileWMS({
      url: options.url,
      crossOrigin: 'anonymous',
      projection: options.crs,
      tileGrid,
      params: {
        LAYERS: options.layers.map((l) => l.layerName).join(','),
        STYLES: options.layers
          .map((l) => (l.styleName === 'default' ? '' : l.styleName || ''))
          .join(','),
        TRANSPARENT: transparent,
        BGCOLOR: options.colour ? options.colour.replace('#', '0x') : undefined,
      },
    });
  }

  /**
   * Wraps WMS capabilities layer
   * @param layer WMS GetCapabilities response Layer object
   * @ignore
   * @internal
   */
  private static parseWmsLayer(layer: any): AlloyWmsCapabilitiesLayer {
    // Find bounding box of the layer or set maximum
    let boundingBox: AlloyBounds | undefined;
    if (layer.EX_GeographicBoundingBox) {
      boundingBox = new AlloyBounds(
        new AlloyCoordinate(layer.EX_GeographicBoundingBox[0], layer.EX_GeographicBoundingBox[1]),
        new AlloyCoordinate(layer.EX_GeographicBoundingBox[2], layer.EX_GeographicBoundingBox[3]),
      );
    } else {
      boundingBox = new AlloyBounds(new AlloyCoordinate(-180, -90), new AlloyCoordinate(180, 90));
    }

    // check if one of the defaultly handled CRS is present in the request
    let crs: string | undefined;
    if (layer.CRS) {
      if (layer.CRS.indexOf('CRS:84') >= 0) {
        crs = 'CRS:84';
      } else if (layer.CRS.indexOf('EPSG:4326') >= 0) {
        crs = 'EPSG:4326';
      } else if (layer.CRS.indexOf('EPSG:3857') >= 0) {
        crs = 'EPSG:3857';
      } else if (layer.CRS.indexOf('EPSG:900913') >= 0) {
        crs = 'ESPG:900913';
      }
    }

    return {
      name: layer.Name,
      title: layer.Title,
      layers: (layer.Layer || []).map((l: any) => this.parseWmsLayer(l)),
      boundingBox,
      styles: (layer.Style || []).map((s: any) => this.parseWmsStyle(s)),
      opaque: layer.opaque || false,
      fixedWidth: layer.fixedWidth,
      fixedHeight: layer.fixedHeight,
      crs,
    };
  }

  /**
   * Wraps WMS capabilities layer style in an alloy object
   * @param style WMS GetCapabilities response layer style
   * @ignore
   * @internal
   */
  private static parseWmsStyle(style: any): AlloyWmsCapabilitiesLayerStyle {
    return {
      name: style.Name,
      title: style.Title,
      legends: (style.LegendURL || [])
        .map((l: any) => this.parseWmsLegend(l))
        .filter((l: AlloyWmsCapabilitiesLayerStyleLegend | null) => l !== null),
    };
  }

  /**
   * Wraps WMS capabilities layer style image legend in an alloy object
   * @param legend WMS GetCapabilities response layer style legend
   * @ignore
   * @internal
   */
  private static parseWmsLegend(legend: any): AlloyWmsCapabilitiesLayerStyleLegend | null {
    if (legend.Format && legend.Format.startsWith('image/')) {
      return {
        url: legend.OnlineResource,
        size: legend.size,
      };
    }
    return null;
  }
}
