import OLGeometry from 'ol/geom/Geometry';
import { AlloyDrawFeature } from '../features/AlloyDrawFeature';
import { AlloyDrawLayer } from '../layers/drawing/AlloyDrawLayer';

export class AlloyDrawEvent {
  /**
   * Last drawn, modified or removed feature
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
   * Combine all draw features' geometries into a single openlayers geometry
   * @return single OLGeometry of draw features
   */
  public getDrawGeometry(): OLGeometry {
    return this.drawLayer.getAllFeaturesGeometry();
  }

  /**
   * Get all features associated with draw layer
   * @return map of all draw features keyed on the id
   */
  public getDrawFeatures(): Map<string, AlloyDrawFeature> {
    return this.drawLayer.features;
  }
}
