import { Debugger } from 'debug';
import * as _ from 'lodash';
import OLFeature from 'ol/Feature';
import OLMapBrowserPointerEvent from 'ol/MapBrowserPointerEvent';
import { SimpleEventDispatcher } from 'ste-simple-events';
import { AlloyMapError } from '../../error/AlloyMapError';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { AlloyMap } from '../core/AlloyMap';
import { AlloySelectionMode } from '../core/AlloySelectionMode';
import { FeatureSelectionChangeEvent } from '../events/FeatureSelectionChangeEvent';
import { FeatureSelectionChangeEventHandler } from '../events/FeatureSelectionChangeEventHandler';
import { FeaturesUnderSelectionEvent } from '../events/FeaturesUnderSelectionEvent';
import { FeaturesUnderSelectionEventHandler } from '../events/FeaturesUnderSelectionEventHandler';
import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyCoordinate } from '../core/AlloyCoordinate';

/**
 * adds selection interaction to an alloy map
 * @ignore
 * @internal
 */
export class AlloySelectionInteraction {
  /**
   * debugger instance
   * @ignore
   * @internal
   */
  public readonly debugger: Debugger;

  /**
   * the current selection mode
   */
  private currentSelectionMode: AlloySelectionMode = AlloySelectionMode.Multi;

  /**
   * the map to add selection interaction to
   */
  private map: AlloyMap;

  /**
   * event dispatcher for feature selection change events
   */
  private readonly onFeatureSelectionChange = new SimpleEventDispatcher<
    FeatureSelectionChangeEvent
  >();

  /**
   * event dispatcher for features under selection events
   */
  private readonly onFeaturesUnderSelection = new SimpleEventDispatcher<
    FeaturesUnderSelectionEvent
  >();

  /**
   * whether the interaction is enabled or not
   */
  private enabled: boolean = true;

  /**
   * creates a new instance
   * @param map the map to add selection interaction to
   * @ignore
   * @internal
   */
  constructor(map: AlloyMap) {
    this.map = map;

    // set the debugger instance
    this.debugger = this.map.debugger.extend(AlloySelectionInteraction.name);

    // listen for click events
    this.map.olMap.on('click', (e) => {
      if (!this.enabled) {
        return;
      }
      this.onClick(e as OLMapBrowserPointerEvent /* this is untyped in ol */);
    });
  }

  /**
   * whether the map click interaction is processed for selection
   */
  public get isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * gets the current selection mode
   */
  public get selectionMode(): AlloySelectionMode {
    return this.currentSelectionMode;
  }

  /**
   * enables or disables the handling of map click events for selection
   * @param value whether to enable or disable select interaction
   */
  public setEnabled(value: boolean): void {
    this.enabled = value;
  }

  /**
   * deselects a feature, this will retain any other existing selected feature(s)
   * and trigger the `FeatureSelectionChangeEvent` if selected features were modified.
   * @param feature the feature to deselect
   */
  public deselectFeature(feature: AlloyFeature): void {
    if (!feature.allowsSelection) {
      throw new AlloyMapError(1556804618, 'feature is not selectable');
    }

    // only attempt to remove the feature and track modified
    this.debugger('remove feature: ', feature.id);
    const modified = this.map.selectionLayer.removeFeature(feature);

    // only trigger event on modified
    if (modified) {
      this.debugger('layer modified, dispatching selection change event');
      this.dispatchFeatureSelectionChangeEvent();
    }
  }

  /**
   * sets the current selection mode and cleans up any state
   * @param mode the mode to set
   */
  public setSelectionMode(mode: AlloySelectionMode): void {
    // remove or trim selection based on certain modes
    if (mode === AlloySelectionMode.Off) {
      this.setSelectedFeatures([]);
    } else if (mode === AlloySelectionMode.Single) {
      this.setSelectedFeatures(Array.from(this.map.selectedFeatures.values()).slice(0, 1));
    }
    this.currentSelectionMode = mode;
  }

  /**
   * sets the currently selected feature, this will remove any existing selected feature(s) and
   * trigger the `FeatureSelectionChangeEvent` if selected features were modified.
   * @param feature the feature to select
   */
  public setSelectedFeature(feature: AlloyFeature): void {
    if (
      this.currentSelectionMode !== AlloySelectionMode.Multi &&
      this.currentSelectionMode !== AlloySelectionMode.Single
    ) {
      throw new AlloyMapError(
        1554032198,
        'selection mode is not Multi or Single, features cannot be selected',
      );
    }
    if (!feature.allowsSelection) {
      throw new AlloyMapError(1554049485, 'feature is not selectable');
    }

    this.debugger('setting selected feature: %s', feature.id);

    // check if the feature is already selected
    const currentSelection = this.map.selectionLayer.features;
    if (currentSelection.size === 1 && currentSelection.has(feature.id)) {
      this.debugger('feature: %s is already selected', feature.id);
      return; // no-op
    }

    // clear and add the feature
    this.debugger('clearing layer and adding feature: %s', feature.id);
    this.map.selectionLayer.clearFeatures();
    this.map.selectionLayer.addFeature(feature);

    // we know we need to trigger the event if we got this far
    this.debugger('dispatching selection change event');
    this.dispatchFeatureSelectionChangeEvent();
  }

