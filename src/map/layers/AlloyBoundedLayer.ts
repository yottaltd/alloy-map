import { AlloyLayer } from './AlloyLayer';
import { AlloyBounds } from '../core/AlloyBounds';

/**
 * an alloy layer that has a bounding box to serve features inside
 */
export interface AlloyBoundedLayer extends AlloyLayer {
  /**
   * the bounds of the layer to load tiles for (its bounding box)
   */
  readonly bounds: Readonly<AlloyBounds>;
}
