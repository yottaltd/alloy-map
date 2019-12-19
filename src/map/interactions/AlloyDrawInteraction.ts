import { Debugger } from 'debug';
import { Geometry } from 'geojson';
import * as _ from 'lodash';
import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLGeometryType from 'ol/geom/GeometryType';
import OLLineString from 'ol/geom/LineString';
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
import { GeoJSONObjectType } from '../../api/GeoJSONObjectType';
import { AlloyMapError } from '../../error/AlloyMapError';
import { EnumUtils } from '../../utils/EnumUtils';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { GeometryUtils } from '../../utils/GeometryUtils';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyDrawEvent } from '../events/AlloyDrawEvent';
import { AlloyDrawEventHandler } from '../events/AlloyDrawEventHandler';
import { AlloyDrawFeature } from '../features/AlloyDrawFeature';
import { AlloyDrawFeatureProperties } from '../features/AlloyDrawFeatureProperties';
import { AlloyDrawLayer } from '../layers/drawing/AlloyDrawLayer';
// tslint:disable-next-line: max-line-length
import { AlloyGeometryFunctionUtils } from '../styles/utils/geometry-functions/AlloyGeometryFunctionUtils';
import { AlloyDrawInteractionGeometryType } from './AlloyDrawInteractionGeometryType';

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
 * @internal
 */
export class AlloyDrawInteraction {
  /**
   * debugger instance
   * @ignore
   * @internal
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
   * @ignore
   * @internal
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

    const olGeometryType = EnumUtils.alloyDrawGeometryToOpenlayersGeometryType(type);
    if (!olGeometryType) {
      throw new AlloyMapError(1572524091, 'incompatible draw geometry type');
    }
    // initialise draw on draw layer source, with default draw styles
    this.olDraw = new OLDraw({
      type: olGeometryType,
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
    this.olDraw.on('drawend', (event) => {
      // wrap created draw event feature into AlloyDrawFeature and save to draw layer
      const feature = new AlloyDrawFeature(uuid.v1(), event.feature, properties);
      this.drawLayer.addFeature(feature, false);

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
    return Array.from(this.drawLayer.features.values());
  }

  /**
   * Gets all features geometries in the draw layer as a single geometry
   * @returns a merged geometry GeoJSON of all draw features
   */
  public getDrawGeometry(): Geometry {
    return this.drawLayer.getAllFeaturesGeometry();
  }

  /**
   * returns a unique array of all the GeoJSON types in the draw layer.
   * @returns array of `GeoJSONObjectType`
   */
  public getDrawTypes(): GeoJSONObjectType[] {
    return _.uniq(
      this.drawLayer.olSource.getFeatures().map((f) => {
        const geoJsonType = EnumUtils.openlayersGeometryToGeoJSONGeometryType(
          f.getGeometry().getType(),
        );
        if (!geoJsonType) {
          throw new AlloyMapError(1572524252, 'Geometry is incompatible with GeoJSONObjectType');
        }
        return geoJsonType;
      }),
    );
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
    this.olSelect.on('select', (event) => {
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
        if (flatCoords.findIndex((c) => GeometryUtils.isCoordinateEqual(c, coord)) === -1) {
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
          case OLGeometryType.POINT:
            featureRemove = true;
            break;
          case OLGeometryType.LINE_STRING:
            if ((sourceGeometry as OLLineString).getCoordinates().length <= 2) {
              featureRemove = true;
            }
            break;
          case OLGeometryType.POLYGON:
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
          GeometryUtils.removeCoordinate(sourceGeometry, coord);
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

    this.olModify.on('modifyend', (event) => {
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
    });
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
