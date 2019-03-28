import OLLayer from 'ol/layer/Layer';
import { AlloyBounds } from '../core/AlloyBounds';
import { AlloyMap } from '../core/AlloyMap';

/**
 * an alloy layer can be drawn on top of the map to render features or other visualisations
 */
export interface AlloyLayer {
  /**
   * the map the alloy layer was created for
   */
  readonly map: AlloyMap;

  /**
   * the openlayers layer instance for the alloy layer
   * @ignore
   */
  readonly olLayer: Readonly<OLLayer>;

  /**
   * the extent of the layer to load tiles for (its bounding box)
   */
  readonly extent: Readonly<AlloyBounds>;
}