  /**
   * sets the currently selected features, this will remove any existing selected feature(s) and
   * trigger the `FeatureSelectionChangeEvent` if selected features were modified.
   * @param features the features to select, passing an empty array will deselect all features
   */
  public setSelectedFeatures(features: AlloyFeature[]): void {
    if (
      this.currentSelectionMode !== AlloySelectionMode.Multi &&
      this.currentSelectionMode !== AlloySelectionMode.Single
    ) {
      throw new AlloyMapError(
        1554032187,
        'selection mode is not Multi or Single, features cannot be selected',
      );
    }
    if (this.currentSelectionMode === AlloySelectionMode.Single && features.length > 1) {
      throw new AlloyMapError(
        1554035227,
        'selection mode is Single but multiple features were provided for selection',
      );
    }
    if (features.filter((f) => !f.allowsSelection).length > 0) {
      throw new AlloyMapError(1554049544, 'one or more features do not allow selection');
    }

    // behind guard because we are performing operations for a log
    if (this.debugger.enabled) {
      this.debugger('setting %d selected features: %o', features.length, features.map((f) => f.id));
    }

    // check if the features are already selected
    const currentSelection = this.map.selectionLayer.features;
    if (currentSelection.size === features.length) {
      // iterate through each provided feature and check if it exists in the current selection
      let hasDifferentFeatures = false;
      for (let i = 0, s = features.length; i < s; i++) {
        if (!currentSelection.has(features[i].id)) {
          hasDifferentFeatures = true;
          break;
        }
      }

      // if its the same then no-op
      if (!hasDifferentFeatures) {
        // behind guard because we are performing operations for a log
        if (this.debugger.enabled) {
          this.debugger('features are already selected: ', features.map((f) => f.id));
        }
        return;
      }
    }

    // behind guard because we are performing operations for a log
    if (this.debugger.enabled) {
      this.debugger(
        'clearing layer and adding %d features: %s',
        features.length,
        features.map((f) => f.id),
      );
    }
    // clear and add the features
    this.map.selectionLayer.clearFeatures();
    this.map.selectionLayer.addFeatures(features);

    // we know we need to trigger the event if we got this far
    this.debugger('dispatching selection change event');
    this.dispatchFeatureSelectionChangeEvent();
  }

  /**
   * selects a feature in addition to the already selected features, this will retain any existing
   * selected feature(s) and trigger the `FeatureSelectionChangeEvent` if selected features were
   * modified.
   * @param feature the feature to select
   */
  public selectFeature(feature: AlloyFeature): void {
    if (
      this.currentSelectionMode !== AlloySelectionMode.Multi &&
      this.currentSelectionMode !== AlloySelectionMode.Single
    ) {
      throw new AlloyMapError(
        1554032154,
        'selection mode is not Multi or Single, features cannot be selected',
      );
    }
    if (!feature.allowsSelection) {
      throw new AlloyMapError(1554049505, 'feature is not selectable');
    }

    // only attempt to add the feature and track modified
    this.debugger('adding feature: ', feature.id);
    const modified = this.map.selectionLayer.addFeature(feature);

    // only trigger event on modified
    if (modified) {
      this.debugger('layer modified, dispatching selection change event');
      this.dispatchFeatureSelectionChangeEvent();
    }
  }

  /**
   * selects features in addition to the already selected features, this will retain any existing
   * selected feature(s) and trigger the `FeatureSelectionChangeEvent` if selected features were
   * modified.
   * @param features the features to select
   */
  public selectFeatures(features: AlloyFeature[]): void {
    if (
      this.currentSelectionMode !== AlloySelectionMode.Multi &&
      this.currentSelectionMode !== AlloySelectionMode.Single
    ) {
      throw new AlloyMapError(
        1554032900,
        'selection mode is not Multi or Single, features cannot be selected',
      );
    }
    if (this.currentSelectionMode === AlloySelectionMode.Single && features.length > 1) {
      throw new AlloyMapError(
        1554035282,
        'selection mode is Single but multiple features were provided for selection',
      );
    }
    if (features.filter((f) => !f.allowsSelection).length > 0) {
      throw new AlloyMapError(1554049571, 'one or more features do not allow selection');
    }

    // no-op
    if (features.length === 0) {
      this.debugger('selecting 0 features');
      return;
    }

    // behind guard because we are performing operations for a log
    if (this.debugger.enabled) {
      this.debugger('adding %d features: %s', features.length, features.map((f) => f.id));
    }
    // only attempt to add the features and track modified
    const modified = this.map.selectionLayer.addFeatures(features);

    // only trigger event on modified
    if (modified) {
      this.debugger('layer modified, dispatching selection change event');
      this.dispatchFeatureSelectionChangeEvent();
    }
  }

