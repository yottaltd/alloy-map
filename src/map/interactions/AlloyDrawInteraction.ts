import { Debugger } from 'debug';
import { Geometry } from 'geojson';
import * as _ from 'lodash';
import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import OLDoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import OLDraw from 'ol/interaction/Draw';
import OLModify from 'ol/interaction/Modify';
import OLSelect from 'ol/interaction/Select';
import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { SimpleEventDispatcher } from 'ste-simple-events';
import * as uuid from 'uuid';
import { GeoJSONObjectType } from '../../api';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyDrawEvent } from '../events/AlloyDrawEvent';
import { AlloyDrawEventHandler } from '../events/AlloyDrawEventHandler';
import { AlloyDrawFeature } from '../features/AlloyDrawFeature';
import { AlloyDrawFeatureProperties } from '../features/AlloyDrawFeatureProperties';
import { AlloyDrawLayer } from '../layers/drawing/AlloyDrawLayer';
// tslint:disable-next-line: max-line-length
import { AlloyGeometryFunctionUtils } from '../styles/utils/geometry-functions/AlloyGeometryFunctionUtils';
import { AlloyDrawInteractionGeometryType } from './AlloyDrawInteractionGeometryType';
import { MathUtils } from '../../utils/MathUtils';

/**
 * default colour for draw and modify interactions
 * @ignore
 */
const DRAW_COLOUR = '#ffa500';

/**
 * colour for strokes on the draw interactions
 * @ignore
 */
const DRAW_WHITE = '#ffffff';

/**
 * the line width for draw interactions
 * @ignore
 */
const DRAW_LINE_WIDTH = 4;

/**
 * the radius of balls for draw interactions
 * @ignore
 */
const DRAW_RADIUS = 10;

/**
 * adds draw interaction to an alloy map
 * @ignore
 */
export class AlloyDrawInteraction {
  /**
   * debugger instance
   * @ignore
   */
  public readonly debugger: Debugger;

  /**
   * dispatcher for `AlloyDrawEvent`
   */
  private readonly dispatcher = new SimpleEventDispatcher<AlloyDrawEvent>();

  /**
   * The draw layer that holds all features
   */
  private drawLayer: AlloyDrawLayer;

  /**
   * layer for remove coordinate point features
   */
  private removeLayer: AlloyDrawLayer;

  /**
   * the map to add hover interaction to
   */
  private map: AlloyMap;

  /**
   * keeps the selection interaction enabled state because during draw we turn it off and we want
   * to resume the last state when finished
   */
  private wasSelectionEnabled: boolean = true;

  /**
   * `OLDraw` interaction when active, otherwise null
   */
  private olDraw: OLDraw | null = null;

  /**
   * `OLModify` interaction when active, null when remove is active
   */
  private olModify: OLModify | null = null;

  /**
   * `OLSelect` interaction used together with `removeLayer`
   * to remove coordinates from source geometry on click
   */
  private olSelect: OLSelect | null = null;

  /**
   * `OLStyle`s for `draw` and `modify` interactions
   */
  private readonly drawStyles: OLStyle[] = [
    new OLStyle({
      stroke: new OLStroke({
        color: DRAW_COLOUR,
        width: DRAW_LINE_WIDTH,
        lineDash: [DRAW_RADIUS, DRAW_RADIUS],
      }),
    }),
    new OLStyle({
      image: new OLCircle({
        radius: DRAW_RADIUS,
        fill: new OLFill({
          color: DRAW_COLOUR,
        }),
        stroke: new OLStroke({
          color: DRAW_WHITE,
          width: DRAW_LINE_WIDTH,
        }),
      }),
      geometry: (f) =>
        AlloyGeometryFunctionUtils.convertGeometryToMultiPoint(f.getGeometry() as OLGeometry),
    }),
  ];

  /**
   * creates a new instance
   * @param map the map to add hover interaction to
   */
  constructor(map: AlloyMap) {
    this.map = map;

    // set the debugger instance
    this.debugger = this.map.debugger.extend(AlloyDrawInteraction.name);

    // initialise singleton draw layer
    this.drawLayer = new AlloyDrawLayer({
      map,
    });
    this.map.addLayer(this.drawLayer);

    // initialise singleton remove layer
    this.removeLayer = new AlloyDrawLayer({
      map,
    });
    this.map.addLayer(this.removeLayer);

    // initialise modify interaction to be available on draw layer when source is not empty
    this.initModify();
  }

  /**
   * adds an event handler to listen for the `AlloyDrawEvent` event
   * @param handler the handler to call when the event is raised
   */
  public addDrawListener(handler: AlloyDrawEventHandler): void {
    this.dispatcher.subscribe(handler);
  }

