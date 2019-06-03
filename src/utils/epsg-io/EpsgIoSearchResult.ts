// example request can be seen: http://epsg.io/?q=27700&format=json
/**
 * @ignore
 * @internal
 */
export interface EpsgIoSearchResult {
  code: string;
  kind: string;
  bbox: number[];
  wkt: string;
  unit: string;
  proj4: string;
  name: string;
  area: string;
  default_trans: number;
  trans: number[];
  accuracy: number;
}
