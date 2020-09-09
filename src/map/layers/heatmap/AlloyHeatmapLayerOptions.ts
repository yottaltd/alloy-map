import { AlloyBounds } from '../../core/AlloyBounds';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyHeatmapLayerStyle } from '../../styles/AlloyHeatmapLayerStyle';

/**
 * options for the alloy heatmap layer
 */
export interface AlloyHeatmapLayerOptions {
  /**
   * the alloy map to associate tha layer with
   */
  map: AlloyMap;

  /**
   * the layer code
   */
  layerCode: string;

  /**
   * id for layer, must be unique
   */
  id: string;

  /**
   * the bounds of the layer to make requests within
   */
  bounds: AlloyBounds;

  /**
   * the styles to show on the layer
   */
  styles: AlloyHeatmapLayerStyle[];
}
