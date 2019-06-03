import { AlloyCableFeature } from '../../features/AlloyCableFeature';
import { AlloyCableUnitFeature } from '../../features/AlloyCableUnitFeature';
import { AlloyCableStyleBuilder } from '../../styles/builders/AlloyCableStyleBuilder';
import { AlloyAnimationStyleProcessor } from '../animation/AlloyAnimationStyleProcessor';
import { AlloyCableLayer } from './AlloyCableLayer';

/**
 * processes the cable styled feature items
 * @ignore
 * @internal
 */
export class AlloyCableStyleProcessor extends AlloyAnimationStyleProcessor<
  AlloyCableFeature | AlloyCableUnitFeature
> {
  /**
   * creates a new instance
   * @param layer the cable layer to style
   */
  constructor(layer: AlloyCableLayer) {
    super(layer);
  }

  /**
   * @implements
   * @ignore
   * @internal
   */
  protected createStyleBuilder(): AlloyCableStyleBuilder {
    return new AlloyCableStyleBuilder();
  }
}