  /**
   * removes an event handler listening to the `AlloyDrawEvent` event
   * @param handler the handler to stop listening
   */
  public removeDrawListener(handler: AlloyDrawEventHandler): void {
    this.dispatcher.unsubscribe(handler);
  }

  /**
   * stops all interactions and clears draw layer
   */
  public clear() {
    this.cancelRemoval();
    this.onDrawEnd(null);
    this.drawLayer.clearFeatures();
    this.initModify();
  }

  /**
   * Removes a draw feature from draw layer
   * @param feature `AlloyDrawFeature` to remove from draw source
   */
  public removeFeature(feature: AlloyDrawFeature) {
    this.drawLayer.removeFeature(feature);
  }

  /**
   * Starts draw interaction for provided geometry type
   * stays active until geometry is drawn or `cancelDraw` is called
   * @param type geometry type to draw
   * @param properties properties for feature to be drawn
   */
  public startDraw(type: AlloyDrawInteractionGeometryType, properties: AlloyDrawFeatureProperties) {
    // cancels previous draw interaction
    this.removeDrawInteraction();

    // initialise draw on draw layer source, with default draw styles
    this.olDraw = new OLDraw({
      type,
      source: this.drawLayer.olSource,
      style: this.drawStyles,
    });

    // on draw start disable map interactions
    this.olDraw.on('drawstart', (e) => {
      this.wasSelectionEnabled = this.map.selectionInteraction.isEnabled;
      this.map.selectionInteraction.setEnabled(false);
      this.setDoubleClickZoomEnabled(false);
    });

    // on draw end save feature and reset interactions
    this.olDraw.on('drawend', (e) => {
      const event = e as OLDraw.Event;

      // wrap created draw event feature into AlloyDrawFeature and save to draw layer
      const feature = new AlloyDrawFeature(uuid.v1(), event.feature, properties);
      this.drawLayer.addFeature(feature);

      this.onDrawEnd(feature);
    });

    // add new draw interaction to the map
    this.map.olMap.addInteraction(this.olDraw);
  }

  // resets draw interaction
  public cancelDraw() {
    this.onDrawEnd(null);
  }

  /**
   * adds a draw feature to the layer
   * @param feature `AlloyDrawFeature` to add to draw layer
   */
  public addDrawFeature(feature: AlloyDrawFeature) {
    this.drawLayer.addFeature(feature);
  }

  /**
   * Gets all features in the draw layer
   * @returns an array of `AlloyDrawFeature`
   */
  public getDrawFeatures(): AlloyDrawFeature[] {
    return [...this.drawLayer.features.values()];
  }

  /**
   * Gets all features geometries in the draw layer as a single geometry
   * @returns a merged geometry GeoJSON of all draw features
   */
  public getDrawGeometry(): Geometry {
    return this.drawLayer.getAllFeaturesGeometry();
  }

  /**
   * Returns an array of current feature geometry types in the draw layer.
   * @returns array of `GeoJSONObjectType`
   */
  public getDrawTypes(): GeoJSONObjectType[] {
    return this.drawLayer.olSource.getFeatures().map((f) => f.getGeometry().getType() as any);
  }

