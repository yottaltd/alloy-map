import { AlloyBounds } from '../map/core/AlloyBounds';
import { AlloyWmsCapabilitiesLayerStyle } from './AlloyWmsCapabilitiesLayerStyle';

/**
 * WMS Capabilties layer parameters
 */
export interface AlloyWmsCapabilitiesLayer {
  /**
   * Title of the layer (displayed to user)
   */
  title: string;
  /**
   * Name for layer request, if Wms parent layer acts as a wrapper then it's undefined
   */
  name?: string;
  /**
   * Available styles for layer
   */
  styles: AlloyWmsCapabilitiesLayerStyle[];
  /**
   * Whether layer is provided as opaque
   */
  opaque: boolean;
  /**
   * Bounds of this WMS layer
   */
  boundingBox: AlloyBounds;
  /**
   * Fixed width for tile requests
   */
  fixedWidth?: number;
  /**
   * Fixed height for tile requests
   */
  fixedHeight?: number;
  /**
   * CRS that could be use for wms requests
   */
  crs: string[];
  /**
   * Available child layers
   */
  layers: AlloyWmsCapabilitiesLayer[];
  /**
   * whether layer can be queried
   */
  queryable: boolean;
}
