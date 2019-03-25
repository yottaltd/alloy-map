import { AlloyCoordinate } from './AlloyCoordinate';

export class AlloyBounds {
  public sw: AlloyCoordinate;
  public ne: AlloyCoordinate;

  constructor(sw: AlloyCoordinate, ne: AlloyCoordinate) {
    this.sw = sw;
    this.ne = ne;
  }
}
