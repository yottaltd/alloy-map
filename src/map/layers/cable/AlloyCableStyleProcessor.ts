import { AlloyCableFeature } from '../../features/AlloyCableFeature';
import { AlloyCableUnitFeature } from '../../features/AlloyCableUnitFeature';
import { AlloyCableStyleBuilder } from '../../styles/builders/AlloyCableStyleBuilder';
import { AlloyAnimatedPathStyleProcessor } from '../animation/AlloyAnimatedPathStyleProcessor';
import { AlloyCableLayer } from './AlloyCableLayer';

/**
 * processes the cable styled feature items
 * @ignore
 * @internal
 */
export class AlloyCableStyleProcessor extends AlloyAnimatedPathStyleProcessor<
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