  /**
   * adds an event handler to listen for the `FeatureSelectionChangeEvent` event
   * @param handler the handler to call when the event is raised
   */
  public addFeatureSelectionChangeListener(handler: FeatureSelectionChangeEventHandler): void {
    this.onFeatureSelectionChange.subscribe(handler);
  }

  /**
   * removes an event handler listening to the `FeatureSelectionChangeEvent` event
   * @param handler the handler to stop listening
   */
  public removeFeatureSelectionChangeListener(handler: FeatureSelectionChangeEventHandler): void {
    this.onFeatureSelectionChange.unsubscribe(handler);
  }

  /**
   * adds an event handler to listen for the `FeaturesUnderSelectionEvent` event
   * @param handler the handler to call when the event is raised
   */
  public addFeaturesUnderSelectionListener(handler: FeaturesUnderSelectionEventHandler): void {
    this.onFeaturesUnderSelection.subscribe(handler);
  }

  /**
   * removes an event handler listening to the `FeaturesUnderSelectionEvent` event
   * @param handler the handler to stop listening
   */
  public removeFeaturesUnderSelectionListener(handler: FeaturesUnderSelectionEventHandler): void {
    this.onFeaturesUnderSelection.unsubscribe(handler);
  }

  /**
   * called when the click event is triggered
   * @param event the click event
   */
  private onClick(event: OLMapBrowserPointerEvent): void {
    // short circuit when dragging or selection is off
    if (event.dragging || this.currentSelectionMode === AlloySelectionMode.Off) {
      this.debugger('pointer dragging or selection mode is Off');
      return;
    }

    // get the layer information to work with
    const features: AlloyFeature[] = this.getFeaturesForPixel(event.pixel);

    // if no features were found, deselect
    if (features.length === 0) {
      this.debugger('no features found for pixel: %o', event.pixel);
      this.setSelectedFeatures([]);
      return;
    }

    // behind guard because we are performing operations for a log
    if (this.debugger.enabled) {
      this.debugger(
        'found %d features: %o at pixel: %o',
        features.length,
        features.map((f) => f.id),
        event.pixel,
      );
    }

    // TODO possible z-index issue
    const firstFeature = features[0];
    this.debugger('first feature: %s for pixel: %o', firstFeature.id, event.pixel);

    // if we don't allow selection, deselect and run any custom processing
    if (!firstFeature.allowsSelection) {
      this.debugger('first feature: %s does not allow selection', firstFeature.id);
      this.setSelectedFeatures([]);
      this.callFeatureOnSelectionInteraction(firstFeature);
      return;
    }

    // if it is already the only thing selected then deselect
    const featureAlreadySelected: boolean = !!this.map.selectionLayer.getFeatureById(
      firstFeature.id,
    );
    if (this.map.selectionLayer.features.size === 1 && featureAlreadySelected) {
      this.debugger(
        'first feature: %s is the only feature selected, deselecting...',
        firstFeature.id,
      );
      this.setSelectedFeatures([]);

      // set the hovered feature because we are over it but it doesn't trigger a pointer move
      // and deselecting means we are hovered over it
      this.map.hoverLayer.setHoveredFeature(firstFeature);
      return;
    }

    if (this.selectionMode === AlloySelectionMode.Multi) {
      // work out if we are shift/ctrl clicking
      const isCtrlOrShiftClicking =
        event.originalEvent instanceof PointerEvent &&
        (event.originalEvent.shiftKey || event.originalEvent.ctrlKey);
      if (isCtrlOrShiftClicking) {
        if (featureAlreadySelected) {
          // if its already selected then we are deselecting the feature, modify the currently
          // selected features map (this is already a new reference via the getter) and set selected
          const selectedFeatures = this.map.selectionLayer.features;
          selectedFeatures.delete(firstFeature.id);

          // behind guard because we are performing operations for a log
          if (this.debugger.enabled) {
            this.debugger(
              'first feature: %s was shift/ctrl clicked and already selected, ' +
                'removing from selection.\nprevious: %o\nnew: %o',
              firstFeature.id,
              Array.from(this.map.selectionLayer.features.keys()),
              Array.from(selectedFeatures.keys()),
            );
          }
          this.setSelectedFeatures(Array.from(selectedFeatures.values()));
          // we are specifically not calling "onFeatureClicked" when deselecting, think its right?

          // set the hovered feature because we are over it but it doesn't trigger a pointer move
          // and deselecting means we are hovered over it
          this.map.hoverLayer.setHoveredFeature(firstFeature);
        } else {
          this.debugger(
            'first feature: %s was shift/ctrl clicked and not already selected, selecting',
            firstFeature.id,
          );
          this.selectFeature(firstFeature);
          this.callFeatureOnSelectionInteraction(firstFeature);

          // unset the hovered feature because we are over it but it doesn't trigger a pointer move
          this.map.hoverLayer.setHoveredFeature(null);
        }
      } else {
        this.onClickSelectSingleFeature(firstFeature);
      }
    } else {
      this.onClickSelectSingleFeature(firstFeature);
    }

    // if we had multiple potential features then suggest alternatives that can be selected
    if (features.length > 1) {
      const featuresStack = new Map<string, AlloyFeature>();
      features
        .slice(1)
        .filter((f) => f.allowsSelection)
        .forEach((f) => featuresStack.set(f.id, f));
      this.onFeaturesUnderSelection.dispatch(
        new FeaturesUnderSelectionEvent(
          firstFeature,
          featuresStack,
          AlloyCoordinate.fromMapCoordinate(event.coordinate),
        ),
      );
    }
  }

