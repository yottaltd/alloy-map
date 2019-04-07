import OLFeature from 'ol/Feature';
import { AlloyFeatureType } from './AlloyFeatureType';
import { AlloyMap } from '../core/AlloyMap';

/**
 * an alloy feature is used to display objects on the map
 */
export interface AlloyFeature {
  /**
   * the features type
   */
  readonly type: AlloyFeatureType;

  /**
   * the id of the feature, this is meaningless for 3rd parties using this library except for
   * directly referencing the feature on the map, it should not be relied upon to be, for instance,
   * an item id
   */
  readonly id: string;

  /**
   * whether the feature allows selection
   * @ignore
   */
  readonly allowsSelection: boolean;

  /**
   * the underlying openlayers geojson feature
   * @ignore
   */
  readonly olFeature: OLFeature;

  /**
   * the layer that loaded the feature
   * @ignore
   */
  readonly originatingLayerId?: string;

  /**
   * function to call when the feature is selected by user interaction, this can provide custom
   * processing for a feature e.g. cluster features zoom in. **This function should not be called
   * when a feature is programatically selected**
   * @param map the map instance the feature is a member of
   * @ignore
   */
  onSelectionInteraction?(map: AlloyMap): void;
}