  /**
   * Starts vertices removal interaction
   */
  public startRemoval() {
    // cancel existing removal if available
    this.cancelRemoval();

    // disable existing draw and modify interactions
    this.removeDrawInteraction();
    this.removeModifyInteraction();

    // disable default map selection and zoom
    this.wasSelectionEnabled = this.map.selectionInteraction.isEnabled;
    this.map.selectionInteraction.setEnabled(false);
    this.setDoubleClickZoomEnabled(false);

    // process draw features coordinates into remove features
    this.setRemoveInteractionFeatures();

    // add new select interaction for remove layer
    this.olSelect = new OLSelect({
      layers: [this.removeLayer.olLayers[0]],
    });

    // handler to remove coordinates from draw features on selection of remove features
    this.olSelect.on('select', (e) => {
      const event = e as OLSelect.Event;
      // don't process if no features are selected
      if (event.selected.length === 0) {
        return;
      }
      // find remove AlloyDrawFeature for selected OLFeature
      const selectedFeature = this.removeLayer.getFeatureById(
        FeatureUtils.getFeatureIdFromOlFeature(event.selected[0]),
      )!;
      // get coordinate of selected remove point
      const coord = (selectedFeature.olFeature.getGeometry() as OLPoint).getCoordinates();
      // iterate over existing draw geometries to find matching coordinate for
      for (const sourceFeature of Array.from(this.drawLayer.features.values())) {
        // get geometry of draw feature and flatten coordinates
        const sourceGeometry = sourceFeature.olFeature.getGeometry();
        const flatCoords = AlloyGeometryFunctionUtils.convertGeometryToMultiPoint(
          sourceGeometry,
        ).getCoordinates();
        // check if this geometry has a coordinate that matches remove point
        if (flatCoords.findIndex((c) => this.isCoordinateEqual(c, coord)) === -1) {
          continue;
        }

        // delete selected point from remove layer
        this.removeLayer.removeFeature(selectedFeature);
        this.olSelect!.getFeatures().remove(selectedFeature.olFeature);

        // process existining geometry on whether we need to remove a
        // single point or whole geometry if not enough points are left
        const geometryType = sourceFeature.olFeature.getGeometry().getType();
        let featureRemove = false;
        switch (geometryType) {
          case AlloyDrawInteractionGeometryType.Point:
            featureRemove = true;
            break;
          case AlloyDrawInteractionGeometryType.LineString:
            if ((sourceGeometry as OLLineString).getCoordinates().length <= 2) {
              featureRemove = true;
            }
            break;
          case AlloyDrawInteractionGeometryType.Polygon:
            if ((sourceGeometry as OLPolygon).getCoordinates()[0].length <= 4) {
              featureRemove = true;
            }
            break;
          default:
            break;
        }
        // remove whole point or single feature
        if (featureRemove) {
          this.drawLayer.removeFeature(sourceFeature);
        } else {
          this.removeCoordinate(sourceGeometry, coord);
        }

        // fire change event
        this.dispatcher.dispatch(
          new AlloyDrawEvent(featureRemove ? null : sourceFeature, this.drawLayer),
        );
        // re-process point features on remove layer for remove interaction
        this.setRemoveInteractionFeatures();
        break;
      }
    });

    // add remove interaction to the map
    this.map.olMap.addInteraction(this.olSelect);
  }

  /**
   * Cancels vertex remove interaction
   */
  public cancelRemoval(): boolean {
    // clears remove layer point features
    this.removeLayer.clearFeatures();
    // if remove interaction is active then disable it and re-enable modify
    if (this.olSelect) {
      this.olSelect.setActive(false);
      this.map.olMap.removeInteraction(this.olSelect);
      this.olSelect = null;
      this.initModify();
      return true;
    }
    // reset selection and double-click zoom interactions
    this.map.selectionInteraction.setEnabled(this.wasSelectionEnabled);
    this.setDoubleClickZoomEnabled(true);
    return false;
  }

  /**
   * Removes draw interaction from the map and resets the variable
   */
  private removeDrawInteraction() {
    if (this.olDraw !== null) {
      this.map.olMap.removeInteraction(this.olDraw);
      this.olDraw = null;
    }
  }

  /**
   * Removes modify interaction from the map and resets the variable
   */
  private removeModifyInteraction() {
    if (this.olModify !== null) {
      this.map.olMap.removeInteraction(this.olModify);
      this.olModify = null;
    }
  }

  /**
   * resets selection and double-click zoom interactions
   * and dispatches draw event with drawn feature or null if was cancelled
   * @param feature drawn feature or null if draw interaction was cancelled
   */
  private onDrawEnd(feature: AlloyDrawFeature | null) {
    // reset interactions
    this.removeDrawInteraction();
    setTimeout(() => {
      this.map.selectionInteraction.setEnabled(this.wasSelectionEnabled);
      this.setDoubleClickZoomEnabled(true);
      // dispatch event
      this.dispatcher.dispatch(new AlloyDrawEvent(feature, this.drawLayer));
    });
  }

  /**
   * initialise modify interaction
   */
  private initModify() {
    this.removeModifyInteraction();
    // create new modify interaction for all features in draw layer with default draw styles
    this.olModify = new OLModify({
      source: this.drawLayer.olSource,
      style: this.drawStyles,
    });

    this.olModify.on('modifystart', (e) => {
      // on modify start cancel draw interaction if available
      if (this.olDraw !== null) {
        this.cancelDraw();
      }
      // disable selection and double-click zoom interactions
      this.wasSelectionEnabled = this.map.selectionInteraction.isEnabled;
      this.map.selectionInteraction.setEnabled(false);
      this.setDoubleClickZoomEnabled(false);
    });

    this.olModify.on('modifyend', (e) => {
      const event = e as OLModify.Event;
      // find AlloyDrawFeature that was modified in the interaction
      const drawFeature = this.drawLayer.getFeatureById(
        FeatureUtils.getFeatureIdFromOlFeature(event.features.item(0)),
      );
      // reset interactions and dispatch event if possible
      this.onModifyEnd(drawFeature);
    });

    // add modify interaction to the map
    this.map.olMap.addInteraction(this.olModify);
  }

