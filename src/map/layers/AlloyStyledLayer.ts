import { AlloyLayerStyle } from '../styles/AlloyLayerStyle';
import { AlloyLayer } from './AlloyLayer';

/**
 * an alloy layer that has layer styles that modify how it is rendered
 */
export interface AlloyStyledLayer extends AlloyLayer {
  /**
   * the styles being displayed on the layer
   */
  readonly styles: Readonly<AlloyLayerStyle[]>;
}
