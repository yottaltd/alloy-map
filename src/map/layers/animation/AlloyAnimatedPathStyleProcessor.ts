/* eslint-disable max-len */

import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyAnimatedPathFeature } from '../../features/AlloyAnimatedPathFeature';
import { AlloyPathNodeFeature } from '../../features/AlloyPathNodeFeature';
import { AlloyPathNodeConnectorFeature } from '../../features/AlloyPathNodeConnectorFeature';
import { AlloyStyleBuilder } from '../../styles/AlloyStyleBuilder';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyPathNodeConnectorStyleBuilder } from '../../styles/builders/AlloyPathNodeConnectorStyleBuilder';
import { AlloyAnimatedPathLayer } from './AlloyAnimatedPathLayer';

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
   * @ignore
   * @internal
   */
  public onStyleProcess(
    olFeature: OLFeature | OLRenderFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): OLStyle | OLStyle[] {
    if (olFeature instanceof OLRenderFeature) {
      return [];
    }

    const feature = this.layer.getFeatureById(FeatureUtils.getFeatureIdFromOlFeature(olFeature));
    if (!feature) {
      return [];
    }

    if (feature instanceof AlloyAnimatedPathFeature || feature instanceof AlloyPathNodeFeature) {
      return this.styleBuilder.build(feature as F, resolution, state);
    } else if (feature instanceof AlloyPathNodeConnectorFeature) {
      return this.connectorStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }

  /**
   * abstract method to create a required instance of `AlloyStyleBuilder`
   * for an implementation of this style processor
   * @ignore
   * @internal
   */
  protected abstract createStyleBuilder(): AlloyStyleBuilder<F>;
}
