import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyCustomFeature } from '../../features/AlloyCustomFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyCustomStyleBuilder } from '../../styles/builders/AlloyCustomStyleBuilder';
import { AlloyCustomLayer } from './AlloyCustomLayer';

/**
 * processes the custom styled feature items
 * @ignore
 */
export class AlloyCustomStyleProcessor extends AlloyStyleProcessor {
  /**
   * custom feature style builder
   */
  private readonly customStyleBuilder: AlloyCustomStyleBuilder;

  /**
   * creates a new instance
   * @param layer the custom layer to style
   */
  constructor(layer: AlloyCustomLayer) {
    super(layer);

    this.customStyleBuilder = new AlloyCustomStyleBuilder(layer.map);
  }

  /**
   * @override
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

    if (feature instanceof AlloyCustomFeature) {
      return this.customStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }
}