import { AlloyCustomFeatureBase } from '../../features/AlloyCustomFeatureBase';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyCustomStyleBuilder } from '../../styles/builders/AlloyCustomStyleBuilder';
import { AlloyCustomLayer } from './AlloyCustomLayer';

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
  ) {
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
  public clearForFeatureId(id: string): void {
    this.customStyleBuilder.clear(id);
  }
}
