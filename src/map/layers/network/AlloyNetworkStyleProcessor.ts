import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyNetworkStyleBuilder } from '../../styles/builders/AlloyNetworkStyleBuilder';
import { AlloyNetworkLayer } from './AlloyNetworkLayer';

/**
 * processes the network styled feature items
 * @ignore
 * @internal
 */
export class AlloyNetworkStyleProcessor extends AlloyStyleProcessor {
  /**
   * network feature style builder
   */
  private readonly networkStyleBuilder: AlloyNetworkStyleBuilder;

  /**
   * creates a new instance
   * @param layer the network layer to style
   */
  constructor(layer: AlloyNetworkLayer) {
    super(layer);

    this.networkStyleBuilder = new AlloyNetworkStyleBuilder(layer.map, layer.styles);
  }

  /**
   * @override
   */
  public onStyleProcessWithAlloyFeature(
    feature: AlloyFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ) {
    return this.networkStyleBuilder.build(feature as any, resolution, state);
  }
}
