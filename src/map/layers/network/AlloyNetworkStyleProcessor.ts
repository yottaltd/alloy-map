import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyNetworkLayer } from '@/map/layers/network/AlloyNetworkLayer';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '@/map/styles/AlloyStyleProcessor';
import { AlloyNetworkStyleBuilder } from '@/map/styles/builders/AlloyNetworkStyleBuilder';
import { Style } from 'ol/style';

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
  ): Style | Style[] {
    return this.networkStyleBuilder.build(feature as any, resolution, state);
  }

  /**
   * @override
   */
  public clear(): void {
    this.networkStyleBuilder.clear();
  }
}
