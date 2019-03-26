/**
 * a mode representing how selection is handled on the map
 */
export enum AlloySelectionMode {
  /**
   * selection is disabled
   */
  Off,

  /**
   * only a single feature may be selected at a time
   */
  Single,

  /**
   * allows selection of multiple features
   */
  Multi,

  /**
   * a drawing mode where the user can draw a polygon and have features inside it selected
   */
  Polygon,
}
