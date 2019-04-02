import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyLayerStyle } from './AlloyLayerStyle';
import { AlloyStyleBuilder } from './AlloyStyleBuilder';

/**
 * extends the alloy style builder to add layer styles caching
 * @ignore
 */
export abstract class AlloyStyleBuilderWithLayerStyles<
  T extends AlloyFeature
> extends AlloyStyleBuilder<T> {
  /**
   * styles for the cluster layer
   */
  protected readonly layerStyles = new Map<string, AlloyLayerStyle>();

  /**
   * creates a new instance
   * @param styles the layer styles to use when building styles
   */
  constructor(styles: AlloyLayerStyle[]) {
    super();

    // populate the local layer style cache
    styles.forEach((s) => this.layerStyles.set(s.styleId, s));
  }
}
