import OLLayer from 'ol/layer/Layer';
import OLImageLayer from 'ol/layer/Image';
import OLImageWMS from 'ol/source/ImageWMS';
import { AlloyWmsParameters } from '../../wms/AlloyWmsParameters';
import { WmsUtils } from '../../wms/WmsUtils';
import { AlloyLayerZIndex } from '../core/AlloyLayerZIndex';
import { AlloyBasemap } from './AlloyBasemap';

/**
 * an alloy image basemap using an WMS image service
 * @ignore
 * @internal
 */
export class AlloyImageWmsBasemap implements AlloyBasemap {
  /**
   * the image layer to render images on
   */
  private readonly imageLayer: OLImageLayer;

  /**
   * the source of basemap image
   */
  private readonly source: OLImageWMS;

  /**
   * creates a new instance
   * @param options: options for Wms basemap layer
   */
  constructor(options: AlloyWmsParameters) {
    this.source = WmsUtils.createImageWmsSourceFromParameters(options, false);
    this.imageLayer = new OLImageLayer({
      source: this.source,
      extent: options.bbox ? options.bbox.toMapExtent() : undefined,
      zIndex: AlloyLayerZIndex.Basemap,
    });
  }

  /**
   * @implements
   */
  public get layer(): Readonly<OLLayer> {
    return this.imageLayer;
  }
}