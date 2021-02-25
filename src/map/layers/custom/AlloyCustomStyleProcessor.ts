import { AlloyCustomFeatureBase } from '@/map/features/AlloyCustomFeatureBase';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyCustomLayer } from '@/map/layers/custom/AlloyCustomLayer';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '@/map/styles/AlloyStyleProcessor';
import { AlloyCustomStyleBuilder } from '@/map/styles/builders/AlloyCustomStyleBuilder';
import { Style } from 'ol/style';

/**
 * processes the custom styled feature items
 * @ignore
 * @internal
 */
export class AlloyCustomStyleProcessor extends AlloyStyleProcessor {
  /**
   * custom feature style builder
   */
  private readonly customStyleBuilder: AlloyCustomStyleBuilder;

  /**
   * creates a new instance
   * @param layer the custom layer to style
   */
  constructor(layer: AlloyCustomLayer) {
    super(layer);

    this.customStyleBuilder = new AlloyCustomStyleBuilder(layer.map);
  }

  /**
   * @override
   */
  public onStyleProcessWithAlloyFeature(
    feature: AlloyFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): Style | Style[] {
    if (feature instanceof AlloyCustomFeatureBase) {
      return this.customStyleBuilder.build(
        feature,
        resolution,
        feature.properties.forceState !== undefined ? feature.properties.forceState : state,
      );
    } else {
      return [];
    }
  }

  /**
   * @override
   */
  public clear(): void {
    this.customStyleBuilder.clear();
  }
}
