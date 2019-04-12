import { Debugger } from 'debug';
import { flatMap, flatten, flattenDepth } from 'lodash';
import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import OLDoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import OLDraw from 'ol/interaction/Draw';
import OLVectorLayer from 'ol/layer/Vector';
import OLRenderFeature from 'ol/render/Feature';
import OLVectorSource from 'ol/source/Vector';
import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyFeature } from '../features/AlloyFeature';

/**
 * adds selection interaction to an alloy map
 * @ignore
 */
export class AlloySelectInPolygonInteraction {
  /**
   *
   * @param geometry geometry to get flat coorinates array for
   */
  private static flatCoordinates(geometry: OLGeometry): Array<[number, number]> {
    if (geometry.getType() === 'Point') {
      return [(geometry as OLPoint).getCoordinates()];
    }
    switch (geometry.getType()) {
      case 'GeometryCollection':
        return flatten(
          (geometry as OLGeometryCollection)
            .getGeometries()
            .map((cg: any) =>
              flattenDepth(
                cg.getCoordinates(),
                AlloySelectInPolygonInteraction.flattenDepthForGeometry(geometry),
              ),
            ),
        ) as Array<[number, number]>;
      default:
        return flattenDepth(
          (geometry as any).getCoordinates(),
          AlloySelectInPolygonInteraction.flattenDepthForGeometry(geometry),
        );
    }
  }

  /**
   * Get the depth needs to be used for _.flattenDepth for geometry provided
   * @param geometry geometry to get depth for
   * @returns depth of geometry for _.flattenDepth call
   */
  private static flattenDepthForGeometry(geometry: ol.geom.Geometry): number {
    switch (geometry.getType()) {
      default:
      case 'MultiPoint':
      case 'LineString':
        return 0;
      case 'MultiLineString':
      case 'Polygon':
        return 1;
      case 'MultiPolygon':
        return 2;
    }
  }
  /**
   * debugger instance
   * @ignore
   */
  public readonly debugger: Debugger;
  public selectionStyle: OLStyle[];
  private layer: OLVectorLayer | null = null;

  private wasSelectionEnabled: boolean = true;
  private draw: OLDraw | null = null;

  /**
   * the map to add selection interaction to
   */
  private map: AlloyMap;

  /**
   * creates a new instance
   * @param map the map to add selection interaction to
   */
  constructor(map: AlloyMap) {
    this.map = map;

    // set the debugger instance
    this.debugger = this.map.debugger.extend(AlloySelectInPolygonInteraction.name);

    this.selectionStyle = [
      new OLStyle({
        stroke: new OLStroke({
          color: '#ffa500',
          width: 4,
          lineDash: [10, 10],
        }),
      }),
      new OLStyle({
        image: new OLCircle({
          radius: 10,
          fill: new OLFill({
            color: '#ffa500',
          }),
          stroke: new OLStroke({
            color: '#ffffff',
            width: 4,
          }),
        }),
        geometry: (f: OLFeature | OLRenderFeature) => {
          if (f instanceof OLRenderFeature) {
            return f;
          }
          return new OLMultiPoint(AlloySelectInPolygonInteraction.flatCoordinates(f.getGeometry()));
        },
      }),
    ];
  }

  /**
   * Starts draw interaction for polygon to select features inside of it
   */
  public startPolygonSelect(): void {
    const source = new OLVectorSource();
    this.layer = new OLVectorLayer({
      source,
    });
    this.layer.setMap(this.map.olMap);

    this.draw = new OLDraw({
      type: 'Polygon',
      source,
      style: this.selectionStyle,
    });
    this.draw.on('drawstart', (e) => {
      this.wasSelectionEnabled = this.map.selectionInteraction.setEnabled(false);
      this.setDoubleClickZoomEnabled(false);
    });
    this.draw.on('drawend', (e) => {
      const event = e as OLDraw.Event;

      const poly: OLPolygon = event.feature.getGeometry() as OLPolygon;

      const features = this.getFeaturesInPolygon(poly);
      this.map.selectFeatures(features);
      this.stopPolygonSelect();
    });
    this.map.olMap.addInteraction(this.draw);
    this.draw.setActive(true);
  }

  /**
   * Stops features in polygon selection interaction
   */
  public stopPolygonSelect(): void {
    // remove the layer if available
    if (this.layer !== null) {
      this.layer.setMap(null as any /* bad TS support for OL, typing doesn't allow null */);
      this.layer = null;
    }

    // if no draw interaction then bail
    if (this.draw === null) {
      return;
    }

    // deactivate draw interaction and remove from the map
    this.draw.setActive(false);
    this.map.olMap.removeInteraction(this.draw);
    this.draw = null;

    // re-enable double-click zoom and selection on deferred
    setTimeout(() => {
      this.setDoubleClickZoomEnabled(true);
      this.map.selectionInteraction.setEnabled(this.wasSelectionEnabled);
    });
  }

  /**
   * Enables or disables double-click zoom interaction
   * @param enabled whether to enable double-click zoom event
   */
  private setDoubleClickZoomEnabled(enabled: boolean): void {
    this.map.olMap
      .getInteractions()
      .getArray()
      .filter((i) => i instanceof OLDoubleClickZoom)
      .forEach((i) => i.setActive(enabled));
  }

  /**
   * Gets array of AlloyFeatures from AlloyLayers that intersect the provided polygon
   * @param poly polygon to get features inside of
   * @returns AlloyFeature[]
   */
  private getFeaturesInPolygon(poly: OLPolygon): AlloyFeature[] {
    const extent = poly.getExtent();

    // get features that intersect polygon for all AlloyLayer instances
    return flatMap([...this.map.layers.values()], (layer) => {
      const src = layer.olLayer.getSource();
      if (src instanceof OLVectorSource) {
        return src
          // only interested in features that overlap polygon's extent
          // so that we don't process everything
          .getFeaturesInExtent(extent)
          // filter features to only those whose coordinates intersect the polygon
          .filter((extentFeature) =>
            AlloySelectInPolygonInteraction.flatCoordinates(extentFeature.getGeometry()).find(
              (coord) => poly.intersectsCoordinate(coord),
            ),
          )
          // get AlloyFeature objects for features
          .map((extentFeature) =>
            layer.getFeatureById(FeatureUtils.getFeatureIdFromOlFeature(extentFeature)),
          )
          // filter out nulls
          .filter((alloyFeature) => alloyFeature !== null) as AlloyFeature[];
      }
      return [];
    });
  }
}
