import * as DOMPurify from 'dompurify';
import OLWMTS, { Options as OLWMTSOptions, optionsFromCapabilities } from 'ol/source/WMTS';
import { AlloyMapError } from '../error/AlloyMapError';
import { AlloyBounds } from '../map/core/AlloyBounds';
import { AlloyCoordinate } from '../map/core/AlloyCoordinate';
import { PolyfillWmts } from '../polyfills/PolyfillWmts';
import { AlloyWmtsCapabilities } from './AlloyWmtsCapabilities';
import { AlloyWmtsCapabilitiesLayer } from './AlloyWmtsCapabilitiesLayer';
import { AlloyWmtsCapabilitiesLayerStyle } from './AlloyWmtsCapabilitiesLayerStyle';
import { AlloyWmtsCapabilitiesLayerStyleLegend } from './AlloyWmtsCapabilitiesLayerStyleLegend';
import { AlloyWmtsParameters } from './AlloyWmtsParameters';
import { WmtsLayer } from './WmtsLayer';
import { WmtsStyle } from './WmtsStyle';
import { WmtsStyleLegend } from './WmtsStyleLegend';

/**
 * Public WMTS utils class for getting and processing capabilties
 */
export abstract class WmtsUtils {
  /**
   * Creates OLWTMS source from AlloyWmtsParameters
   * @param capabilities AlloyWMTSCapabilities parsed from getCapabilities request
   * @param parameters AlloyWMTSParameters to build options for OLTileWms
   * @internal
   * @ignore
   */
  public static createWmtsSourceFromParameters(
    capabilities: AlloyWmtsCapabilities,
    parameters: AlloyWmtsParameters,
  ): OLWMTS {
    const options: OLWMTSOptions = optionsFromCapabilities(capabilities.capabilities.DefaultCaps, {
      layer: parameters.layer,
      style: parameters.style,
    });
    options.attributions = parameters.watermark
      ? DOMPurify.sanitize(parameters.watermark)
      : undefined;
    options.tilePixelRatio = parameters.isHiDpi ? 2 : 1;
    return new OLWMTS(options);
  }

  /**
   * Gets capabilities for WMTS server at given url
   * @param url url for WMTS server without any query parameters
   */
  public static async getCapabilities(url: string): Promise<AlloyWmtsCapabilities> {
    // first get the web response
    let capabilitiesResponse: Response;
    try {
      capabilitiesResponse = await fetch(url);
    } catch (error) {
      if (error instanceof AlloyMapError) {
        throw error;
      }
      throw new AlloyMapError(1574870352, 'Request for wmts capabilities failed', {
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
        1574862019,
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
      const parsedCaps = PolyfillWmts.read(capabilitiesText);
      return {
        url,
        title: parsedCaps.Title,
        layers: parsedCaps.Layers.map((layer) => WmtsUtils.parseWmtsLayer(layer)),
        capabilities: parsedCaps,
      };
    } catch (error) {
      if (error instanceof AlloyMapError) {
        throw error;
      }
      throw new AlloyMapError(1574862034, 'Failed to parse WMS Capabilities', {
        data: {
          error,
        },
      });
    }
  }

  /**
   * Wraps WMTS capabilities layer
   * @param layer WMTS GetCapabilities response Layer object
   * @ignore
   * @internal
   */
  private static parseWmtsLayer(layer: WmtsLayer): AlloyWmtsCapabilitiesLayer {
    // special case for wmts layer response data
    if (typeof layer.Title !== 'string') {
      throw new AlloyMapError(1561548097, 'Failed to parse WMS layer Title');
    }

    // Find bounding box of the layer or set maximum
    let boundingBox: AlloyBounds | undefined;
    const layerBbox = layer.WGS84BoundingBox;
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

    return {
      identifier: layer.Identifier,
      title: layer.Title,
      tileMatrixIdentifiers: layer.TileMatrixSetLink.map((link) => link.TileMatrixSet),
      boundingBox,
      styles: layer.Style.map((style) => WmtsUtils.parseWmtsStyle(style)),
    };
  }

  /**
   * Wraps WMTS capabilities layer style in an alloy object
   * @param style WMTS GetCapabilities response layer style
   * @ignore
   * @internal
   */
  private static parseWmtsStyle(style: WmtsStyle): AlloyWmtsCapabilitiesLayerStyle {
    // populate the legends model
    let legend: AlloyWmtsCapabilitiesLayerStyleLegend | undefined;
    if (style.LegendURL) {
      legend = WmtsUtils.parseWmtsLegend(style.LegendURL) || undefined;
    }

    return {
      identifier: style.Identifier,
      title: style.Title,
      legend,
      isDefault: style.isDefault || false,
    };
  }

  /**
   * Wraps WMTS capabilities layer style image legend in an alloy object
   * @param legend WMTS GetCapabilities response layer style legend
   * @ignore
   * @internal
   */
  private static parseWmtsLegend(
    legend: WmtsStyleLegend,
  ): AlloyWmtsCapabilitiesLayerStyleLegend | null {
    // special case for wmts layer response data
    if (!legend.format || typeof legend.format !== 'string') {
      // return null if legend format can't be parsed, as we are only interested in images for now
      return null;
    }

    if (legend.format.startsWith('image/')) {
      if (!legend.href || typeof legend.href !== 'string') {
        throw new AlloyMapError(1574874308, 'Failed to parse WMS style legend url');
      }

      return { url: legend.href };
    }
    return null;
  }
}