  /**
   * helper for onclick function to make selecting a single feature reusable
   * @param feature the feature to select
   */
  private onClickSelectSingleFeature(feature: AlloyFeature) {
    this.debugger('first feature: %s was clicked and not already selected, selecting', feature.id);
    this.setSelectedFeature(feature);
    this.callFeatureOnSelectionInteraction(feature);

    // clear the hovered feature, because this doesn't involve a pointer move and it will still have
    // a hover style
    this.map.hoverLayer.setHoveredFeature(null);
  }

  /**
   * helper to call the selection interaction on a feature (if it has one)
   * @param feature the feature to call the function for
   */
  private callFeatureOnSelectionInteraction(feature: AlloyFeature) {
    if (feature.onSelectionInteraction) {
      this.debugger('first feature: %s has interaction function, calling...', feature.id);
      feature.onSelectionInteraction(this.map);
    }
  }

  /**
   * finds all the features in managed layers (excluding hover etc.) under the provided pixel coord
   * @param pixel the pixel coordinate to find features under
   */
  private getFeaturesForPixel(pixel: [number, number]) {
    const layers = Array.from(this.map.layers.values());
    // map the openlayers layers one to one with ours so indices are the same
    const olLayers = _.flatten(layers.map((l) => l.olLayers));
    // create a set for fast lookup
    const olLayersSet = new Set(olLayers);
    // the features we found when clicking
    const features: AlloyFeature[] = [];

    // behind guard because we are performing operations for a log
    if (this.debugger.enabled) {
      this.debugger('getting features for pixel: %o in layers: %o', pixel, layers.keys());
    }

    // iterate through each feature at the map pixel
    this.map.olMap.forEachFeatureAtPixel(
      pixel,
      (olFeature, olLayer) => {
        // potentially a render feature
        if (olFeature instanceof OLFeature) {
          // find our layer index for the openlayers layers
          const index = layers.findIndex((layer) => layer.olLayers.indexOf(olLayer) !== -1);
          if (index >= 0) {
            // get the alloy layer and find the feature by id
            const feature = layers[index].getFeatureById(
              FeatureUtils.getFeatureIdFromOlFeature(olFeature),
            );
            // if we have a feature add it to the array
            if (feature) {
              features.push(feature);
            } else {
              // behind guard because we are performing operations for a log
              if (this.debugger.enabled) {
                this.debugger(
                  'ol feature found but no alloy feature: %o for layer: %o, ignoring...',
                  olFeature,
                  layers[index],
                );
              }
            }
          } else {
            this.debugger('ol feature found but no matching layer: %o, ignoring...', olFeature);
          }
        } else {
          this.debugger(
            'found ol render feature: %o (should not be possible) ignoring...',
            olFeature,
          );
        }
      },
      {
        // filters the layers to iterate though, we only want alloy layers e.g. not hover layers
        layerFilter: (l) => olLayersSet.has(l),
      },
    );

    return features;
  }

  /**
   * dispatches the feature selection change event with latest selected features
   */
  private dispatchFeatureSelectionChangeEvent() {
    this.onFeatureSelectionChange.dispatch(
      new FeatureSelectionChangeEvent(this.map.selectionLayer.features),
    );
  }
}
