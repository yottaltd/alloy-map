import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { AlloyLayer } from './AlloyLayer';

/**
 * base class for processing a layers styles
 * @ignore
 */
export abstract class AlloyStyleProcessor {
  /**
   * the layer the processor is styling
   */
  protected readonly layer: AlloyLayer;

  /**
   * creates a new instance
   * @param layer the layer the processor is styling
   */
  constructor(layer: AlloyLayer) {
    this.layer = layer;
  }

  /**
   * the style function called during render
   * @param olFeature the feature to style
   * @param resolution the resolution of the view
   */
  public abstract onStyleProcess(
    olFeature: OLFeature | OLRenderFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null;
}
