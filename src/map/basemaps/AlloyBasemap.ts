import OLLayer from 'ol/layer/Layer';

/**
 * alloy basemap interface
 */
export interface AlloyBasemap {
  /**
   * the openlayers layer instance for the basemap
   * @ignore
   * @internal
   */
  readonly layer: Readonly<OLLayer>;
}
