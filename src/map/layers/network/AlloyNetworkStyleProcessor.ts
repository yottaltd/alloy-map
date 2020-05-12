import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyNetworkStyleBuilder } from '../../styles/builders/AlloyNetworkStyleBuilder';
import { AlloyNetworkLayer } from './AlloyNetworkLayer';

/**
 * processes the network styled feature items
 * @ignore
 * @internal
 */
export class AlloyNetworkStyleProcessor extends AlloyStyleProcessor {
  /**
   * network feature style builder
   */
  private readonly networkStyleBuilder: AlloyNetworkStyleBuilder;

  /**
   * creates a new instance
   * @param layer the network layer to style
   */
  constructor(layer: AlloyNetworkLayer) {
    super(layer);

    this.networkStyleBuilder = new AlloyNetworkStyleBuilder(layer.map, layer.styles);
  }

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
    return this.networkStyleBuilder.build(feature as any, resolution, state);
  }
}
