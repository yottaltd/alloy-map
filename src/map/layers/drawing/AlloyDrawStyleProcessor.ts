import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyDrawFeature } from '../../features/AlloyDrawFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyDrawStyleBuilder } from '../../styles/builders/AlloyDrawStyleBuilder';
import { AlloyDrawLayer } from './AlloyDrawLayer';

/**
 * processes the draw styled feature items
 * @ignore
 */
export class AlloyDrawStyleProcessor extends AlloyStyleProcessor {
  /**
   * draw feature style builder
   */
  private readonly drawStyleBuilder: AlloyDrawStyleBuilder;

  /**
   * creates a new instance
   * @param layer the draw layer to style
   */
  constructor(layer: AlloyDrawLayer) {
    super(layer);

    this.drawStyleBuilder = new AlloyDrawStyleBuilder(layer.map);
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

    if (feature instanceof AlloyDrawFeature) {
      return this.drawStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }
}
