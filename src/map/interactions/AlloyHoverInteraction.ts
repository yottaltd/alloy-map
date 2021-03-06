import { AlloyHoverMode } from '@/map/core/AlloyHoverMode';
import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyCustomFeatureBase } from '@/map/features/AlloyCustomFeatureBase';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyLayer } from '@/map/layers/AlloyLayer';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { FeatureUtils } from '@/utils/FeatureUtils';
import { Debugger } from 'debug';
import * as _ from 'lodash';
import OLFeature from 'ol/Feature';
import OLLayer from 'ol/layer/Layer';
import OLMapBrowserPointerEvent from 'ol/MapBrowserPointerEvent';

/**
 * the number of milliseconds to throttle the pointer move event by
 * @ignore
 */
const POINTER_MOVE_THROTTLE = 50;

/**
 * adds hover interaction to an alloy map
 * @ignore
 * @internal
 */
export class AlloyHoverInteraction {
  /**
   * debugger instance
   * @ignore
   * @internal
   */
  public readonly debugger: Debugger;

  /**
   * the current hover mode
   */
  private currentHoverMode: AlloyHoverMode = AlloyHoverMode.On;

  /**
   * the map to add hover interaction to
   */
  private map: AlloyMap;

  /**
   * the pointer move payload which is cached because its used on every throttled pointer movement
   */
  private pointerMovePayload: PointerMoveLayerPayload = {
    layers: [],
    olLayers: [],
    olLayersSet: new Set([]),
  };

  /**
   * creates a new instance
   * @param map the map to add hover interaction to
   * @ignore
   * @internal
   */
  constructor(map: AlloyMap) {
    this.map = map;

    // set the debugger instance
    this.debugger = this.map.debugger.extend(AlloyHoverInteraction.name);

    // recalculate the payload on initialisation
    this.recalculatePointerMovePayload();

    // listen for pointer move events, these can happen very frequently so we debounce the
    // processing done for these events
    this.map.olMap.on(
      'pointermove',
      _.debounce((e) => this.onPointerMove(e as OLMapBrowserPointerEvent), POINTER_MOVE_THROTTLE, {
        // call the function immediately
        leading: true,
        // always call it after the events stop
        trailing: true,
        // the max amount of time between calling e.g. user keeps moving the mouse for 1s
        maxWait: POINTER_MOVE_THROTTLE,
      }),
    );

    // listen for layer changes to cache computed data
    this.map.addLayersChangeListener((e) => {
      // recalculate the pointer move payload when layers change
      this.recalculatePointerMovePayload();
    });
  }

  /**
   * gets the current hover mode
   */
  public get hoverMode(): AlloyHoverMode {
    return this.currentHoverMode;
  }

  /**
   * sets the current hover mode and cleans up any state
   * @param mode the mode to set
   */
  public setHoverMode(mode: AlloyHoverMode): void {
    // remove or trim selection based on certain modes
    if (mode === AlloyHoverMode.Off) {
      this.map.hoverLayer.setHoveredFeature(null);
    }
    this.currentHoverMode = mode;
  }

  /**
   * called when the pointer event is triggered
   * @param event the pointer move event
   */
  private onPointerMove(event: OLMapBrowserPointerEvent): void {
    // short circuit when dragging or hover is off
    if (event.dragging || this.currentHoverMode === AlloyHoverMode.Off) {
      this.map.hoverLayer.setHoveredFeature(null);
      return;
    }

    // reference to the pointer move payload
    const payload = this.pointerMovePayload;

    // the features we found when hovering
    const features: AlloyFeature[] = [];

    // iterate through each feature at the map pixel
    this.map.olMap.forEachFeatureAtPixel(
      event.pixel,
      (olFeature, olLayer): boolean | undefined => {
        // potentially a render feature
        if (olFeature instanceof OLFeature) {
          // find our layer index for the openlayers layers
          const index = payload.layers.findIndex((layer) => layer.olLayers.indexOf(olLayer) !== -1);
          if (index >= 0) {
            // get the alloy layer and find the feature by id
            const feature = payload.layers[index].getFeatureById(
              FeatureUtils.getFeatureIdFromOlFeature(olFeature),
            );

            // if we have a feature and it allows selection add it to the array
            if (feature && feature.allowsHover) {
              features.push(feature);
              return true;
            }
          }
        }

        return undefined;
      },
      {
        // filters the layers to iterate though, we only want alloy layers e.g. not hover layers
        layerFilter: (l) => payload.olLayersSet.has(l),
      },
    );

    // get the topmost feature
    // TODO possible z-index issue
    const topMostFeature: AlloyFeature | null = features.length > 0 ? features[0] : null;
    // check if the top most feature is already selected, if so we don't want to register a hover
    const topMostFeatureSelected =
      !!topMostFeature && this.map.selectionLayer.getFeatureById(topMostFeature.id);

    // update selected or not
    if (topMostFeature) {
      // Special case for custom features with forced state to override any hover interaction
      const customFeatureForceSelected =
        topMostFeature instanceof AlloyCustomFeatureBase &&
        topMostFeature.properties.forceState === AlloyStyleBuilderBuildState.Selected;

      // hovered is set based on whether the feature being "hovered" is already selected, we still
      // want a cursor indicator but we don't want another halo etc.
      this.map.hoverLayer.setHoveredFeature(
        topMostFeatureSelected || customFeatureForceSelected ? null : topMostFeature,
      );
      // set the cursor to show it has moused over
      (this.map.olMap.getViewport() as HTMLElement).style.cursor = 'pointer';
    } else {
      this.map.hoverLayer.setHoveredFeature(null);
      // set the cursor to default
      (this.map.olMap.getViewport() as HTMLElement).style.cursor = '';
    }
  }

  /**
   * recalculates the payload of data used on pointer movement
   */
  private recalculatePointerMovePayload(): void {
    const layers = Array.from(this.map.layers.values()).concat(this.map.selectionLayer);
    const olLayers = _.flatten(layers.map((l) => l.olLayers));

    // TODO maybe work out the z-index?
    this.pointerMovePayload = {
      layers,
      olLayers,
      olLayersSet: new Set(olLayers),
    };
  }
}

/**
 * interface to hold data for the hover interaction
 * @ignore
 * @internal
 */
interface PointerMoveLayerPayload {
  layers: AlloyLayer[];
  olLayers: OLLayer[];
  olLayersSet: Set<OLLayer>;
}
