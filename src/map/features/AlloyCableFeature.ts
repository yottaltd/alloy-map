import { AlloyAnimatedPathFeature } from '@/map/features/AlloyAnimatedPathFeature';
import { AlloyCableFeatureProperties } from '@/map/features/AlloyCableFeatureProperties';
import { AlloyFeatureType } from '@/map/features/AlloyFeatureType';

/**
 * an alloy cable feature which represents a cable with single line string geometry
 */
export class AlloyCableFeature extends AlloyAnimatedPathFeature {
  /**
   * @override
   */
  public type!: AlloyFeatureType.Cable; // see end of file for prototype

  /**
   * @override
   */
  public readonly properties!: Readonly<AlloyCableFeatureProperties>;
}

/**
 * we are prototyping this property because it is the same on every single instance of this class.
 * there is no built in typescript way to define this without it being turned into an initialised
 * property (set on each constructor) and due to the frequency that these objects are created we
 * really need every small optimisation we can get with regard to features
 */
AlloyCableFeature.prototype.type = AlloyFeatureType.Cable;
