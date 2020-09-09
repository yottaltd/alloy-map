import { AlloyMap } from '../../core/AlloyMap';
import { AlloyWfsHeatmapLayerStyle } from '../../styles/AlloyWfsHeatmapLayerStyle';

/**
 * options for the alloy custom layer
 */
export interface AlloyWfsHeatmapLayerOptions {
  /**
   * the alloy map to associate tha layer with
   */
  map: AlloyMap;

  /**
   * id for wfs layer, must be unique
   */
  id: string;

  /**
   * Wfs Parameters for ol layers
   */
  styles: AlloyWfsHeatmapLayerStyle[];
}
