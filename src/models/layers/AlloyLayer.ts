import OLLayer from 'ol/layer/Layer';

/**
 * an alloy layer can be drawn on top of the map to render features or other visualisations
 */
export interface AlloyLayer {
  /**
   * the openlayers layer instance for the alloy layer
   */
  readonly layer: Readonly<OLLayer>;
}
