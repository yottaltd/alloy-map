import BaseLayer from 'ol/layer/Base';
import OLTileLayer from 'ol/layer/Tile';
import OLWMTS from 'ol/source/WMTS';
import { AlloyWmtsCapabilities } from '../../wmts/AlloyWmtsCapabilities';
import { AlloyWmtsParameters } from '../../wmts/AlloyWmtsParameters';
import { WmtsUtils } from '../../wmts/WmtsUtils';
import { AlloyLayerZIndex } from '../core/AlloyLayerZIndex';
import { AlloyBasemap } from './AlloyBasemap';

/**
 * an alloy tile basemap using an WMTS service
 * @ignore
 * @internal
 */
export class AlloyWmtsBasemap implements AlloyBasemap {
  /**
   * the tile layer to render tiles on
   */
  private readonly tileLayer: OLTileLayer;

  /**
   * the source of basemap tiles
   */
  private readonly source: OLWMTS;

  /**
   * Wmts capabilities for basemap
   */
  private readonly capabilities: AlloyWmtsCapabilities;

  /**
   * Wmts options for basemap
   */
  private readonly options: AlloyWmtsParameters;

  /**
   * creates a new instance
   * @param capabilities: capabilities for Wmts service
   * @param options: options for Wmts basemap layer
   */
  constructor(capabilities: AlloyWmtsCapabilities, options: AlloyWmtsParameters) {
    this.capabilities = capabilities;
    this.options = options;
    this.source = WmtsUtils.createWmtsSourceFromParameters(capabilities, options);
    this.tileLayer = new OLTileLayer({
      source: this.source,
      zIndex: AlloyLayerZIndex.Basemap,
    });
  }

  /**
   * @implements
   */
  public get layer(): BaseLayer {
    return this.tileLayer;
  }

  /**
   * @implements
   */
  public clone(): AlloyWmtsBasemap {
    return new AlloyWmtsBasemap(this.capabilities, this.options);
  }
}
