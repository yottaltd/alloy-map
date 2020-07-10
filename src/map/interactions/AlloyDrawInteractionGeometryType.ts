/**
 * allowed geometry types for draw interaction
 */
export enum AlloyDrawInteractionGeometryType {
  /**
   * the point drawing interaction, a Point geometry
   */
  Point = 'Point',

  /**
   * the line string drawing interaction, a LineString geometry
   */
  LineString = 'LineString',

  /**
   * the polygon drawing interaction, a Polygon geometry
   */
  Polygon = 'Polygon',

  /**
   * the box drawing interaction, a Polygon geometry that is a box shape
   */
  Box = 'Box',
}
