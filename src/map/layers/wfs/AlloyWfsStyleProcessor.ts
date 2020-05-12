import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyWfsFeature } from '../../features/AlloyWfsFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyWfsStyleBuilder } from '../../styles/builders/AlloyWfsStyleBuilder';
import { AlloyWfsLayer } from './AlloyWfsLayer';

/**
 * processes the wfs styled feature items
 * @ignore
 * @internal
 */
export class AlloyWfsStyleProcessor extends AlloyStyleProcessor {
  /**
   * wfs feature style builder
   */
  private readonly wfsStyleBuilder: AlloyWfsStyleBuilder;

  /**
   * creates a new instance
   * @param layer the wfs layer to style
   */
  constructor(layer: AlloyWfsLayer) {
    super(layer);

    this.wfsStyleBuilder = new AlloyWfsStyleBuilder(layer.map, layer.styles);
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
    return this.onStyleProcessWithAlloyFeature(feature, resolution, state);
  }

  public onStyleProcessWithAlloyFeature(
    feature: AlloyFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ) {
    if (feature instanceof AlloyWfsFeature) {
      return this.wfsStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }
}
