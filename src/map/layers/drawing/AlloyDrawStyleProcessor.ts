import { AlloyDrawFeature } from '../../features/AlloyDrawFeature';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyDrawStyleBuilder } from '../../styles/builders/AlloyDrawStyleBuilder';
import { AlloyDrawLayer } from './AlloyDrawLayer';

/**
 * processes the draw styled feature items
 * @ignore
 * @internal
 */
export class AlloyDrawStyleProcessor extends AlloyStyleProcessor {
  /**
   * draw feature style builder
   */
  private readonly drawStyleBuilder: AlloyDrawStyleBuilder;

  /**
   * creates a new instance
   * @param layer the draw layer to style
   */
  constructor(layer: AlloyDrawLayer) {
    super(layer);

    this.drawStyleBuilder = new AlloyDrawStyleBuilder(layer.map);
  }

  /**
   * @override
   */
  public onStyleProcessWithAlloyFeature(
    feature: AlloyFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ) {
    if (feature instanceof AlloyDrawFeature) {
      return this.drawStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }

  /**
   * @override
   */
  public clearForFeatureId(id: string): void {
    this.drawStyleBuilder.clear(id);
  }
}
