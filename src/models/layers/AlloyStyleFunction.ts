import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { AlloyLayer } from './AlloyLayer';

export abstract class AlloyStyleFunction {
  protected readonly layer: AlloyLayer;

  constructor(layer: AlloyLayer) {
    this.layer = layer;
  }

  public abstract func(
    feature: OLFeature | OLRenderFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null;
}
