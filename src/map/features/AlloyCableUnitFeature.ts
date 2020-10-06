import { AlloyCableUnitFeatureProperties } from '@/map/features/AlloyCableUnitFeatureProperties';
import { AlloyFeatureType } from '@/map/features/AlloyFeatureType';
import { AlloyPathNodeFeature } from '@/map/features/AlloyPathNodeFeature';

/**
 * an alloy cable unit feature which represents a cable unit with point geometry
 */
export class AlloyCableUnitFeature extends AlloyPathNodeFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.CableUnit; // see end of file for prototype

  /**
   * @override
   */
  public allowsHover!: true;
  /**
   * @override
   */
  public allowsSelection!: true;

  /**
   * @implements
   */
  public readonly properties!: Readonly<AlloyCableUnitFeatureProperties>;
}

AlloyCableUnitFeature.prototype.type = AlloyFeatureType.CableUnit;
AlloyCableUnitFeature.prototype.allowsSelection = true;
AlloyCableUnitFeature.prototype.allowsHover = true;
