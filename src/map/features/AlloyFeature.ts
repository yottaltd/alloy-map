/* eslint-disable max-len */
import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyFeatureType } from '@/map/features/AlloyFeatureType';
import { AlloyCacheDependency } from '@/map/styles/cache/AlloyCacheDependency';
import { AlloyGeometryCollectionFunctions } from '@/map/styles/utils/geometry-functions/AlloyGeometryCollectionFunctions';
import { AlloyMultiPolygonFunctions } from '@/map/styles/utils/geometry-functions/AlloyMultiPolygonFunctions';
import { AlloyPolygonFunctions } from '@/map/styles/utils/geometry-functions/AlloyPolygonFunctions';
import { Geometry } from 'geojson';
import OLFeature from 'ol/Feature';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPolygon from 'ol/geom/Polygon';

/* eslint-enable max-len */

/**
 * an alloy feature is used to display objects on the map
 */
export abstract class AlloyFeature {
  /**
   * the features type
   */
  abstract readonly type: AlloyFeatureType;

  /**
   * the id of the feature, this is meaningless for 3rd parties using this library except for
   * directly referencing the feature on the map, it should not be relied upon to be, for instance,
   * an item id
   */
  abstract readonly id: string;

  /**
   * whether the feature allows selection
   * @ignore
   * @internal
   */
  abstract readonly allowsSelection: boolean;

  /**
   * whether the feature allows hover interaction
   * @ignore
   * @internal
   */
  abstract readonly allowsHover: boolean;

  /**
   * the underlying openlayers geojson feature
   * @ignore
   * @internal
   */
  abstract readonly olFeature: OLFeature;

  /**
   * the layer that loaded the feature
   * @ignore
   * @internal
   */
  abstract readonly originatingLayerId?: string;

  /**
   * cache dependencies used to invalidate feature styles
   * @ignore
   * @internal
   */
  readonly cacheDependencies: Set<AlloyCacheDependency>;

  public constructor() {
    this.cacheDependencies = new Set();
  }

  /**
   * function to call when the feature is selected by user interaction, this can provide custom
   * processing for a feature e.g. cluster features zoom in. **This function should not be called
   * when a feature is programatically selected**
   * @param map the map instance the feature is a member of
   * @ignore
   * @internal
   */
  abstract onSelectionInteraction?(map: AlloyMap): void;

  /**
   * sets visibility of alloy feature
   * @param visible whether feature is visible
   */
  abstract setVisible(visible: boolean): void;

  /**
   * sets geometry of alloy feature
   * @param geometry new geometry to set for this feature or null
   */
  abstract setGeometry(geometry: Geometry | null): void;

  /**
   * Clears style caches associated with feature
   * @internal
   * @ignore
   */
  public clearCache(): void {
    const geometry = this.olFeature.getGeometry();

    // check if we need to clear any caches
    let shouldClearStyles = false;
    if (geometry instanceof OLPolygon) {
      AlloyPolygonFunctions.removeFromPolygonCache(geometry);
      shouldClearStyles = true;
    } else if (geometry instanceof OLMultiPolygon) {
      AlloyMultiPolygonFunctions.removeFromPolygonCache(geometry);
      shouldClearStyles = true;
    } else if (geometry instanceof OLGeometryCollection) {
      AlloyGeometryCollectionFunctions.removeFromPolygonCache(geometry);
      shouldClearStyles = true;
    }

    if (shouldClearStyles) {
      this.cacheDependencies.forEach((value: AlloyCacheDependency) => value.dispose());
      this.cacheDependencies.clear();
    }
    this.olFeature.changed();
  }
}
