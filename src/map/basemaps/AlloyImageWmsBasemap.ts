import BaseLayer from 'ol/layer/Base';
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
   * Wms options for basemap
   */
  private readonly options: AlloyWmsParameters;

  /**
   * creates a new instance
   * @param options: options for Wms basemap layer
   */
  constructor(options: AlloyWmsParameters) {
    this.options = options;
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
  public get layer(): BaseLayer {
    return this.imageLayer;
  }

  /**
   * @implements
   */
  public clone(): AlloyImageWmsBasemap {
    return new AlloyImageWmsBasemap(this.options);
  }
}
