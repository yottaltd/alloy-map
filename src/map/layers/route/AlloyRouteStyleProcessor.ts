import { AlloyRouteFeature } from '@/map/features/AlloyRouteFeature';
import { AlloyRouteWaypointFeature } from '@/map/features/AlloyRouteWaypointFeature';
// eslint-disable-next-line max-len
import { AlloyAnimatedPathStyleProcessor } from '@/map/layers//animation/AlloyAnimatedPathStyleProcessor';
import { AlloyRouteLayer } from '@/map/layers/route/AlloyRouteLayer';
import { AlloyRouteStyleBuilder } from '@/map/styles/builders/AlloyRouteStyleBuilder';

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
