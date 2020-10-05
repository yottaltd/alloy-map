import { AlloyLayerZIndex } from '@/map/core/AlloyLayerZIndex';
import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyLayer } from '@/map/layers/AlloyLayer';
import { AlloyHoverLayerOptions } from '@/map/layers/hover/AlloyHoverLayerOptions';
import { AlloyHoverStyleProcessor } from '@/map/layers/hover/AlloyHoverStyleProcessor';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { Debugger } from 'debug';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';

/**
 * a special interaction layer for hovering features
 * @ignore
 * @internal
 */
export class AlloyHoverLayer implements AlloyLayer {
  /**
   * debugger instance
   * @ignore
   * @internal
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
   * @internal
   */
  public readonly olLayers: OLVectorLayer[];

  /**
   * the openlayers source containing features for this layer
   * @ignore
   * @internal
   */
  public readonly olSource: OLVectorSource;

  /**
   * @implements
   * @ignore
   * @internal
   */
  public readonly styleProcessor: AlloyHoverStyleProcessor;

  /**
   * the currently hovered feature
   */
  private currentlyHoveredFeature: AlloyFeature | null = null;

  /**
   * creates a new instance
   * @param options the options for the layer
   * @ignore
   * @internal
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
    this.olLayers = [
      new OLVectorLayer({
        // set the style for the layer, we use a fat arrow function here else "this" resolves wrong
        style: (olFeature, resolution) =>
          this.styleProcessor.onStyleProcess(
            olFeature,
            resolution,
            // always hover state even though the processor ignores it
            AlloyStyleBuilderBuildState.Hover,
          ),
        source: this.olSource,
        zIndex: AlloyLayerZIndex.Hover,
      }),
    ];
  }

  /**
   * gets the hovered feature
   */
  public get hoveredFeature(): AlloyFeature | null {
    return this.currentlyHoveredFeature;
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyFeature | null {
    return this.currentlyHoveredFeature
      ? this.currentlyHoveredFeature.id === id
        ? this.currentlyHoveredFeature
        : null
      : null;
  }

  /**
   * sets the currently hovered feature
   * @param feature the feature to hover
   * @ignore
   * @internal
   */
  public setHoveredFeature(feature: AlloyFeature | null) {
    // no-op
    if (feature === this.currentlyHoveredFeature) {
      return;
    }

    // clear any existing feature
    if (this.currentlyHoveredFeature) {
      this.olSource.clear(true /* fast option doesn't dispatch removeFeature events */);
    }

    // set the new feature
    this.currentlyHoveredFeature = feature;

    // potentially add new feature to source
    if (feature) {
      this.olSource.addFeature(feature.olFeature);
    }
  }

  /**
   * @implements
   */
  public dispose() {
    // nothing
  }
}
