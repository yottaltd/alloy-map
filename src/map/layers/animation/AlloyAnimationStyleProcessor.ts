import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyAnimatedFeature } from '../../features/AlloyAnimatedFeature';
import { AlloyConnectedFeature } from '../../features/AlloyConnectedFeature';
import { AlloyConnectorFeature } from '../../features/AlloyConnectorFeature';
import { AlloyStyleBuilder } from '../../styles/AlloyStyleBuilder';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyConnectorStyleBuilder } from '../../styles/builders/AlloyConnectorStyleBuilder';
import { AlloyAnimationLayer } from './AlloyAnimationLayer';

/**
 * abstract class for animation layer style processors
 * @ignore
 * @internal
 */
export abstract class AlloyAnimationStyleProcessor<
  F extends AlloyAnimatedFeature | AlloyConnectedFeature
> extends AlloyStyleProcessor {
  /**
   * animated and connected feature style builder
   */
  private readonly styleBuilder: AlloyStyleBuilder<F>;

  /**
   * connector feature style builder
   */
  private readonly connectorStyleBuilder: AlloyConnectorStyleBuilder;

  /**
   * creates a new instance
   * @param layer the cable or route layer to style
   */
  constructor(layer: AlloyAnimationLayer) {
    super(layer);

    this.styleBuilder = this.createStyleBuilder();
    this.connectorStyleBuilder = new AlloyConnectorStyleBuilder();
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

    if (feature instanceof AlloyAnimatedFeature || feature instanceof AlloyConnectedFeature) {
      return this.styleBuilder.build(feature as F, resolution, state);
    } else {
      return [];
    }
  }
  /**
   * Custom styler for AlloyConnectorFeature
   * @param olFeature olFeature associated with AlloyConnectorFeature
   * @param resolution the resolution of the view
   * @param state the state to generate styles for
   * @ignore
   * @internal
   */
  public onStyleConnectorProcess(
    olFeature: OLFeature | OLRenderFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): OLStyle | OLStyle[] {
    if (olFeature instanceof OLRenderFeature) {
      return [];
    }
    const connectorFeature = this.layer.getFeatureById(
      FeatureUtils.getFeatureIdFromOlFeature(olFeature),
    );
    if (connectorFeature && connectorFeature instanceof AlloyConnectorFeature) {
      return this.connectorStyleBuilder.build(connectorFeature, resolution, state);
    }
    return [];
  }

  /**
   * abstract method to create a required instance of `AlloyStyleBuilder`
   * for an implementation of this style processor
   * @ignore
   * @internal
   */
  protected abstract createStyleBuilder(): AlloyStyleBuilder<F>;
}
