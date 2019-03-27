import OLLayer from 'ol/layer/Layer';
import OLTileLayer from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';
import { AlloyBasemap } from '../core/AlloyBasemap';

export class AlloyBingBasemap implements AlloyBasemap {
  protected readonly tileLayer: OLTileLayer;
  protected readonly source: BingMaps;

  constructor(key: string) {
    this.source = new BingMaps({
      key,
      imagerySet: 'AerialWithLabels',
    });
    this.tileLayer = new OLTileLayer({
      source: this.source,
      zIndex: 1,
    });
  }

  public get layer(): Readonly<OLLayer> {
    return this.tileLayer;
  }
}
