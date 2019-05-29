import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyClusterStyleBuilder } from '../../styles/builders/AlloyClusterStyleBuilder';
import { AlloyItemStyleBuilder } from '../../styles/builders/AlloyItemStyleBuilder';
import { AlloyClusterLayer } from './AlloyClusterLayer';

/**
 * processes the cluster styled feature items
 * @ignore
 * @internal
 */
export class AlloyClusterStyleProcessor extends AlloyStyleProcessor {
  /**
   * cluster feature style builder
   */
  private readonly clusterStyleBuilder: AlloyClusterStyleBuilder;

  /**
   * item feature style builder
   */
  private readonly itemStyleBuilder: AlloyItemStyleBuilder;

  /**
   * creates a new instance
   * @param layer the cluster layer to style
   * @ignore
   * @internal
   */
  constructor(layer: AlloyClusterLayer) {
    super(layer);

    this.clusterStyleBuilder = new AlloyClusterStyleBuilder(layer.styles);
    this.itemStyleBuilder = new AlloyItemStyleBuilder(layer.map, layer.styles);
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

    if (feature instanceof AlloyClusterFeature) {
      return this.clusterStyleBuilder.build(feature, resolution, state);
    } else if (feature instanceof AlloyItemFeature) {
      return this.itemStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }
}
