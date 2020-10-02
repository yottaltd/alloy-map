import flatten from 'lodash.flatten';
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
  private enabled = true;

  /**
   * creates a new instance
   * @param map the map to add selection interaction to
   * @ignore
   * @internal
   */
  constructor(map: AlloyMap) {
    this.map = map;

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
   * @param userEvent whether the selection was triggered by a user event
   */
  public deselectFeature(feature: AlloyFeature, userEvent: boolean): void {
    if (!feature.allowsSelection) {
      throw new AlloyMapError(1556804618, 'feature is not selectable');
    }

    // keep copy of old features (already a new map instance)
    const oldFeatures = this.map.selectionLayer.features;

    // only attempt to remove the feature and track modified
    const modified = this.map.selectionLayer.removeFeature(feature);

    // only trigger event on modified
    if (modified) {
      this.dispatchFeatureSelectionChangeEvent(oldFeatures, userEvent);
    }
  }

  /**
   * sets the current selection mode and cleans up any state
   * @param mode the mode to set
   */
  public setSelectionMode(mode: AlloySelectionMode): void {
    // remove or trim selection based on certain modes
    if (mode === AlloySelectionMode.Off) {
      this.setSelectedFeatures([], false);
    } else if (mode === AlloySelectionMode.Single) {
      this.setSelectedFeatures(Array.from(this.map.selectedFeatures.values()).slice(0, 1), false);
    }
    this.currentSelectionMode = mode;
  }

  /**
   * sets the currently selected feature, this will remove any existing selected feature(s) and
   * trigger the `FeatureSelectionChangeEvent` if selected features were modified.
   * @param feature the feature to select
   * @param userEvent whether the selection was triggered by a user event
   */
  public setSelectedFeature(feature: AlloyFeature, userEvent: boolean): void {
    if (
      this.currentSelectionMode !== AlloySelectionMode.Multi &&
      this.currentSelectionMode !== AlloySelectionMode.Single &&
      this.currentSelectionMode !== AlloySelectionMode.Toggle
    ) {
      throw new AlloyMapError(
        1554032198,
        'selection mode is not Multi, Single or Toggle, features cannot be selected',
      );
    }
    if (!feature.allowsSelection) {
      throw new AlloyMapError(1554049485, 'feature is not selectable');
    }

    // check if the feature is already selected
    const oldSelection = this.map.selectionLayer.features;
    if (oldSelection.size === 1 && oldSelection.has(feature.id)) {
      return; // no-op
    }

    // clear and add the feature
    this.map.selectionLayer.clearFeatures();
    this.map.selectionLayer.addFeature(feature);

    // we know we need to trigger the event if we got this far
    this.dispatchFeatureSelectionChangeEvent(oldSelection, userEvent);
  }

  /**
   * sets the currently selected features, this will remove any existing selected feature(s) and
   * trigger the `FeatureSelectionChangeEvent` if selected features were modified.
   * @param features the features to select, passing an empty array will deselect all features
   * @param userEvent whether the selection was triggered by a user event
   */
  public setSelectedFeatures(features: AlloyFeature[], userEvent: boolean): void {
    if (
      this.currentSelectionMode !== AlloySelectionMode.Multi &&
      this.currentSelectionMode !== AlloySelectionMode.Single &&
      this.currentSelectionMode !== AlloySelectionMode.Toggle
    ) {
      throw new AlloyMapError(
        1554032187,
        'selection mode is not Multi, Single or Toggle, features cannot be selected',
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

    // check if the features are already selected
    const oldSelection = this.map.selectionLayer.features;
    if (oldSelection.size === features.length) {
      // iterate through each provided feature and check if it exists in the current selection
      let hasDifferentFeatures = false;
      for (let i = 0, s = features.length; i < s; i++) {
        if (!oldSelection.has(features[i].id)) {
          hasDifferentFeatures = true;
          break;
        }
      }

      // if its the same then no-op
      if (!hasDifferentFeatures) {
        return;
      }
    }

    // clear and add the features
    this.map.selectionLayer.clearFeatures();
    this.map.selectionLayer.addFeatures(features);

    // we know we need to trigger the event if we got this far
    this.dispatchFeatureSelectionChangeEvent(oldSelection, userEvent);
  }

  /**
   * selects a feature in addition to the already selected features, this will retain any existing
   * selected feature(s) and trigger the `FeatureSelectionChangeEvent` if selected features were
   * modified.
   * @param feature the feature to select
   * @param userEvent whether the selection was triggered by a user event
   */
  public selectFeature(feature: AlloyFeature, userEvent: boolean): void {
    if (
      this.currentSelectionMode !== AlloySelectionMode.Multi &&
      this.currentSelectionMode !== AlloySelectionMode.Single &&
      this.currentSelectionMode !== AlloySelectionMode.Toggle
    ) {
      throw new AlloyMapError(
        1554032154,
        'selection mode is not Multi, Single or Toggle, features cannot be selected',
      );
    }
    if (!feature.allowsSelection) {
      throw new AlloyMapError(1554049505, 'feature is not selectable');
    }

    // keep copy of old features (already a new map instance)
    const oldFeatures = this.map.selectionLayer.features;

    // only attempt to add the feature and track modified
    const modified = this.map.selectionLayer.addFeature(feature);

    // only trigger event on modified
    if (modified) {
      this.dispatchFeatureSelectionChangeEvent(oldFeatures, userEvent);
    }
  }

  /**
   * selects features in addition to the already selected features, this will retain any existing
   * selected feature(s) and trigger the `FeatureSelectionChangeEvent` if selected features were
   * modified.
   * @param features the features to select
   * @param userEvent whether the selection was triggered by a user event
   */
  public selectFeatures(features: AlloyFeature[], userEvent: boolean): void {
    if (
      this.currentSelectionMode !== AlloySelectionMode.Multi &&
      this.currentSelectionMode !== AlloySelectionMode.Single &&
      this.currentSelectionMode !== AlloySelectionMode.Toggle
    ) {
      throw new AlloyMapError(
        1554032900,
        'selection mode is not Multi, Single or Toggle, features cannot be selected',
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
      return;
    }

    // keep copy of old features (already a new map instance)
    const oldFeatures = this.map.selectionLayer.features;

    // only attempt to add the features and track modified
    const modified = this.map.selectionLayer.addFeatures(features);

    // only trigger event on modified
    if (modified) {
      this.dispatchFeatureSelectionChangeEvent(oldFeatures, userEvent);
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
      return;
    }

    // get the layer information to work with
    const features: AlloyFeature[] = this.getFeaturesForPixel(event.pixel);

    // if no features were found, deselect
    if (features.length === 0) {
      this.setSelectedFeatures([], true);
      return;
    }

    // TODO possible z-index issue
    const firstFeature = features[0];

    // if we don't allow selection, deselect and run any custom processing
    if (!firstFeature.allowsSelection) {
      this.setSelectedFeatures([], true);
      this.callFeatureOnSelectionInteraction(firstFeature);
      return;
    }

    // if it is already the only thing selected then deselect
    const featureAlreadySelected = !!this.map.selectionLayer.getFeatureById(firstFeature.id);
    if (this.map.selectionLayer.features.size === 1 && featureAlreadySelected) {
      this.setSelectedFeatures([], true);

      // set the hovered feature because we are over it but it doesn't trigger a pointer move
      // and deselecting means we are hovered over it
      this.map.hoverLayer.setHoveredFeature(firstFeature);
      return;
    }

    if (
      this.selectionMode === AlloySelectionMode.Multi ||
      this.selectionMode === AlloySelectionMode.Toggle
    ) {
      // work out if we are shift/ctrl clicking
      const isCtrlOrShiftClicking =
        this.selectionMode === AlloySelectionMode.Toggle ||
        (event.originalEvent instanceof PointerEvent &&
          (event.originalEvent.shiftKey || event.originalEvent.ctrlKey));
      if (isCtrlOrShiftClicking) {
        if (featureAlreadySelected) {
          // if its already selected then we are deselecting the feature, modify the currently
          // selected features map (this is already a new reference via the getter) and set selected
          const selectedFeatures = this.map.selectionLayer.features;
          selectedFeatures.delete(firstFeature.id);

          this.setSelectedFeatures(Array.from(selectedFeatures.values()), true);
          // we are specifically not calling "onFeatureClicked" when deselecting, think its right?

          // set the hovered feature because we are over it but it doesn't trigger a pointer move
          // and deselecting means we are hovered over it
          this.map.hoverLayer.setHoveredFeature(firstFeature);
        } else {
          this.selectFeature(firstFeature, true);
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

  /**
   * helper for onclick function to make selecting a single feature reusable
   * @param feature the feature to select
   */
  private onClickSelectSingleFeature(feature: AlloyFeature) {
    this.setSelectedFeature(feature, true);
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
      feature.onSelectionInteraction(this.map);
    }
  }

  /**
   * finds all the features in managed layers (excluding hover etc.) under the provided pixel coord
   * @param pixel the pixel coordinate to find features under
   */
  private getFeaturesForPixel(pixel: number[]) {
    const layers = Array.from(this.map.layers.values()).concat(this.map.selectionLayer);
    // map the openlayers layers one to one with ours so indices are the same
    const olLayers = flatten(layers.map((l) => l.olLayers));
    // create a set for fast lookup
    const olLayersSet = new Set(olLayers);
    // the features we found when clicking
    const features: AlloyFeature[] = [];

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
            if (feature && (feature.allowsSelection || feature.onSelectionInteraction)) {
              features.push(feature);
            }
          }
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
   * @param oldFeatures the old features that were selected
   * @param userEvent whether the event was trigger from user interaction
   */
  private dispatchFeatureSelectionChangeEvent(
    oldFeatures: Map<string, AlloyFeature>,
    userEvent: boolean,
  ) {
    this.onFeatureSelectionChange.dispatch(
      // features getter already makes a new map instance
      new FeatureSelectionChangeEvent(this.map.selectionLayer.features, oldFeatures, userEvent),
    );
  }
}
