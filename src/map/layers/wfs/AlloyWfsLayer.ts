import { Debugger } from 'debug';
import OLVectorLayer from 'ol/layer/Vector';
import * as uuid from 'uuid';
import { AlloyWfsFeatureTypeDescription } from '../../../wfs/AlloyWfsFeatureTypeDescription';
import { WfsLayerUtils } from '../../../wfs/WfsLayerUtils';
import { WfsUtils } from '../../../wfs/WfsUtils';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyWfsFeature } from '../../features/AlloyWfsFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyWfsLayerStyle } from '../../styles/AlloyWfsLayerStyle';
import { AlloyLayer } from '../AlloyLayer';
import { AlloyStyledLayer } from '../AlloyStyledLayer';
import { AlloyWfsLayerOptions } from './AlloyWfsLayerOptions';
import { AlloyWfsStyleProcessor } from './AlloyWfsStyleProcessor';

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
    Map<string, AlloyWfsFeatureTypeDescription>
  > = new Map();

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyWfsLayerOptions) {
    this.id = options.id || AlloyWfsLayer.name + ':' + uuid.v1();
    this.map = options.map;
    this.debugger = this.map.debugger.extend(AlloyWfsLayer.name + ':' + this.id);

    // initialised here because style processor need some of the above internal properties
    this.styleProcessor = new AlloyWfsStyleProcessor(this);

    this.styles = options.styles;

    for (const style of this.styles) {
      WfsUtils.getFeatureTypeDescription(style.url).then((description) => {
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
        (olFeature, resolution) => {
          if (this.styleProcessor) {
            const styles = this.styleProcessor.onStyleProcess(
              olFeature,
              resolution,
              AlloyStyleBuilderBuildState.Default,
            );
            return Array.isArray(styles) ? styles : [styles];
          } else {
            return [];
          }
        },
        (olFeatures) => {
          for (const olFeature of olFeatures) {
            if (this.currentFeatures.has(olFeature.getId().toString())) {
              this.debugger('feature: %s already exists in layer', olFeature.getId());
              continue;
            }
            // wrap created draw event feature into AlloyDrawFeature and save to draw layer
            const feature = new AlloyWfsFeature(
              olFeature.getId().toString(),
              olFeature,
              {
                colour: style.colour,
                icon: style.icon,
              },
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
   * get feature type description associated with given WFS feature.
   * @param feature WFS feature for which to get parameters
   * @returns map of feature type descriptions keyed on name, or null if descriptions are not loaded
   */
  public getDescrptionsForFeature(
    feature: AlloyWfsFeature,
  ): Map<string, AlloyWfsFeatureTypeDescription> | null {
    return this.wfsFeatureTypeDescriptions.get(feature.styleId) || null;
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyWfsFeature | null {
    return this.currentFeatures.get(id) || null;
  }
}
