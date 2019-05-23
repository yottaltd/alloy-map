import OLGeometry from 'ol/geom/Geometry';
import { AlloyDrawFeature } from '../features/AlloyDrawFeature';
import { AlloyDrawLayer } from '../layers/drawing/AlloyDrawLayer';

/**
 * event fired when a draw feature has been created/modified/deleted
 * @event
 */
export class AlloyDrawEvent {
  /**
   * last drawn, modified or removed feature
   */
  public feature: AlloyDrawFeature | null;

  /**
   * @ignore
   */
  private drawLayer: AlloyDrawLayer;

  /**
   * creates a new event instance
   */
  constructor(feature: AlloyDrawFeature | null, drawLayer: AlloyDrawLayer) {
    this.feature = feature;
    this.drawLayer = drawLayer;
  }

  /**
   * combine all draw features' geometries into a single geometry
   * @return single geometry of draw features
   */
  public getDrawGeometry(): OLGeometry {
    return this.drawLayer.getAllFeaturesGeometry();
  }

  /**
   * get all features associated with draw layer
   * @return map of all draw features keyed on the id
   */
  public getDrawFeatures(): Map<string, AlloyDrawFeature> {
    return this.drawLayer.features;
  }
}
