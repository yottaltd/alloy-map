import { AlloyCoordinate } from './AlloyCoordinate';

export class AlloyBounds {
  public sw: AlloyCoordinate;
  public ne: AlloyCoordinate;

  constructor(sw: AlloyCoordinate, ne: AlloyCoordinate) {
    this.sw = sw;
    this.ne = ne;
  }

  public toArray(): [number, number, number, number] {
    return [this.sw.lat, this.sw.lon, this.ne.lat, this.ne.lon];
  }
}
