import { AlloyDrawFeature } from '@/map/features/AlloyDrawFeature';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyDrawLayer } from '@/map/layers/drawing/AlloyDrawLayer';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '@/map/styles/AlloyStyleProcessor';
import { AlloyDrawStyleBuilder } from '@/map/styles/builders/AlloyDrawStyleBuilder';
import OLStyle from 'ol/style/Style';

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
  ): OLStyle | OLStyle[] {
    if (feature instanceof AlloyDrawFeature) {
      return this.drawStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }

  /**
   * @override
   */
  public clear(parts?: Record<string, any>): void {
    this.drawStyleBuilder.clear(parts);
  }
}
