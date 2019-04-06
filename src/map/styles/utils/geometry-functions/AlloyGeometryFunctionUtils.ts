import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLRenderFeature from 'ol/render/Feature';

/**
 * utility for geometry functions
 * @ignore
 */
export abstract class AlloyGeometryFunctionUtils {
  /**
   * pipes a series of geometry function commands into the next
   * @param from the starting call expecting an open layers feature
   * @param to the array of subsequent geometry functions to apply one after the other
   */
  public static pipe(
    from: (olFeature: OLFeature | OLRenderFeature) => OLGeometry,
    ...to: Array<(olGeometry: OLGeometry) => OLGeometry>
  ): (olFeature: OLFeature | OLRenderFeature) => OLGeometry {
    return (olFeature: OLFeature | OLRenderFeature) =>
      to.reduce((prev, curr) => curr(prev), from(olFeature));
  }
}
