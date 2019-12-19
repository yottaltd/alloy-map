import BaseLayer from 'ol/layer/Base';

/**
 * alloy basemap interface
 */
export interface AlloyBasemap {
  /**
   * the openlayers layer instance for the basemap
   * @ignore
   * @internal
   */
  readonly layer: BaseLayer;

  /**
   * Clone method to create a copy of a basemap
   */
  readonly clone: () => AlloyBasemap;
}
