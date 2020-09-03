import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyClusterStyleBuilder } from '../../styles/builders/AlloyClusterStyleBuilder';
import { AlloyItemStyleBuilder } from '../../styles/builders/AlloyItemStyleBuilder';
import { AlloyClusterLayer } from './AlloyClusterLayer';

/**
 * processes the cluster styled feature items
 * @ignore
 * @internal
 */
export class AlloyClusterStyleProcessor extends AlloyStyleProcessor {
  /**
   * cluster feature style builder
   */
  private readonly clusterStyleBuilder: AlloyClusterStyleBuilder;

  /**
   * item feature style builder
   */
  private readonly itemStyleBuilder: AlloyItemStyleBuilder;

  /**
   * creates a new instance
   * @param layer the cluster layer to style
   * @ignore
   * @internal
   */
  constructor(layer: AlloyClusterLayer) {
    super(layer);

    this.clusterStyleBuilder = new AlloyClusterStyleBuilder(layer.styles);
    this.itemStyleBuilder = new AlloyItemStyleBuilder(layer.map, layer.styles);
  }

  /**
   * @override
   */
  public onStyleProcessWithAlloyFeature(
    feature: AlloyFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ) {
    if (feature instanceof AlloyClusterFeature) {
      return this.clusterStyleBuilder.build(feature, resolution, state);
    } else if (feature instanceof AlloyItemFeature) {
      return this.itemStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }

  /**
   * @override
   */
  public clearForFeatureId(id: string): void {
    this.clusterStyleBuilder.clear(id);
    this.itemStyleBuilder.clear(id);
  }
}
