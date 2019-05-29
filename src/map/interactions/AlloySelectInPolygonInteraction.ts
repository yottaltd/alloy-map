import { Debugger } from 'debug';
import OLFeature from 'ol/Feature';
import OLPolygon from 'ol/geom/Polygon';
import OLDoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import OLDraw from 'ol/interaction/Draw';
import OLRenderFeature from 'ol/render/Feature';
import OLVectorSource from 'ol/source/Vector';
import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyFeature } from '../features/AlloyFeature';
// tslint:disable-next-line: max-line-length
import { AlloyGeometryFunctionUtils } from '../styles/utils/geometry-functions/AlloyGeometryFunctionUtils';

/**
 * the line colour of the drawn polygon
 * @ignore
 */
const LINE_COLOUR = '#ffa500';

/**
 * the fill colour of each drawn point
 * @ignore
 */
const POINT_FILL_COLOUR = '#ffa500';

/**
 * the line colour of each drawn point
 * @ignore
 */
const POINT_LINE_COLOUR = '#ffffff';

/**
 * adds selection interaction to an alloy map
 * @ignore
 * @internal
 */
export class AlloySelectInPolygonInteraction {
  /**
   * debugger instance
   * @ignore
   * @internal
   */
  public readonly debugger: Debugger;

  /**
   * the map to add selection interaction to
   */
  private readonly map: AlloyMap;

  /**
   * the openlayers draw interaction instance
   */
  private olDraw: OLDraw;

  /**
   * the source to hold drawn features
   */
  private olSource: OLVectorSource;

  /**
   * keeps the selection interaction enabled state because during draw we turn it off and we want
   * to resume the last state when finished
   */
  private wasSelectionEnabled: boolean = true;

  /**
   * whether to append the final selection to the existing selection or replace it
   */
  private appendToSelection: boolean = false;

  /**
   * Custom function to call on interaction end (e.g. to control button state)
   */
  private onInteractionEnd: (() => void) | null = null;

  /**
   * creates a new instance
   * @param map the map to add selection interaction to
   * @ignore
   * @internal
   */
  constructor(map: AlloyMap) {
    this.map = map;

    // set the debugger instance
    this.debugger = this.map.debugger.extend(AlloySelectInPolygonInteraction.name);

    // create a source and layer to render the interaction
    this.olSource = new OLVectorSource();

    // create the draw interaction
    this.olDraw = new OLDraw({
      type: 'Polygon',
      source: this.olSource,
      style: [
        new OLStyle({
          stroke: new OLStroke({
            color: LINE_COLOUR,
            width: 4,
            lineDash: [10, 10],
          }),
        }),
        new OLStyle({
          image: new OLCircle({
            radius: 10,
            fill: new OLFill({
              color: POINT_FILL_COLOUR,
            }),
            stroke: new OLStroke({
              color: POINT_LINE_COLOUR,
              width: 4,
            }),
          }),
          geometry: (f: OLFeature | OLRenderFeature) => {
            if (f instanceof OLRenderFeature) {
              return f;
            }
            return AlloyGeometryFunctionUtils.convertGeometryToMultiPoint(f.getGeometry());
          },
        }),
      ],
    });

    // listen for draw end interaction
    this.olDraw.on('drawend', (e) => {
      const event = e as OLDraw.Event /* guaranteed to be this event type due to handler */;

      // we're expecting a polygon because thats our draw interaction
      const poly: OLPolygon = event.feature.getGeometry() as OLPolygon;

      // find all the features in the polygon area and select them
      const features = this.getFeaturesInPolygon(poly);

      if (features.length > 0) {
        // decide how to select the features
        if (this.appendToSelection) {
          this.map.selectFeatures(features);
        } else {
          this.map.setSelectedFeatures(features);
        }
      }

      // turn off the draw interaction
      this.stopPolygonSelect();
    });

    // by default the drawing is inactive
    this.olDraw.setActive(false);
  }

  /**
   * Starts draw interaction for polygon to select features inside of it
   * @param onEnd custom function to be called when interaction is finished
   * @param appendToSelection whether to append the final selection to the existing selection
   */
  public startPolygonSelect(onEnd?: () => void, appendToSelection: boolean = false): void {
    // if it's active, then no need to do anything
    if (this.olDraw.getActive()) {
      return;
    }

    this.onInteractionEnd = onEnd || null;

    // remember the selection mode
    this.appendToSelection = appendToSelection;

    // remember the selection interaction state and disable it
    this.wasSelectionEnabled = this.map.selectionInteraction.isEnabled;
    this.map.selectionInteraction.setEnabled(false);

    // disable double click zoom
    this.setDoubleClickZoomEnabled(false);

    // add the interaction to the map and clear previous drawn features
    this.olSource.clear();
    this.map.olMap.addInteraction(this.olDraw);

    // start drawing
    this.olDraw.setActive(true);
  }

  /**
   * stops features in polygon selection interaction
   */
  public stopPolygonSelect(): void {
    // if its already disabled then no need to do anything
    if (!this.olDraw.getActive()) {
      return;
    }

    try {
      // try this code (external user logic, could be demons!)
      if (this.onInteractionEnd !== null) {
        this.onInteractionEnd();
      }
    } finally {
      // deactivate draw interaction
      this.olDraw.setActive(false);

      // remove the interaction from the map
      this.map.olMap.removeInteraction(this.olDraw);

      // re-enable double-click zoom and selection on deferred
      setTimeout(() => {
        this.setDoubleClickZoomEnabled(true);
        this.map.selectionInteraction.setEnabled(this.wasSelectionEnabled);
      });
    }
  }

  /**
   * enables or disables double-click zoom interaction
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
   * gets array of alloy feature from layers that intersect the provided polygon
   * @param poly polygon to get features inside of
   */
  private getFeaturesInPolygon(poly: OLPolygon): AlloyFeature[] {
    const extent = poly.getExtent();

    const features: AlloyFeature[] = [];

    // iterate through layers to check
    this.map.layers.forEach((layer) => {
      // grab the source of the layer data and check its a valid source to search
      const sources = layer.olLayers.map((olLayer) => olLayer.getSource());
      for (const source of sources) {
        if (source instanceof OLVectorSource) {
          // get all features in the polygon extent (fast way to cull items)
          source.forEachFeatureInExtent(extent, (f: OLFeature) => {
            // now break apart each geometry into it's points and test it intersects
            const points = AlloyGeometryFunctionUtils.convertGeometryToMultiPoint(f.getGeometry());
            if (points.getCoordinates().some((coord) => poly.intersectsCoordinate(coord))) {
              // find the feature and add to the search results
              const feature = layer.getFeatureById(FeatureUtils.getFeatureIdFromOlFeature(f));
              if (feature && feature.allowsSelection) {
                features.push(feature);
              }
            }
          });
        }
      }
    });

    return features;
  }
}
