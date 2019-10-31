/**
 * represents a tile coordinate and its internal openlayers coordinate, this is because openlayers
 * likes to use negative y coordinates for world tiles
 * @ignore
 * @internal
 */
export class AlloyTileCoordinate {
  /**
   * the openlayers tile coordinate
   */
  public readonly olTileCoordinate: number[];

  /**
   * the normalised x coordinate
   */
  public readonly x: number;

  /**
   * the normalised y coordinate
   */
  public readonly y: number;

  /**
   * the normalised z coordinate
   */
  public readonly z: number;

  /**
   * a cacheable key for the tile based on x/y/z
   */
  public readonly requestKey: string;

  /**
   * creates a new instance
   * @param olTileCoordinate the openlayers tile coordinate to parse
   */
  constructor(olTileCoordinate: number[]) {
    this.olTileCoordinate = olTileCoordinate;
    this.x = olTileCoordinate[1];
    // calculate the normalised tile coordinates, for some reason openlayers like negative y
    // values and we need to offset them anyway
    this.y = Math.abs(olTileCoordinate[2] + 1);
    this.z = olTileCoordinate[0];

    this.requestKey = this.z + ':' + this.x + ':' + this.y;
  }
}
