import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';

/**
 * processes the hover styled feature items, this reuses the style processors set up for the
 * features originating layers, this way we don't have try and decipher how to draw it again
 * @ignore
 * @internal
 */
export class AlloyHoverStyleProcessor extends AlloyStyleProcessor {
  /**
   * @override
   */
  public onStyleProcessWithAlloyFeature(
    feature: AlloyFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ) {
    // if we don't have an originating layer then bail
    if (!feature.originatingLayerId) {
      return [];
    }

    const layer = this.layer.map.layers.get(feature.originatingLayerId);

    // if we don't have a layer or processor, then bail
    if (!layer || !layer.styleProcessor) {
      return [];
    }

    return layer.styleProcessor.onStyleProcessWithAlloyFeature(
      feature,
      resolution,
      // we ignore the state and always pass "hover"
      AlloyStyleBuilderBuildState.Hover,
    );
  }
}
