import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyBasicStyleBuilder } from '../../styles/builders/AlloyBasicStyleBuilder';
import { AlloyBasicLayer } from './AlloyBasicLayer';

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
  ) {
    return this.basicStyleBuilder.build(feature, resolution, state);
  }
}
