export class AlloyCoordinate {
  public static fromArray(array: number[]) {
    return new AlloyCoordinate(array[0], array[1]);
  }

  public lat: number;
  public lon: number;

  constructor(lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
  }

  public toArray(): [number, number] {
    return [this.lat, this.lon];
  }

  public equals(other: AlloyCoordinate) {
    return this.lat === other.lat && this.lon === other.lon;
  }
}
