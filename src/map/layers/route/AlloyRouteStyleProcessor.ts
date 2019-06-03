import { AlloyRouteFeature } from '../../features/AlloyRouteFeature';
import { AlloyRouteWaypointFeature } from '../../features/AlloyRouteWaypointFeature';
import { AlloyRouteStyleBuilder } from '../../styles/builders/AlloyRouteStyleBuilder';
import { AlloyAnimationStyleProcessor } from '../animation/AlloyAnimationStyleProcessor';
import { AlloyRouteLayer } from './AlloyRouteLayer';

/**
 * processes the cable styled feature items
 * @ignore
 * @internal
 */
export class AlloyRouteStyleProcessor extends AlloyAnimationStyleProcessor<
  AlloyRouteFeature | AlloyRouteWaypointFeature
> {
  /**
   * creates a new instance
   * @param layer the cable layer to style
   */
  constructor(layer: AlloyRouteLayer) {
    super(layer);
  }

  /**
   * @implements
   * @ignore
   * @internal
   */
  protected createStyleBuilder(): AlloyRouteStyleBuilder {
    return new AlloyRouteStyleBuilder();
  }
}
