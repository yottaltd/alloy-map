import OLLayer from 'ol/layer/Layer';
import OLTileLayer from 'ol/layer/Tile';
import OLTileWMS from 'ol/source/TileWMS';
import { AlloyWmsParameters } from '../../wms/AlloyWmsParameters';
import { WmsUtils } from '../../wms/WmsUtils';
import { AlloyLayerZIndex } from '../core/AlloyLayerZIndex';
import { AlloyBasemap } from './AlloyBasemap';

/**
 * an alloy tile basemap using an WMS tiled service
 * @ignore
 * @internal
 */
export class AlloyWmsBasemap implements AlloyBasemap {
  /**
   * the tile layer to render tiles on
   */
  private readonly tileLayer: OLTileLayer;

  /**
   * the source of basemap tiles
   */
  private readonly source: OLTileWMS;

  /**
   * Wms options for basemap
   */
  private readonly options: AlloyWmsParameters;

  /**
   * creates a new instance
   * @param options: options for Wms basemap layer
   */
  constructor(options: AlloyWmsParameters) {
    this.options = options;
    this.source = WmsUtils.createTileWmsSourceFromParameters(options, false);
    this.tileLayer = new OLTileLayer({
      source: this.source,
      zIndex: AlloyLayerZIndex.Basemap,
    });
  }

  /**
   * @implements
   */
  public get layer(): Readonly<OLLayer> {
    return this.tileLayer;
  }

  /**
   * @implements
   */
  public clone(): AlloyWmsBasemap {
    return new AlloyWmsBasemap(this.options);
  }
}
