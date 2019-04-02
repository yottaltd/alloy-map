import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
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
   * the processor for styles on the layer
   */
  private readonly styleProcessor: AlloySelectionStyleProcessor;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloySelectionLayerOptions) {
    super(AlloySelectionLayer.name, options.map, AlloyLayerZIndex.Selection);

    // initialised here because style processor need some of the above internal properties
    this.styleProcessor = new AlloySelectionStyleProcessor(this);
  }

  /**
   * @override
   * @ignore
   */
  protected onStyleProcess(
    olFeature: OLFeature | OLRenderFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    return this.styleProcessor.onStyleProcess(olFeature, resolution);
  }
}
