import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyClusterStyleBuilder } from '../../styles/builders/AlloyClusterStyleBuilder';
import { AlloyItemStyleBuilder } from '../../styles/builders/AlloyItemStyleBuilder';
import { AlloyStyleProcessor } from '../AlloyStyleProcessor';
import { AlloyClusterLayer } from './AlloyClusterLayer';

/**
 * processes the cluster styled feature items
 * @ignore
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
   */
  constructor(layer: AlloyClusterLayer) {
    super(layer);

    this.clusterStyleBuilder = new AlloyClusterStyleBuilder(layer.styles);
    this.itemStyleBuilder = new AlloyItemStyleBuilder(layer.styles);
  }

  /**
   * @override
   */
  public onStyleProcess(
    olFeature: OLFeature | OLRenderFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    if (olFeature instanceof OLRenderFeature) {
      return null;
    }

    const feature = this.layer.getFeatureById(FeatureUtils.getFeatureIdFromOlFeature(olFeature));
    if (!feature) {
      return null;
    }

    if (feature instanceof AlloyClusterFeature) {
      return this.clusterStyleBuilder.build(feature, resolution);
    } else if (feature instanceof AlloyItemFeature) {
      return this.itemStyleBuilder.build(feature, resolution);
    } else {
      return null;
    }
  }
}
