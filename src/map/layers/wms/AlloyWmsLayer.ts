import { AlloyLayerZIndex } from '@/map/core/AlloyLayerZIndex';
import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyLayer } from '@/map/layers/AlloyLayer';
import { AlloyWmsLayerOptions } from '@/map/layers/wms/AlloyWmsLayerOptions';
import { AlloyStyleProcessor } from '@/map/styles/AlloyStyleProcessor';
import { WmsUtils } from '@/wms/WmsUtils';
import OLLayer from 'ol/layer/Layer';
import OLTileLayer from 'ol/layer/Tile';

/**
 * an alloy wms layer for rendering external wms tiles on the map
 */
export class AlloyWmsLayer implements AlloyLayer {
  /**
   * @implements
   */
  public readonly id: string;

  /**
   * @implements
   */
  public readonly map: AlloyMap;

  /**
   * @implements
   */
  public readonly isInternalLayer = false;

  /**
   * @implements
   * @ignore
   * @internal
   */
  public readonly olLayers: Readonly<OLLayer[]>;

  /**
   * @implements
   * @ignore
   * @internal
   */
  public readonly styleProcessor: AlloyStyleProcessor | null = null;

  /**
   * Initialisation options for this layer.
   */
  private readonly options: AlloyWmsLayerOptions;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyWmsLayerOptions) {
    this.id = options.id;
    this.map = options.map;
    this.options = options;

    this.olLayers = [
      new OLTileLayer({
        source: WmsUtils.createTileWmsSourceFromParameters(options.options, true),
        zIndex: AlloyLayerZIndex.Layers,
      }),
    ];
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyFeature | null {
    return null;
  }

  /**
   * @implements
   */
  public dispose() {
    // do nothing
  }

  /**
   * @implements
   */
  public clone(map: AlloyMap): AlloyWmsLayer {
    const newOptions = Object.assign({}, this.options, { map });
    return new AlloyWmsLayer(newOptions);
  }
}
