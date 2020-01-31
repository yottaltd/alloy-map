import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyLayerStyle } from './AlloyLayerStyle';
import { AlloyStyleBuilder } from './AlloyStyleBuilder';

/**
 * extends the alloy style builder to add layer styles caching
 * @ignore
 * @internal
 */
export abstract class AlloyStyleBuilderWithLayerStyles<
  T extends AlloyFeature,
  S extends AlloyLayerStyle = AlloyLayerStyle
> extends AlloyStyleBuilder<T> {
  /**
   * styles for the cluster layer
   */
  protected readonly layerStyles = new Map<string, S>();

  /**
   * creates a new instance
   * @param styles the layer styles to use when building styles
   */
  constructor(styles: Readonly<S[]>) {
    super();

    // populate the local layer style cache
    styles.forEach((s) => this.layerStyles.set(s.styleId, s));
  }
}
