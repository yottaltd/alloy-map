import { AlloyLayer } from './AlloyLayer';
import { Debugger } from 'debug';
import { AlloyMap } from '../core/AlloyMap';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import { AlloyFeature } from '../features/AlloyFeature';

export abstract class AlloyLayerWithFeaturesBase implements AlloyLayer {
  /**
   * debugger instance
   * @ignore
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
   * the openlayers layer to render on
   * @implements
   * @ignore
   */
  public readonly olLayer: OLVectorLayer;

  /**
   * the openlayers source containing features for this layer
   * @ignore
   */
  public readonly olSource: OLVectorSource = new OLVectorSource();

  /**
   * the features currently in the source for this layer
   */
  private readonly currentFeatures = new Map<string, AlloyFeature>();

  /**
   * creates a new instance
   * @param id the id of the layer
   * @param map the map the layer is a member of
   */
  constructor(id: string, map: AlloyMap) {
    // set the debugger instance
    this.debugger = map.debugger.extend(AlloyLayerWithFeaturesBase.name + ':' + id);

    this.id = id;
    this.map = map;
    this.olLayer = this.configureOlLayer();
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyFeature | null {
    return this.currentFeatures.get(id) || null;
  }

  /**
   * should configure the openlayers layer instance
   * @ignore
   */
  protected abstract configureOlLayer();
}
