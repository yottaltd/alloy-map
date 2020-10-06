import { AlloyCableFeature } from '@/map/features/AlloyCableFeature';
import { AlloyCableUnitFeature } from '@/map/features/AlloyCableUnitFeature';
// eslint-disable-next-line max-len
import { AlloyAnimatedPathStyleProcessor } from '@/map/layers/animation/AlloyAnimatedPathStyleProcessor';
import { AlloyCableLayer } from '@/map/layers/cable/AlloyCableLayer';
import { AlloyCableStyleBuilder } from '@/map/styles/builders/AlloyCableStyleBuilder';

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
