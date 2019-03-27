import OLLayer from 'ol/layer/Layer';
import OLTileLayer from 'ol/layer/Tile';
import OLBingMaps from 'ol/source/BingMaps';
import { AlloyBasemap } from './AlloyBasemap';

export class AlloyBingBasemap implements AlloyBasemap {
  private readonly tileLayer: OLTileLayer;
  private readonly source: OLBingMaps;

  constructor(key: string) {
    this.source = new OLBingMaps({
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
