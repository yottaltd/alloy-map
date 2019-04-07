import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyLayerWithFeatures } from '../AlloyLayerWithFeatures';
import { AlloySelectionLayerOptions } from './AlloySelectionLayerOptions';
import { AlloySelectionStyleProcessor } from './AlloySelectionStyleProcessor';

/**
 * a special interaction layer for selected features
 * @ignore
 */
export class AlloySelectionLayer extends AlloyLayerWithFeatures<AlloyFeature> {
  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloySelectionLayerOptions) {
    super(AlloySelectionLayer.name, options.map, AlloyLayerZIndex.Selection);

    // initialised here because style processor need some of the above internal properties
    this.setStyleProcessor(new AlloySelectionStyleProcessor(this));
  }
}