  /**
   * resets selection and double-click zoom interactions
   * and dispatches draw event with modified feature
   * @param feature modified feature
   */
  private onModifyEnd(feature: AlloyDrawFeature | null) {
    // reset interactions
    setTimeout(() => {
      this.map.selectionInteraction.setEnabled(this.wasSelectionEnabled);
      this.setDoubleClickZoomEnabled(true);
      // dispatch draw event if feature is not null
      if (feature !== null) {
        this.dispatcher.dispatch(new AlloyDrawEvent(feature, this.drawLayer));
      }
    });
  }

  /**
   * processes draw layer features and creates point features for remove layer from all coordinates
   */
  private setRemoveInteractionFeatures() {
    // clears remove layer
    this.removeLayer.clearFeatures();
    // convert all draw layer features to points
    _.flatten(
      Array.from(this.drawLayer.features.values()).map((feature) =>
        AlloyGeometryFunctionUtils.convertGeometryToMultiPoint(
          feature.olFeature.getGeometry(),
        ).getPoints(),
      ),
    ).forEach((point) => {
      // create a remove feature for each point and add to remove layer
      const feature = new AlloyDrawFeature(uuid.v1(), new OLFeature(point), {
        icon: 'icon-close',
        colour: DRAW_COLOUR,
      });
      this.removeLayer.addFeature(feature);
      this.removeLayer.olSource.addFeature(feature.olFeature);
    });
  }

  /**
   * Removes a coordinate from simple geometry
   * @param geometry parent geometry from which to remove coordinate
   * @param coordinate coordinate to remove from geometry
   */
  private removeCoordinate(geometry: OLGeometry, coordinate: [number, number]) {
    switch (geometry.getType()) {
      case 'MultiPoint':
        const multiPoint = geometry as OLMultiPoint;
        const multiPointCoordinates = _.slice(multiPoint.getCoordinates());
        const pointIdx = _.findIndex(multiPointCoordinates, (mpc) =>
          this.isCoordinateEqual(mpc, coordinate),
        );
        if (pointIdx > -1) {
          multiPointCoordinates.splice(pointIdx, 1);
        }
        multiPoint.setCoordinates(multiPointCoordinates);
        break;
      case 'LineString':
        const lineString = geometry as OLLineString;
        const lineStringCoordinates = _.slice(lineString.getCoordinates());
        const lineIdx = _.findIndex(lineStringCoordinates, (lsc) =>
          this.isCoordinateEqual(lsc, coordinate),
        );
        if (lineIdx > -1) {
          lineStringCoordinates.splice(lineIdx, 1);
        }
        lineString.setCoordinates(lineStringCoordinates);
        break;
      case 'MultiLineString':
        const multiLineString = geometry as OLMultiLineString;
        const multiLineStringCoordinates = _.slice(multiLineString.getCoordinates());
        for (const line of multiLineStringCoordinates) {
          const idx = _.findIndex(line, (lc) => this.isCoordinateEqual(lc, coordinate));
          if (idx > -1) {
            line.splice(idx, 1);
          }
        }
        multiLineString.setCoordinates(multiLineStringCoordinates);
        break;
      case 'Polygon':
        const polygon = geometry as OLPolygon;
        const polygonCoordinates = _.slice(polygon.getCoordinates());
        for (const coords of polygonCoordinates) {
          const idx = _.findIndex(coords, (pc) => this.isCoordinateEqual(pc, coordinate));
          if (idx > -1) {
            coords.splice(idx, 1);
            if (idx === 0) {
              coords.splice(-1, 1, coords[0].slice() as [number, number]);
            }
            break;
          }
        }
        polygon.setCoordinates(polygonCoordinates);
        break;
      case 'MultiPolygon':
        const multiPolygon = geometry as OLMultiPolygon;
        const multiPolygonCoordinates = _.slice(multiPolygon.getCoordinates());
        for (const poly of multiPolygonCoordinates) {
          let removed = false;
          for (const coords of poly) {
            const idx = _.findIndex(coords, (mpc) => this.isCoordinateEqual(mpc, coordinate));
            if (idx > -1) {
              coords.splice(idx, 1);
              if (idx === 0) {
                coords.splice(-1, 1, coords[0].slice() as [number, number]);
              }
              removed = true;
              break;
            }
          }
          if (removed) {
            break;
          }
        }
        multiPolygon.setCoordinates(multiPolygonCoordinates);
        break;
      default:
        break;
    }
  }

  /**
   * checks if two coordinates are "equal"
   * @param first first coordinate
   * @param second second coordinate
   * @return true if coordinates are equals to 6dp
   */
  private isCoordinateEqual(first: [number, number], second: [number, number]): boolean {
    return (
      MathUtils.approximateEquals(first[0], second[0], 0.000001) &&
      MathUtils.approximateEquals(first[1], second[1], 0.000001)
    );
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
}
