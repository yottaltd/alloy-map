import OLLayer from 'ol/layer/Layer';
import OLTileLayer from 'ol/layer/Tile';
import OLTileWMS from 'ol/source/TileWMS';
import * as uuid from 'uuid';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyLayer } from '../AlloyLayer';
import { AlloyWMSLayerOptions } from './AlloyWMSLayerOptions';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';

/**
 * an alloy custom layer for rendering custom features provided externally on the map, use this to
 * add custom features onto the map and manage them manually
 */
export class AlloyWMSLayer implements AlloyLayer {
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
  constructor(options: AlloyWMSLayerOptions) {
    this.id = options.id || AlloyWMSLayer.name + ':' + uuid.v1();
    this.map = options.map;

    this.olLayers = [
      new OLTileLayer({
        source: new OLTileWMS({
          url: options.options.url,
          crossOrigin: 'anonymous',
          params: {
            LAYERS: options.options.layers.map((l) => l.name).join(','),
            STYLES: '',
            TRANSPARENT: true,
          },
        }),
        zIndex: AlloyLayerZIndex.Layers,
      }),
    ];
  }

  public getFeatureById(id: string): AlloyFeature | null {
    return null;
  }
}
