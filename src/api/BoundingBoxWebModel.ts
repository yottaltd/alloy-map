// tslint:disable

/**
 * Bounding box
 * @export
 * @interface BoundingBoxWebModel
 */
export interface BoundingBoxWebModel {
  /**
   * Minimum longitude of the bounding box
   * @type {number}
   * @memberof BoundingBoxWebModel
   */
  lonMin: number;
  /**
   * Minimum latitude of the bounding box
   * @type {number}
   * @memberof BoundingBoxWebModel
   */
  latMin: number;
  /**
   * Maximum longitude of the bounding box
   * @type {number}
   * @memberof BoundingBoxWebModel
   */
  lonMax: number;
  /**
   * Maximum latitude of the bounding box
   * @type {number}
   * @memberof BoundingBoxWebModel
   */
  latMax: number;
}
