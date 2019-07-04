import { EpsgIoSearchResult } from './EpsgIoSearchResult';

// example request can be seen: http://epsg.io/?q=27700&format=json
export interface EpsgIoSearchResponse {
  status: string;
  number_result: number;
  results: EpsgIoSearchResult[];
}
