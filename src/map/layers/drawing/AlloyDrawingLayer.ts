import * as uuid from 'uuid';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyLayerWithFeatures } from '../AlloyLayerWithFeatures';
import { AlloyDrawingLayerOptions } from './AlloyDrawingLayerOptions';
import { AlloyDrawingStyleProcessor } from './AlloyDrawingStyleProcessor';

/**
 * an alloy drawing layer for rendering features provided externally on the map
 */
export class AlloyDrawingLayer extends AlloyLayerWithFeatures<AlloyFeature> {
  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyDrawingLayerOptions) {
    super(AlloyDrawingLayer.name + ':' + uuid.v1(), options.map, AlloyLayerZIndex.Drawing);

    // initialised here because style processor need some of the above internal properties
    this.setStyleProcessor(new AlloyDrawingStyleProcessor(this));
  }
}
