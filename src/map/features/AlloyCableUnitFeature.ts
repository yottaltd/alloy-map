import { AlloyCableUnitFeatureProperties } from './AlloyCableUnitFeatureProperties';
import { AlloyConnectedFeature } from './AlloyConnectedFeature';
import { AlloyFeatureType } from './AlloyFeatureType';

/**
 * an alloy cable unit feature which represents a cable unit with point geometry
 */
export class AlloyCableUnitFeature extends AlloyConnectedFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.CableUnit; // see end of file for prototype

  /**
   * @implements
   */
  public readonly properties!: Readonly<AlloyCableUnitFeatureProperties>;
}

AlloyCableUnitFeature.prototype.type = AlloyFeatureType.CableUnit;
