import { RouteStopWebModelBase } from './RouteStopWebModelBase';
/**
 * 
 * @export
 * @interface RouteStopLocationWebModel
 */
export interface RouteStopLocationWebModel extends RouteStopWebModelBase {
  /**
   * Longitude in degrees to route along
   * @type {number}
   * @memberof RouteStopLocationWebModel
   */
  longitude: number;
  /**
   * Latitude in degrees  to route along
   * @type {number}
   * @memberof RouteStopLocationWebModel
   */
  latitude: number;
}
