/**
 * the properties returned from the service for an alloy heatmap cluster feature
 */
export interface AlloyHeatmapClusterFeatureProperties {
  /**
   * the number of items in the cluster
   */
  readonly weight: number;

  /**
   * the bounding box of the clustered items
   */
  readonly bbox: {
    lonMin: number;
    lonMax: number;
    latMin: number;
    latMax: number;
  };

  /**
   * its stringified type
   */
  readonly type: string;

  /**
   * the style id that includes the cluster
   */
  readonly styleId: string;
}
