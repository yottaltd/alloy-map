import { AlloyLayerZIndex } from '@/map/core/AlloyLayerZIndex';
import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyWfsFeature } from '@/map/features/AlloyWfsFeature';
import { AlloyLayer } from '@/map/layers/AlloyLayer';
import { AlloyStyledLayer } from '@/map/layers/AlloyStyledLayer';
import { AlloyWfsLayerOptions } from '@/map/layers/wfs/AlloyWfsLayerOptions';
import { AlloyWfsStyleProcessor } from '@/map/layers/wfs/AlloyWfsStyleProcessor';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { AlloyWfsLayerStyle } from '@/map/styles/AlloyWfsLayerStyle';
import { WfsFeatureDescription } from '@/wfs/WfsFeatureDescription';
import { WfsLayerUtils } from '@/wfs/WfsLayerUtils';
import { WfsUtils } from '@/wfs/WfsUtils';
import { Debugger } from 'debug';
import OLVectorLayer from 'ol/layer/Vector';

/**
 * an alloy wfs layer for rendering wfs features provided externally on the map
 */
export class AlloyWfsLayer implements AlloyLayer, AlloyStyledLayer {
  /**
   * debugger instance
   * @ignore
   * @internal
   */
  public readonly debugger: Debugger;

  /**
   * @implements
   */
  public readonly id: string;

  /**
   * @implements
   */
  public readonly map: AlloyMap;

  /**
   * @implements
   */
  public readonly isInternalLayer = false;

  /**
   * @implements
   * @ignore
   * @internal
   */
  public readonly olLayers: OLVectorLayer[];

  /**
   * @implements
   * @ignore
   * @internal
   */
  public readonly styleProcessor: AlloyWfsStyleProcessor;

  /**
   * @implements
   */
  public readonly styles: AlloyWfsLayerStyle[];

  /**
   * the features currently in the source for this layer
   * @ignore
   * @internal
   */
  private currentFeatures: Map<string, AlloyWfsFeature> = new Map();

  /**
   * Collection of wfs feature type feature properties descriptions keyed on styleId
   */
  private readonly wfsFeatureTypeDescriptions: Map<
    string,
    Map<string, WfsFeatureDescription>
  > = new Map();

  /**
   * Initialisation options for this layer.
   */
  private readonly options: AlloyWfsLayerOptions;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyWfsLayerOptions) {
    this.id = options.id;
    this.map = options.map;
    this.styles = options.styles;
    this.options = options;
    this.debugger = this.map.debugger.extend(AlloyWfsLayer.name + ':' + this.id);

    // initialised here because style processor need some of the above internal properties
    this.styleProcessor = new AlloyWfsStyleProcessor(this);

    for (const style of this.styles) {
      WfsUtils.getFeatureTypeDescription(style).then((description) => {
        this.wfsFeatureTypeDescriptions.set(style.styleId, description);
      });
    }

    this.olLayers = this.styles.map((style) => {
      return WfsLayerUtils.createWfsVectorLayer(
        style.url,
        style.featureName,
        style.version,
        style.epsg,
        AlloyLayerZIndex.Layers,
        style.loadAll,
        style.outputFormat,
        (olFeature, resolution) => {
          return this.styleProcessor.onStyleProcess(
            olFeature,
            resolution,
            AlloyStyleBuilderBuildState.Default,
          );
        },
        (olFeatures) => {
          for (const olFeature of olFeatures) {
            if (this.currentFeatures.has(olFeature.getId().toString())) {
              this.debugger('feature: %s already exists in layer', olFeature.getId());
              continue;
            }
            const feature = new AlloyWfsFeature(
              olFeature.getId().toString(),
              olFeature,
              {},
              this.id,
              style.styleId,
            );
            this.currentFeatures.set(feature.id, feature);
          }
        },
      );
    });
  }

  /**
   * get feature type description associated with given stlye id.
   * @param styleId style id for which to get parameters
   * @returns map of feature type descriptions keyed on name, or null if descriptions are not loaded
   */
  public getWfsDescriptionForStyleId(styleId: string): Map<string, WfsFeatureDescription> | null {
    return this.wfsFeatureTypeDescriptions.get(styleId) || null;
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyWfsFeature | null {
    return this.currentFeatures.get(id) || null;
  }

  /**
   * @implements
   */
  public dispose() {
    // nothing
  }

  /**
   * @implements
   */
  public clone(map: AlloyMap): AlloyWfsLayer {
    const newOptions = Object.assign({}, this.options, { map });
    return new AlloyWfsLayer(newOptions);
  }
}
