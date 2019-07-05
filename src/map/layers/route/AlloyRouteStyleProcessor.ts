import { AlloyRouteFeature } from '../../features/AlloyRouteFeature';
import { AlloyRouteWaypointFeature } from '../../features/AlloyRouteWaypointFeature';
import { AlloyRouteStyleBuilder } from '../../styles/builders/AlloyRouteStyleBuilder';
import { AlloyAnimatedPathStyleProcessor } from '../animation/AlloyAnimatedPathStyleProcessor';
import { AlloyRouteLayer } from './AlloyRouteLayer';

/**
 * processes the route styled feature items
 * @ignore
 * @internal
 */
export class AlloyRouteStyleProcessor extends AlloyAnimatedPathStyleProcessor<
  AlloyRouteFeature | AlloyRouteWaypointFeature
> {
  /**
   * creates a new instance
   * @param layer the route layer to style
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
