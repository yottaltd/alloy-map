import { AlloyLayer } from './AlloyLayer';

/**
 * an alloy layer that can be enabled/disabled
 */
export interface AlloyManagedLayer extends AlloyLayer {
  /**
   * Enables the layer
   */
  enable(): void;

  /**
   * Disables the layer
   */
  disable(): void;
}
