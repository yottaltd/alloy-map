export class AlloyCoordinate {
  public static fromArray(array: number[]) {
    return new AlloyCoordinate(array[0], array[1]);
  }

  public lat: number;
  public lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}
