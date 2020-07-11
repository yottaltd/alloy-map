import OLLayer from 'ol/layer/Layer';
import OLTileLayer from 'ol/layer/Tile';
import * as uuid from 'uuid';
import { WmsUtils } from '../../../wms/WmsUtils';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyLayer } from '../AlloyLayer';
import { AlloyWmsLayerOptions } from './AlloyWmsLayerOptions';

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
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyWmsLayerOptions) {
    this.id = options.id;
    this.map = options.map;

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
}
