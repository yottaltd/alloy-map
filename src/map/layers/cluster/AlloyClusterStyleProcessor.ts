import { AlloyClusterFeature } from '@/map/features/AlloyClusterFeature';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyItemFeature } from '@/map/features/AlloyItemFeature';
import { AlloyClusterLayer } from '@/map/layers/cluster/AlloyClusterLayer';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '@/map/styles/AlloyStyleProcessor';
import { AlloyClusterStyleBuilder } from '@/map/styles/builders/AlloyClusterStyleBuilder';
import { AlloyItemStyleBuilder } from '@/map/styles/builders/AlloyItemStyleBuilder';

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
