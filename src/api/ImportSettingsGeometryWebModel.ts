
/**
 * Web model for import settings geometry
 * @export
 * @interface ImportSettingsGeometryWebModel
 */
export interface ImportSettingsGeometryWebModel {
  /**
   * The header name(s) on the import to generate geometry from. The number and order of array elements is important. 1 element = WKT or GeoJson, 2 elements = X1,Y1, 4 elements = X1,Y1,X2,Y2 When passing multiple headers order is important always needs to be (latitude, longitude). If using proj4 string order will depend on that proj4 string e.g. for 27700, order needs to be (easting, northing).
   * @type {Array<string>}
   * @memberof ImportSettingsGeometryWebModel
   */
  headers: Array<string>;
  /**
   * This value indicates the projection of the geometry, must be a valid proj4 string
   * @type {string}
   * @memberof ImportSettingsGeometryWebModel
   */
  proj4?: string;
}
