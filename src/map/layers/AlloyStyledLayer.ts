import { AlloyLayer } from '@/map/layers/AlloyLayer';
import { AlloyLayerStyle } from '@/map/styles/AlloyLayerStyle';

/**
 * an alloy layer that has layer styles that modify how it is rendered
 */
export interface AlloyStyledLayer extends AlloyLayer {
  /**
   * the styles being displayed on the layer
   */
  readonly styles: Readonly<AlloyLayerStyle[]>;
}
