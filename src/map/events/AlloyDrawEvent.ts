import { AlloyDrawFeature } from '@/map/features/AlloyDrawFeature';
import { AlloyDrawLayer } from '@/map/layers/drawing/AlloyDrawLayer';
import { Geometry } from 'geojson';

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
   * the draw layer that triggered the event
   */
  private drawLayer: AlloyDrawLayer;

  /**
   * creates a new event instance
   * @ignore
   * @internal
   */
  constructor(feature: AlloyDrawFeature | null, drawLayer: AlloyDrawLayer) {
    this.feature = feature;
    this.drawLayer = drawLayer;
  }

  /**
   * combine all draw features' geometries into a single geometry
   * @return single `GeoJSON` of draw features
   */
  public getDrawGeometry(): Geometry {
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
