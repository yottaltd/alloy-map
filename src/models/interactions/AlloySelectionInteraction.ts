import OLFeature from 'ol/Feature';
import OLMapBrowserPointerEvent from 'ol/MapBrowserPointerEvent';
import { SimpleEventDispatcher } from 'ste-simple-events';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyMapError } from '../core/AlloyMapError';
import { AlloySelectionMode } from '../core/AlloySelectionMode';
import { FeatureSelectionChangeEvent } from '../events/FeatureSelectionChangeEvent';
import { FeatureSelectionChangeEventHandler } from '../events/FeatureSelectionChangeEventHandler';
import { FeaturesUnderSelectionEvent } from '../events/FeaturesUnderSelectionEvent';
import { FeaturesUnderSelectionEventHandler } from '../events/FeaturesUnderSelectionEventHandler';
import { AlloyFeature } from '../features/AlloyFeature';

/**
 * adds selection interaction to an alloy map
 * @ignore
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
   * creates a new instance
   * @param map the map to add selection interaction to
   */
  constructor(map: AlloyMap) {
    this.map = map;

    // listen for click events
    this.map.olMap.on('click', (e) =>
      this.onClick(e as OLMapBrowserPointerEvent /* this is untyped in ol */),
    );
  }

  /**
   * gets the current selection mode
   */
  public get selectionMode(): AlloySelectionMode {
    return this.currentSelectionMode;
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

    // check if the feature is already selected
    const currentSelection = this.map.selectionLayer.features;
    if (currentSelection.size === 1 && currentSelection.has(feature.id)) {
      return; // no-op
    }

    // clear and add the feature
    this.map.selectionLayer.clearFeatures();
    this.map.selectionLayer.addFeature(feature);

    // we know we need to trigger the event if we got this far
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
        return;
      }
    }

    // clear and add the features
    this.map.selectionLayer.clearFeatures();
    this.map.selectionLayer.addFeatures(features);

    // we know we need to trigger the event if we got this far
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
    const modified = this.map.selectionLayer.addFeature(feature);

    // only trigger event on modified
    if (modified) {
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
      return;
    }

    // only attempt to add the features and track modified
    const modified = this.map.selectionLayer.addFeatures(features);

    // only trigger event on modified
    if (modified) {
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
      return;
    }

    // get the layer information to work with
    const features: AlloyFeature[] = this.getFeaturesForPixel(event.pixel);

    // if no features were found, deselect
    if (features.length === 0) {
      this.setSelectedFeatures([]);
      return;
    }

    // TODO possible z-index issue
    const firstFeature = features[0];

    // if we don't allow selection, deselect and run any custom processing
    if (!firstFeature.allowsSelection) {
      this.setSelectedFeatures([]);
      if (firstFeature.onSelectionInteraction) {
        firstFeature.onSelectionInteraction(this.map);
      }
      return;
    }

    // if it is already the only thing selected then deselect
    const featureAlreadySelected: boolean = !!this.map.selectionLayer.getFeatureById(
      firstFeature.id,
    );
    if (this.map.selectionLayer.features.size === 1 && featureAlreadySelected) {
      this.setSelectedFeatures([]);
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
          this.setSelectedFeatures(Array.from(selectedFeatures.values()));
          // we are specifically not calling "onFeatureClicked" when deselecting, think its right?
        } else {
          this.selectFeature(firstFeature);
          if (firstFeature.onSelectionInteraction) {
            firstFeature.onSelectionInteraction(this.map);
          }
        }
      } else {
        this.setSelectedFeature(firstFeature);
        if (firstFeature.onSelectionInteraction) {
          firstFeature.onSelectionInteraction(this.map);
        }
      }
    } else {
      // single selection mode
      this.setSelectedFeature(firstFeature);
      if (firstFeature.onSelectionInteraction) {
        firstFeature.onSelectionInteraction(this.map);
      }
    }

    // if we had multiple potential features then suggest alternatives
    if (features.length > 1) {
      const featuresStack = new Map<string, AlloyFeature>();
      features.slice(1).forEach((f) => featuresStack.set(f.id, f));
      this.onFeaturesUnderSelection.dispatch(
        new FeaturesUnderSelectionEvent(firstFeature, featuresStack),
      );
    }
  }

  /**
   * finds all the features in managed layers (excluding hover etc.) under the provided pixel coord
   * @param pixel the pixel coordinate to find features under
   */
  private getFeaturesForPixel(pixel: [number, number]) {
    const layers = this.map.layers;
    // map the openlayers layers one to one with ours so indices are the same
    const olLayers = this.map.layers.map((l) => l.olLayer);
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
          // find the open layers layer index in our layers (reverse mapping)
          const index = olLayers.indexOf(olLayer);
          if (index >= 0) {
            // get the alloy layer and find the feature by id
            const feature = layers[index].getFeatureById(
              FeatureUtils.getFeatureIdFromOlFeature(olFeature),
            );
            // if we have a feature add it to the array
            if (feature) {
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
   */
  private dispatchFeatureSelectionChangeEvent() {
    this.onFeatureSelectionChange.dispatch(
      new FeatureSelectionChangeEvent(this.map.selectionLayer.features),
    );
  }
}
