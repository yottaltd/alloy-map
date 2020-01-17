import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';

/**
 * processes the hover styled feature items, this reuses the style processors set up for the
 * features originating layers, this way we don't have try and decipher how to draw it again
 * @ignore
 * @internal
 */
export class AlloyHoverStyleProcessor extends AlloyStyleProcessor {
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

    // if we don't have an originating layer then bail
    if (!feature.originatingLayerId) {
      return [];
    }

    const layer = this.layer.map.layers.get(feature.originatingLayerId);

    // if we don't have a layer or processor, then bail
    if (!layer || !layer.styleProcessor) {
      return [];
    }

    return layer.styleProcessor.onStyleProcess(
      olFeature,
      resolution,
      // we ignore the state and always pass "hover"
      AlloyStyleBuilderBuildState.Hover,
    );
  }
}