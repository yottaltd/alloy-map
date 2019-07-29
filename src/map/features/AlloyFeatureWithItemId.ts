import { Geometry } from 'geojson';
import OLFeature from 'ol/Feature';
import { AlloyFeature } from './AlloyFeature';
import { AlloyFeatureType } from './AlloyFeatureType';

/**
 * an alloy feature with itemId
 */
export abstract class AlloyFeatureWithItemId implements AlloyFeature {
  /**
   * the features type
   */
  public abstract type: AlloyFeatureType;

  /**
   * the id of the feature, this is meaningless for 3rd parties using this library except for
   * directly referencing the feature on the map, it should not be relied upon to be, for instance,
   * an item id
   */
  public abstract id: string;

  /**
   * whether the feature allows selection
   * @ignore
   * @internal
   */
  public abstract allowsSelection: boolean;

  /**
   * whether the feature allows hover interaction
   * @ignore
   * @internal
   */
  public abstract allowsHover: boolean;

  /**
   * the underlying openlayers geojson feature
   * @ignore
   * @internal
   */
  public abstract olFeature: OLFeature;

  /**
   * the layer that loaded the feature
   * @ignore
   * @internal
   */
  public readonly originatingLayerId?: string;

  /**
   * gets item id of alloy feature
   */
  public abstract getItemId(): string | null;

  /**
   * sets visibility of alloy feature
   * @param visible whether feature is visible
   */
  public abstract setVisible(visible: boolean): void;

  /**
   * sets geometry of alloy feature
   * @param geometry new geometry to set for this feature or null
   */
  public abstract setGeometry(geometry: Geometry | null): void;
}
