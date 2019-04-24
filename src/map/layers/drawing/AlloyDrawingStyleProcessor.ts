import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyDrawingFeature } from '../../features/AlloyDrawingFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyDrawingStyleBuilder } from '../../styles/builders/AlloyDrawingStyleBuilder';
import { AlloyDrawingLayer } from './AlloyDrawingLayer';

/**
 * processes the drawing styled feature items
 * @ignore
 */
export class AlloyDrawingStyleProcessor extends AlloyStyleProcessor {
  /**
   * drawing feature style builder
   */
  private readonly drawingStyleBuilder: AlloyDrawingStyleBuilder;

  /**
   * creates a new instance
   * @param layer the drawing layer to style
   */
  constructor(layer: AlloyDrawingLayer) {
    super(layer);

    this.drawingStyleBuilder = new AlloyDrawingStyleBuilder(layer.map);
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

    if (feature instanceof AlloyDrawingFeature) {
      return this.drawingStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }
}
