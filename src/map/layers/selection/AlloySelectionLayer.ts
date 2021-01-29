import { AlloyLayerZIndex } from '@/map/core/AlloyLayerZIndex';
import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyLayerWithFeatures } from '@/map/layers/AlloyLayerWithFeatures';
import { AlloySelectionLayerOptions } from '@/map/layers/selection/AlloySelectionLayerOptions';
import { AlloySelectionStyleProcessor } from '@/map/layers/selection/AlloySelectionStyleProcessor';

/**
 * a special interaction layer for selected features
 * @ignore
 * @internal
 */
export class AlloySelectionLayer extends AlloyLayerWithFeatures<AlloyFeature> {
  /**
   * Initialisation options for this layer.
   */
  private readonly options: AlloySelectionLayerOptions;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloySelectionLayerOptions) {
    super(AlloySelectionLayer.name, options.map, AlloyLayerZIndex.Selection);
    this.options = options;

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
        if (feature.olFeature.getId() && layer.olSource.hasFeature(feature.olFeature)) {
          layer.olSource.removeFeature(layer.olSource.getFeatureById(feature.olFeature.getId()));
        }
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
          if (feature.olFeature.getId() && layer.olSource.hasFeature(feature.olFeature)) {
            layer.olSource.removeFeature(layer.olSource.getFeatureById(feature.olFeature.getId()));
          }
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
      if (
        layer instanceof AlloyLayerWithFeatures &&
        !layer.olSource.hasFeature(feature.olFeature)
      ) {
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
        if (
          layer instanceof AlloyLayerWithFeatures &&
          !layer.olSource.hasFeature(feature.olFeature)
        ) {
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

  /**
   * @implements
   */
  public clone(map: AlloyMap): AlloySelectionLayer {
    const newOptions = Object.assign({}, this.options, { map });
    return new AlloySelectionLayer(newOptions);
  }
}
