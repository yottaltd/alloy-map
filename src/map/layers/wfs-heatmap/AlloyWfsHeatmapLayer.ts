import { Debugger } from 'debug';
import OLVectorLayer from 'ol/layer/Vector';
import OLPoint from 'ol/geom/Point';
import { WfsLayerUtils } from '../../../wfs/WfsLayerUtils';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyWfsHeatmapFeature } from '../../features/AlloyWfsHeatmapFeature';
import { AlloyWfsHeatmapLayerStyle } from '../../styles/AlloyWfsHeatmapLayerStyle';
import { AlloyLayer } from '../AlloyLayer';
import { AlloyWfsHeatmapLayerOptions } from './AlloyWfsHeatmapLayerOptions';
import { GeometryUtils } from '../../../utils/GeometryUtils';

/**
 * an alloy wfs layer for rendering wfs features provided externally on the map
 */
export class AlloyWfsHeatmapLayer implements AlloyLayer {
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
  public readonly styleProcessor: null = null;

  /**
   * @implements
   */
  public readonly styles: AlloyWfsHeatmapLayerStyle[];

  /**
   * the features currently in the source for this layer
   * @ignore
   * @internal
   */
  private currentFeatures: Map<string, AlloyWfsHeatmapFeature> = new Map();

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyWfsHeatmapLayerOptions) {
    this.id = options.id;
    this.map = options.map;
    this.styles = options.styles;
    this.debugger = this.map.debugger.extend(AlloyWfsHeatmapLayer.name + ':' + this.id);

    this.olLayers = this.styles.map((style) => {
      return WfsLayerUtils.createWfsHeatmapLayer(
        style.url,
        style.featureName,
        style.version,
        style.epsg,
        AlloyLayerZIndex.SubLayers,
        style.weightProperty,
        style.gradient,
        style.blur,
        style.radius,
        style.loadAll,
        style.outputFormat,
        (olFeatures) => {
          for (const olFeature of olFeatures) {
            if (this.currentFeatures.has(olFeature.getId().toString())) {
              this.debugger('feature: %s already exists in layer', olFeature.getId());
              continue;
            }
            const feature = new AlloyWfsHeatmapFeature(
              olFeature.getId().toString(),
              olFeature,
              {},
              this.id,
              style.styleId,
            );
            const centre = GeometryUtils.getGeometryBoundsForFeature(feature).getCentre();
            olFeature.setGeometry(new OLPoint(centre.toMapCoordinate()));
            this.currentFeatures.set(feature.id, feature);
          }
        },
      );
    });
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyWfsHeatmapFeature | null {
    return this.currentFeatures.get(id) || null;
  }

  /**
   * @implements
   */
  public dispose() {
    // nothing
  }
}
