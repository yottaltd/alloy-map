import { GeoJSONObjectType } from '@/api/GeoJSONObjectType';
import { AlloyMapError } from '@/error/AlloyMapError';
import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyDrawEvent } from '@/map/events/AlloyDrawEvent';
import { AlloyDrawEventHandler } from '@/map/events/AlloyDrawEventHandler';
import { AlloyDrawFeature } from '@/map/features/AlloyDrawFeature';
import { AlloyDrawFeatureProperties } from '@/map/features/AlloyDrawFeatureProperties';
// eslint-disable-next-line max-len
import { AlloyDrawInteractionGeometryType } from '@/map/interactions/AlloyDrawInteractionGeometryType';
import { AlloyDrawLayer } from '@/map/layers/drawing/AlloyDrawLayer';
// eslint-disable-next-line max-len
import { AlloyGeometryFunctionUtils } from '@/map/styles/utils/geometry-functions/AlloyGeometryFunctionUtils';
import { EnumUtils } from '@/utils/EnumUtils';
import { FeatureUtils } from '@/utils/FeatureUtils';
import { GeometryUtils } from '@/utils/GeometryUtils';
import { Geometry } from 'geojson';
import uniq from 'lodash.uniq';
import flatten from 'lodash.flatten';
import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLGeometryType from 'ol/geom/GeometryType';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import OLDoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import OLDraw, { createBox as OLCreateBox } from 'ol/interaction/Draw';
import OLModify from 'ol/interaction/Modify';
import OLSelect from 'ol/interaction/Select';
import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { SimpleEventDispatcher } from 'ste-simple-events';
import * as uuid from 'uuid';

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
  private wasSelectionEnabled = true;

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
      geometryFunction: type === AlloyDrawInteractionGeometryType.Box ? OLCreateBox() : undefined,
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
    return uniq(
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
    const olSelect = new OLSelect({
      layers: [this.removeLayer.olLayers[0]],
    });
    this.olSelect = olSelect;

    // handler to remove coordinates from draw features on selection of remove features
    olSelect.on('select', (event) => {
      // don't process if no features are selected
      if (event.selected.length === 0) {
        return;
      }
      // find remove AlloyDrawFeature for selected OLFeature
      const selectedFeature = this.removeLayer.getFeatureById(
        FeatureUtils.getFeatureIdFromOlFeature(event.selected[0]),
      );
      if (!selectedFeature) {
        throw new AlloyMapError(1582282699, 'selected feature must not be null');
      }
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
        if (!flatCoords.some((c) => GeometryUtils.isCoordinateEqual(c, coord))) {
          continue;
        }

        // delete selected point from remove layer
        this.removeLayer.removeFeature(selectedFeature);
        olSelect.getFeatures().remove(selectedFeature.olFeature);

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
        // if not removing simple feature then remove coordinate and see if whole feature needs to
        // be removed
        if (!featureRemove) {
          GeometryUtils.removeCoordinate(sourceGeometry, coord);
          if (
            (sourceGeometry instanceof OLMultiPoint ||
              sourceGeometry instanceof OLMultiLineString ||
              sourceGeometry instanceof OLMultiPolygon) &&
            sourceGeometry.getCoordinates().length === 0
          ) {
            featureRemove = true;
          } else if (
            sourceGeometry instanceof OLGeometryCollection &&
            sourceGeometry.getGeometries().length === 0
          ) {
            featureRemove = true;
          }
        }
        // remove whole feature
        if (featureRemove) {
          this.drawLayer.removeFeature(sourceFeature);
        }

        // fire change event
        this.dispatcher.dispatch(
          new AlloyDrawEvent(featureRemove ? null : sourceFeature, this.drawLayer),
        );

        // update any styles for the drawn feature
        this.drawLayer.updateStyles(featureRemove ? null : sourceFeature);

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
    this.drawLayer.updateStyles(feature);
  }

  /**
   * processes draw layer features and creates point features for remove layer from all coordinates
   */
  private setRemoveInteractionFeatures() {
    // clears remove layer
    this.removeLayer.clearFeatures();
    // convert all draw layer features to points
    flatten(
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
