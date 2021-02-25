/* eslint-disable max-len */

import { AlloyAnimatedPathFeature } from '@/map/features/AlloyAnimatedPathFeature';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyPathNodeConnectorFeature } from '@/map/features/AlloyPathNodeConnectorFeature';
import { AlloyPathNodeFeature } from '@/map/features/AlloyPathNodeFeature';
import { AlloyAnimatedPathLayer } from '@/map/layers/animation/AlloyAnimatedPathLayer';
import { AlloyStyleBuilder } from '@/map/styles/AlloyStyleBuilder';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '@/map/styles/AlloyStyleProcessor';
import { AlloyPathNodeConnectorStyleBuilder } from '@/map/styles/builders/AlloyPathNodeConnectorStyleBuilder';
import { Style } from 'ol/style';

/* eslint-enable max-len */

/**
 * abstract class for animation layer style processors
 * @ignore
 * @internal
 */
export abstract class AlloyAnimatedPathStyleProcessor<
  F extends AlloyAnimatedPathFeature | AlloyPathNodeFeature | AlloyPathNodeConnectorFeature
> extends AlloyStyleProcessor {
  /**
   * animated and connected feature style builder
   */
  private readonly styleBuilder: AlloyStyleBuilder<F>;

  /**
   * connector feature style builder
   */
  private readonly connectorStyleBuilder: AlloyPathNodeConnectorStyleBuilder;

  /**
   * creates a new instance
   * @param layer the cable or route layer to style
   */
  constructor(layer: AlloyAnimatedPathLayer) {
    super(layer);

    this.styleBuilder = this.createStyleBuilder();
    this.connectorStyleBuilder = new AlloyPathNodeConnectorStyleBuilder();
  }

  /**
   * @override
   */
  public onStyleProcessWithAlloyFeature(
    feature: AlloyFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): Style | Style[] {
    if (feature instanceof AlloyAnimatedPathFeature || feature instanceof AlloyPathNodeFeature) {
      return this.styleBuilder.build(feature as F, resolution, state);
    } else if (feature instanceof AlloyPathNodeConnectorFeature) {
      return this.connectorStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }

  /**
   * @override
   */
  public clear(): void {
    this.styleBuilder.clear();
    this.connectorStyleBuilder.clear();
  }

  /**
   * abstract method to create a required instance of `AlloyStyleBuilder`
   * for an implementation of this style processor
   * @ignore
   * @internal
   */
  protected abstract createStyleBuilder(): AlloyStyleBuilder<F>;
}
