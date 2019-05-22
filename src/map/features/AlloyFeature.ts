import OLFeature from 'ol/Feature';
import OLStyle from 'ol/style/Style';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyFeatureType } from './AlloyFeatureType';
import { Geometry } from 'geojson';

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
   * whether the feature allows hover interaction
   * @ignore
   */
  readonly allowsHover: boolean;

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

  setStyle(style: OLStyle | OLStyle[] | null): void;

  setGeometry(geometry: Geometry): void;
}
