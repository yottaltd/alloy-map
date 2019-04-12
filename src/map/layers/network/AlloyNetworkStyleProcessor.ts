import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyNetworkStyleBuilder } from '../../styles/builders/AlloyNetworkStyleBuilder';
import { AlloyNetworkLayer } from './AlloyNetworkLayer';

/**
 * processes the network styled feature items
 * @ignore
 */
export class AlloyNetworkStyleProcessor extends AlloyStyleProcessor {
  /**
   * item feature style builder
   */
  private readonly networkStyleBuilder: AlloyNetworkStyleBuilder;

  /**
   * creates a new instance
   * @param layer the cluster layer to style
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

    return this.networkStyleBuilder.build(feature as any, resolution, state) || [];
  }
}
