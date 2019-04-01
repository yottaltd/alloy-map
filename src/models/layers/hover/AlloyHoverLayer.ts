import { Debugger } from 'debug';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyLayer } from '../AlloyLayer';
import { AlloyHoverLayerOptions } from './AlloyHoverLayerOptions';
import { AlloyHoverStyleProcessor } from './AlloyHoverStyleProcessor';

/**
 * a special interaction layer for hovering features
 * @ignore
 */
export class AlloyHoverLayer implements AlloyLayer {
  /**
   * debugger instance
   * @ignore
   */
  public readonly debugger: Debugger;

  /**
   * @implements
   */
  public readonly id: string = AlloyHoverLayer.name;

  /**
   * @override
   */
  public readonly map: AlloyMap;

  /**
   * the openlayers layer to render on
   * @implements
   * @ignore
   */
  public readonly olLayer: OLVectorLayer;

  /**
   * the openlayers source containing features for this layer
   * @ignore
   */
  public readonly olSource: OLVectorSource;

  /**
   * the currently hovered feature
   */
  private hoveredFeature: AlloyFeature | null = null;

  /**
   * the processor for styles on the layer
   */
  private readonly styleProcessor: AlloyHoverStyleProcessor;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyHoverLayerOptions) {
    this.map = options.map;

    // set the debugger instance
    this.debugger = this.map.debugger.extend(AlloyHoverLayer.name);

    // initialised here because style processor need some of the above internal properties
    this.styleProcessor = new AlloyHoverStyleProcessor(this);

    // create a new source to hold map features
    this.olSource = new OLVectorSource();

    // create a new vector layer instance to render our features
    this.olLayer = new OLVectorLayer({
      // vector mode as it is more accurate for rendering, but maybe consider "image" in future?
      renderMode: 'vector',
      // set the styling for the layer, we use a fat arrow function here else "this" resolves wrong
      style: (feature, resolution) => this.styleProcessor.onStyleProcess(feature, resolution),
      source: this.olSource,
      zIndex: 3,
    });
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyFeature | null {
    return this.hoveredFeature
      ? this.hoveredFeature.id === id
        ? this.hoveredFeature
        : null
      : null;
  }

  /**
   * sets the currently hovered feature
   * @param feature the feature to hover
   * @ignore
   */
  public setHoveredFeature(feature: AlloyFeature | null) {
    // no-op
    if (feature === this.hoveredFeature) {
      return;
    }

    // clear any existing feature
    if (this.hoveredFeature) {
      this.olSource.clear(true /* fast option doesn't dispatch removeFeature events */);
    }

    // set the new feature
    this.hoveredFeature = feature;

    // potentially add new feature to source
    if (feature) {
      this.olSource.addFeature(feature.olFeature);
    }
  }
}
