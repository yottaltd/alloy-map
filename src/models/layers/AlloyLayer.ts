import OLLayer from 'ol/layer/Layer';
import { AlloyBounds } from '../core/AlloyBounds';
import { AlloyFeature } from '../features/AlloyFeature';

/**
 * an alloy layer can be drawn on top of the map to render features or other visualisations
 */
export interface AlloyLayer {
  /**
   * the openlayers layer instance for the alloy layer
   */
  readonly olLayer: Readonly<OLLayer>;

  /**
   * the extent of the layer to load tiles for (its bounding box)
   */
  readonly extent: Readonly<AlloyBounds>;

  /**
   * adds a feature to the layer
   * @param feature the feature to add to the layer
   */
  addFeature(feature: AlloyFeature);

  /**
   * adds several features at once to the layer, should be used instead of adding features
   * individually where possible
   * @param features the features to add to the layer
   */
  addFeatures(features: AlloyFeature[]);
}
