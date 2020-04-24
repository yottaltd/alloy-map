import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyLayerWithFeatures } from '../AlloyLayerWithFeatures';
import { AlloySelectionLayerOptions } from './AlloySelectionLayerOptions';
import { AlloySelectionStyleProcessor } from './AlloySelectionStyleProcessor';

/**
 * a special interaction layer for selected features
 * @ignore
 * @internal
 */
export class AlloySelectionLayer extends AlloyLayerWithFeatures<AlloyFeature> {
  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloySelectionLayerOptions) {
    super(AlloySelectionLayer.name, options.map, AlloyLayerZIndex.Selection);

    // initialised here because style processor need some of the above internal properties
    this.setStyleProcessor(new AlloySelectionStyleProcessor(this));
  }

  /**
   * @implements
   */
  public addFeature(feature: AlloyFeature): boolean {
    if (feature.originatingLayerId) {
      const layer = this.map.layers.get(feature.originatingLayerId);
      if (layer instanceof AlloyLayerWithFeatures) {
        layer.olSource.removeFeature(feature.olFeature);
      }
    }
    return super.addFeature(feature);
  }

  /**
   * @implements
   */
  public addFeatures(features: AlloyFeature[]): boolean {
    features.forEach((feature) => {
      if (feature.originatingLayerId) {
        const layer = this.map.layers.get(feature.originatingLayerId);
        if (layer instanceof AlloyLayerWithFeatures) {
          layer.olSource.removeFeature(feature.olFeature);
        }
      }
    });

    return super.addFeatures(features);
  }

  /**
   * @implements
   */
  public removeFeature(feature: AlloyFeature): boolean {
    if (feature.originatingLayerId) {
      const layer = this.map.layers.get(feature.originatingLayerId);
      if (layer instanceof AlloyLayerWithFeatures) {
        layer.olSource.addFeature(feature.olFeature);
      }
    }

    return super.removeFeature(feature);
  }

  /**
   * @implements
   */
  public clearFeatures(): boolean {
    Array.from(this.features.values()).forEach((feature) => {
      if (feature.originatingLayerId) {
        const layer = this.map.layers.get(feature.originatingLayerId);
        if (layer instanceof AlloyLayerWithFeatures) {
          layer.olSource.addFeature(feature.olFeature);
        }
      }
    });

    return super.clearFeatures();
  }

  /**
   * @implements
   */
  public dispose() {
    // nothing
  }
}
