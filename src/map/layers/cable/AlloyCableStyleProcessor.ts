import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyCustomFeature } from '../../features/AlloyCustomFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyCableStyleBuilder } from '../../styles/builders/AlloyCableStyleBuilder';
import { AlloyCableLayer } from './AlloyCableLayer';

/**
 * processes the cable styled feature items
 * @ignore
 * @internal
 */
export class AlloyCableStyleProcessor extends AlloyStyleProcessor {
  /**
   * cable feature style builder
   */
  private readonly cableStyleBuilder: AlloyCableStyleBuilder;

  /**
   * creates a new instance
   * @param layer the cable layer to style
   */
  constructor(layer: AlloyCableLayer) {
    super(layer);

    this.cableStyleBuilder = new AlloyCableStyleBuilder();
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
      return this.cableStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }
}
