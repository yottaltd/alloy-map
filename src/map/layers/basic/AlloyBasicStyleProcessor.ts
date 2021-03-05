import { AlloyItemFeature } from '@/map/features/AlloyItemFeature';
import { AlloyBasicLayer } from '@/map/layers/basic/AlloyBasicLayer';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '@/map/styles/AlloyStyleProcessor';
import { AlloyBasicStyleBuilder } from '@/map/styles/builders/AlloyBasicStyleBuilder';
import OLStyle from 'ol/style/Style';

/**
 * processes the basic styled feature items
 * @ignore
 * @internal
 */
export class AlloyBasicStyleProcessor extends AlloyStyleProcessor {
  /**
   * item feature style builder
   */
  private readonly basicStyleBuilder: AlloyBasicStyleBuilder;

  /**
   * creates a new instance
   * @param layer the basic layer to style
   * @ignore
   * @internal
   */
  constructor(layer: AlloyBasicLayer) {
    super(layer);

    this.basicStyleBuilder = new AlloyBasicStyleBuilder(layer.map, layer.styles);
  }

  /**
   * @override
   */
  public onStyleProcessWithAlloyFeature(
    feature: AlloyItemFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): OLStyle | OLStyle[] {
    return this.basicStyleBuilder.build(feature, resolution, state);
  }

  /**
   * @override
   */
  public clear(parts?: Record<string, any>): void {
    this.basicStyleBuilder.clear(parts);
  }
}
