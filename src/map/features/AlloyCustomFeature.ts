import { AlloyCustomFeatureBase } from '@/map/features/AlloyCustomFeatureBase';
import { AlloyCustomFeatureProperties } from '@/map/features/AlloyCustomFeatureProperties';
import { AlloyFeatureType } from '@/map/features/AlloyFeatureType';
import OLFeature from 'ol/Feature';

/**
 * an alloy custom feature which represents something being added to the map by a user or
 * programatically, it can represent anything
 */
export class AlloyCustomFeature extends AlloyCustomFeatureBase {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.Custom; // see end of file for prototype

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
    properties: AlloyCustomFeatureProperties,
    originatingLayerId: string,
  ) {
    super(id, olFeature, properties, originatingLayerId);
  }
}
/**
 * we are prototyping this property because it is the same on every single instance of this class.
 * there is no built in typescript way to define this without it being turned into an initialised
 * property (set on each constructor) and due to the frequency that these objects are created we
 * really need every small optimisation we can get with regard to features
 */
AlloyCustomFeature.prototype.type = AlloyFeatureType.Custom;
