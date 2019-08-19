import OLFeature from 'ol/Feature';
import { AlloyCustomFeatureBase } from './AlloyCustomFeatureBase';
import { AlloyCustomItemFeatureProperties } from './AlloyCustomItemFeatureProperties';
import { AlloyFeatureType } from './AlloyFeatureType';
import { AlloyFeatureWithItemId } from './AlloyFeatureWithItemId';

/**
 * an alloy custom feature with item id which represents something being added to the map by a user
 * or programatically, it can represent any item
 */
export class AlloyCustomItemFeature extends AlloyCustomFeatureBase
  implements AlloyFeatureWithItemId {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.CustomItem; // see end of file for prototype

  /**
   * @implements
   */
  public readonly itemId: string;

  /**
   * creates a new instance
   * @param id the id of the feature
   * @param olFeature the underlying openlayers feature
   * @param properties the properties bundled with the service call
   * @param originatingLayerId the layer id that the item originated from
   * @ignore
   * @internal
   */
  constructor(
    id: string,
    olFeature: OLFeature,
    properties: AlloyCustomItemFeatureProperties,
    originatingLayerId: string,
  ) {
    super(id, olFeature, properties, originatingLayerId);
    this.itemId = properties.itemId;
  }
}
/**
 * we are prototyping this property because it is the same on every single instance of this class.
 * there is no built in typescript way to define this without it being turned into an initialised
 * property (set on each constructor) and due to the frequency that these objects are created we
 * really need every small optimisation we can get with regard to features
 */
AlloyCustomItemFeature.prototype.type = AlloyFeatureType.CustomItem;
