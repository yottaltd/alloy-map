import OLLayer from 'ol/layer/Layer';
import OLTileLayer from 'ol/layer/Tile';
import OLXYZ from 'ol/source/XYZ';
import { AlloyBasemap } from './AlloyBasemap';

export class AlloyTileBasemap implements AlloyBasemap {
  private readonly tileLayer: OLTileLayer;
  private readonly source: OLXYZ;

  constructor(url: string, tileSize: number = 512) {
    this.source = new OLXYZ({
      url,
      crossOrigin: 'anonymous',
      tileSize,
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
