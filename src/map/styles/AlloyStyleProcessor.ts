import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyLayer } from '../layers/AlloyLayer';
import { AlloyStyleBuilderBuildState } from './AlloyStyleBuilderBuildState';

/**
 * base class for processing a layers styles
 * @ignore
 * @internal
 */
export abstract class AlloyStyleProcessor {
  /**
   * the layer the processor is styling
   */
  protected readonly layer: AlloyLayer;

  /**
   * creates a new instance
   * @param layer the layer the processor is styling
   */
  constructor(layer: AlloyLayer) {
    this.layer = layer;
  }

  /**
   * the style function called during render
   * @param olFeature the feature to style
   * @param resolution the resolution of the view
   * @param state the state to generate styles for
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

    return this.onStyleProcessWithAlloyFeature(feature, resolution, state);
  }

  /**
   * the style function called during render
   * @param feature the alloy feature to style
   * @param resolution the resolution of the view
   * @param state the state to generate styles for
   */
  public abstract onStyleProcessWithAlloyFeature(
    feature: AlloyFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): OLStyle | OLStyle[];
}
