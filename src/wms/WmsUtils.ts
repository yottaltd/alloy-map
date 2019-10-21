import * as color from 'color';
import OLImageWMS from 'ol/source/ImageWMS';
import OLTileWMS from 'ol/source/TileWMS';
import OLTileGrid from 'ol/tilegrid/TileGrid';
import { AlloyMapError } from '../error/AlloyMapError';
import { AlloyBounds } from '../map/core/AlloyBounds';
import { AlloyCoordinate } from '../map/core/AlloyCoordinate';
import { PolyfillTileGrid } from '../polyfills/PolyfillTileGrid';
import { PolyfillWms } from '../polyfills/PolyfillWms';
import { AlloyWmsCapabilities } from './AlloyWmsCapabilities';
import { AlloyWmsCapabilitiesLayer } from './AlloyWmsCapabilitiesLayer';
import { AlloyWmsCapabilitiesLayerStyle } from './AlloyWmsCapabilitiesLayerStyle';
import { AlloyWmsCapabilitiesLayerStyleLegend } from './AlloyWmsCapabilitiesLayerStyleLegend';
import { AlloyWmsParameters } from './AlloyWmsParameters';
import { WmsLayer } from './WmsLayer';
import { WmsStyle } from './WmsStyle';
import { WmsStyleLegend } from './WmsStyleLegend';

/**
 * Public WMS utils class for getting and processing capabilties
 */
export abstract class WmsUtils {
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
    // generate tile grid if we have size information
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
      projection: options.crs ? options.crs.toUpperCase() : undefined,
      tileGrid,
      params: {
        LAYERS: options.layers.map((l) => l.layerName).join(','),
        STYLES: options.layers
          .map((l) => (l.styleName === 'default' ? '' : l.styleName || ''))
          .join(','),
        TRANSPARENT: transparent,
        BGCOLOR: options.colour
          ? // special colour format for WMS
            color(options.colour)
              .hex()
              .toUpperCase()
              .replace('#', '0x')
          : undefined,
      },
      attributions: options.watermark,
    });
  }

  /**
   * Creates OLImageWMS source from AlloyWmsParameters
   * @param options AlloyWMSParameters to build options for OLTileWms
   * @param transparent whether to request transparent tiles
   * @internal
   * @ignore
   */
  public static createImageWmsSourceFromParameters(
    options: AlloyWmsParameters,
    transparent: boolean,
  ): OLImageWMS {
    return new OLImageWMS({
      url: options.url,
      crossOrigin: 'anonymous',
      projection: options.crs,
      params: {
        LAYERS: options.layers.map((l) => l.layerName).join(','),
        STYLES: options.layers
          .map((l) => (l.styleName === 'default' ? '' : l.styleName || ''))
          .join(','),
        TRANSPARENT: transparent,
        BGCOLOR: options.colour
          ? // special colour format for WMS
            color(options.colour)
              .hex()
              .toUpperCase()
              .replace('#', '0x')
          : undefined,
      },
      // TODO: add watermark sanitisation
      attributions: options.watermark,
    });
  }

  /**
   * Gets capabilities for WMS server at given url
   * @param url url for WMS server without any query parameters
   */
  public static async getCapabilities(url: string): Promise<AlloyWmsCapabilities> {
    // first get the web response
    let capabilitiesResponse: Response;
    try {
      capabilitiesResponse = await fetch(url + '&REQUEST=GetCapabilities&SERVICE=WMS');
    } catch (error) {
      if (error instanceof AlloyMapError) {
        throw error;
      }
      throw new AlloyMapError(1562880533, 'Request for wms capabilities failed', {
        data: {
          error,
        },
      });
    }

    // then get the text from the response
    let capabilitiesText: string;
    try {
      capabilitiesText = await capabilitiesResponse.text();
    } catch (error) {
      if (error instanceof AlloyMapError) {
        throw error;
      }
      throw new AlloyMapError(
        1562880596,
        'Failed to obtain text body from wms capabilities request',
        {
          data: {
            error,
          },
        },
      );
    }

    // finally parse the data
    try {
      const parsedCaps = PolyfillWms.read(capabilitiesText);
      return {
        title: parsedCaps.Title,
        url,
        layer: WmsUtils.parseWmsLayer(parsedCaps.Layer),
      };
    } catch (error) {
      if (error instanceof AlloyMapError) {
        throw error;
      }
      throw new AlloyMapError(1561559624, 'Failed to parse WMS Capabilities', {
        data: {
          error,
        },
      });
    }
  }

  /**
   * Wraps WMS capabilities layer
   * @param layer WMS GetCapabilities response Layer object
   * @ignore
   * @internal
   */
  private static parseWmsLayer(layer: WmsLayer): AlloyWmsCapabilitiesLayer {
    // special case for wms layer response data
    if (typeof layer.Title !== 'string') {
      throw new AlloyMapError(1561548097, 'Failed to parse WMS layer Title');
    }

    // Find bounding box of the layer or set maximum
    let boundingBox: AlloyBounds | undefined;
    const layerBbox = layer.EX_GeographicBoundingBox;
    if (layerBbox) {
      if (
        Array.isArray(layerBbox) &&
        layerBbox.every((coordinate) => typeof coordinate === 'number')
      ) {
        boundingBox = new AlloyBounds(
          new AlloyCoordinate(layerBbox[0], layerBbox[1]),
          new AlloyCoordinate(layerBbox[2], layerBbox[3]),
        );
      } else {
        throw new AlloyMapError(1561547742, 'Failed to parse WMS layer bounding box');
      }
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
      } else if (layer.CRS.length > 0) {
        crs = layer.CRS[0];
      }
    }

    return {
      name: layer.Name,
      title: layer.Title,
      layers: (layer.Layer || []).map((l) => WmsUtils.parseWmsLayer(l)),
      boundingBox,
      styles: (layer.Style || []).map((s) => WmsUtils.parseWmsStyle(s)),
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
  private static parseWmsStyle(style: WmsStyle): AlloyWmsCapabilitiesLayerStyle {
    if (!style.Name || typeof style.Name !== 'string') {
      throw new AlloyMapError(1561547914, 'Failed to parse WMS layer style Name');
    }

    // populate the legends model
    const legends: AlloyWmsCapabilitiesLayerStyleLegend[] = [];
    if (style.LegendURL) {
      style.LegendURL.forEach((l) => {
        const parsed = WmsUtils.parseWmsLegend(l);
        if (parsed) {
          legends.push(parsed);
        }
      });
    }

    return {
      name: style.Name,
      title: style.Title || style.Name,
      legends,
    };
  }

  /**
   * Wraps WMS capabilities layer style image legend in an alloy object
   * @param legend WMS GetCapabilities response layer style legend
   * @ignore
   * @internal
   */
  private static parseWmsLegend(
    legend: WmsStyleLegend,
  ): AlloyWmsCapabilitiesLayerStyleLegend | null {
    // special case for wms layer response data
    if (!legend.Format || typeof legend.Format !== 'string') {
      throw new AlloyMapError(1561557730, 'Failed to parse WMS layer style legend Format');
    }

    if (legend.Format.startsWith('image/')) {
      if (!legend.OnlineResource || typeof legend.OnlineResource !== 'string') {
        throw new AlloyMapError(1561547980, 'Failed to parse WMS style legend url');
      }
      if (
        !legend.size ||
        !Array.isArray(legend.size) ||
        !legend.size.every((dim) => typeof dim === 'number')
      ) {
        throw new AlloyMapError(1561548041, 'Failed to parse WMS style legend size');
      }

      return {
        url: legend.OnlineResource,
        size: legend.size,
      };
    }
    return null;
  }
}
