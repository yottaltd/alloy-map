import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyCustomFeature } from '../../features/AlloyCustomFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyRouteStyleBuilder } from '../../styles/builders/AlloyRouteStyleBuilder';
import { AlloyRouteLayer } from './AlloyRouteLayer';

/**
 * processes the route styled feature items
 * @ignore
 * @internal
 */
export class AlloyRouteStyleProcessor extends AlloyStyleProcessor {
  /**
   * route feature style builder
   */
  private readonly routeStyleBuilder: AlloyRouteStyleBuilder;

  /**
   * creates a new instance
   * @param layer the route layer to style
   */
  constructor(layer: AlloyRouteLayer) {
    super(layer);

    this.routeStyleBuilder = new AlloyRouteStyleBuilder();
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
      return this.routeStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }
}
