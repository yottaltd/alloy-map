/* eslint-disable max-len */

import { AlloyMapError } from '@/error/AlloyMapError';
import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyDrawFeature } from '@/map/features/AlloyDrawFeature';
import { AlloyLayerStyleOpacity } from '@/map/styles/AlloyLayerStyleOpacity';
import { AlloyStyleBuilder } from '@/map/styles/AlloyStyleBuilder';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { AlloyStyleCacheKey } from '@/map/styles/cache/AlloyStyleCacheKey';
import { AlloyStyleCacheKeyBuilder } from '@/map/styles/cache/AlloyStyleCacheKeyBuilder';
import { AlloyBallUtils } from '@/map/styles/utils/AlloyBallUtils';
import { AlloyIconUtils } from '@/map/styles/utils/AlloyIconUtils';
import { AlloyLineUtils } from '@/map/styles/utils/AlloyLineUtils';
import { AlloyPolygonUtils } from '@/map/styles/utils/AlloyPolygonUtils';
import { AlloyScaleUtils } from '@/map/styles/utils/AlloyScaleUtils';
import { AlloyGeometryCollectionFunctions } from '@/map/styles/utils/geometry-functions/AlloyGeometryCollectionFunctions';
import { AlloyGeometryFunctionUtils } from '@/map/styles/utils/geometry-functions/AlloyGeometryFunctionUtils';
import { AlloyLineStringFunctions } from '@/map/styles/utils/geometry-functions/AlloyLineStringFunctions';
import { AlloyMultiLineStringFunctions } from '@/map/styles/utils/geometry-functions/AlloyMultiLineStringFunctions';
import { AlloyMultiPolygonFunctions } from '@/map/styles/utils/geometry-functions/AlloyMultiPolygonFunctions';
import { AlloyPolygonFunctions } from '@/map/styles/utils/geometry-functions/AlloyPolygonFunctions';
import { ColourUtils } from '@/utils/ColourUtils';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLGeometryType from 'ol/geom/GeometryType';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPolygon from 'ol/geom/Polygon';
import OLStyle from 'ol/style/Style';

/* eslint-enable max-len */

/**
 * the icon colour in the balls
 * @ignore
 */
const ICON_COLOUR = '#ffffff';

/**
 * builds styles for draw features, this can be point, line and polygon geometry
 * @ignore
 * @internal
 */
export class AlloyDrawStyleBuilder extends AlloyStyleBuilder<AlloyDrawFeature> {
  /**
   * shame we need a reference to the map :( but its for calculating coord to pixel coord transforms
   */
  private readonly map: AlloyMap;

  /**
   * creates a new instance
   * @param map the map instance for calculations
   * @ignore
   * @internal
   */
  constructor(map: AlloyMap) {
    super();
    this.map = map;
  }

  /**
   * @override
   */
  protected getKey(
    feature: AlloyDrawFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): AlloyStyleCacheKey {
    return AlloyStyleCacheKeyBuilder.create({
      state,
      // scaling is undefined or true then we allow the feature to scale normally, if false it is a
      // fixed max size all the time
      resolution,
      featureId: feature.olFeature.getId(), // each draw feature is unique (expensive)
    });
  }

  /**
   * @override
   */
  protected createStyles(feature: AlloyDrawFeature, resolution: number): OLStyle | OLStyle[] {
    switch (feature.olFeature.getGeometry().getType()) {
      case OLGeometryType.POINT:
        return this.createPointStyles(resolution, feature);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointStyles(resolution, feature);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringStyles(resolution, feature);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringStyles(resolution, feature);
      case OLGeometryType.POLYGON:
        return this.createPolygonStyles(resolution, feature);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonStyles(resolution, feature);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionStyles(resolution, feature);
      default:
        throw new AlloyMapError(1556272877, 'unsupported geometry type');
    }
  }

  /**
   * @override
   */
  protected createHoverStyles(feature: AlloyDrawFeature, resolution: number): OLStyle | OLStyle[] {
    switch (feature.olFeature.getGeometry().getType()) {
      case OLGeometryType.POINT:
        return this.createPointHoverStyles(resolution, feature);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointHoverStyles(resolution, feature);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringHoverStyles(resolution, feature);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringHoverStyles(resolution, feature);
      case OLGeometryType.POLYGON:
        return this.createPolygonHoverStyles(resolution, feature);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonHoverStyles(resolution, feature);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionHoverStyles(resolution, feature);
      default:
        throw new AlloyMapError(1556272885, 'unsupported geometry type');
    }
  }

  /**
   * @override
   */
  protected createSelectedStyles(
    feature: AlloyDrawFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    switch (feature.olFeature.getGeometry().getType()) {
      case OLGeometryType.POINT:
        return this.createPointSelectedStyles(resolution, feature);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointSelectedStyles(resolution, feature);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringSelectedStyles(resolution, feature);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringSelectedStyles(resolution, feature);
      case OLGeometryType.POLYGON:
        return this.createPolygonSelectedStyles(resolution, feature);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonSelectedStyles(resolution, feature);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionSelectedStyles(resolution, feature);
      default:
        throw new AlloyMapError(1556272894, 'unsupported geometry type');
    }
  }

  private createGeometryCollectionStyles(resolution: number, feature: AlloyDrawFeature): OLStyle[] {
    return [
      ...this.createPointStyles(resolution, feature, true),
      ...this.createMultiPointStyles(resolution, feature, true),
      ...this.createLineStringStyles(resolution, feature, true),
      ...this.createMultiLineStringStyles(resolution, feature, true),
      ...this.createPolygonStyles(resolution, feature, true),
      ...this.createMultiPolygonStyles(resolution, feature, true),
    ];
  }

  private createPointStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    ];
  }

  private createMultiPointStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    ];
  }

  private createLineStringStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    return [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution),
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
    ];
  }

  private createMultiLineStringStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    return [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution),
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
    ];
  }

  private createPolygonStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const semiTransparentColour = ColourUtils.semiTransparent(feature.properties.colour);

    const geometry = feature.olFeature.getGeometry();

    // we need to calculate the icon size on a feature by feature basis
    let largestPolygon: OLPolygon | null;
    if (processGeometryCollection) {
      largestPolygon = AlloyGeometryCollectionFunctions.calculateLargestPolygon(
        geometry as OLGeometryCollection,
      );
    } else {
      largestPolygon = feature.olFeature.getGeometry() as OLPolygon;
    }

    if (!largestPolygon) {
      return [];
    }

    // calculate the mid point of the largest polygon, this is cached
    const midPoint = AlloyPolygonFunctions.convertGeometryToMidPoint(largestPolygon);

    // calculate the mid point of the multi geometries largest polygon, this is cached
    let iconSize = AlloyPolygonFunctions.calculateMidPointSize(
      largestPolygon,
      resolution,
      this.map.olMap,
    );

    // clamp the icon size to a max
    iconSize = Math.min(iconSize, AlloyScaleUtils.POINT_RADIUS_MAX * 2);

    return [
      AlloyPolygonUtils.createPolygonStyle(
        semiTransparentColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createMultiPolygonStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const semiTransparentColour = ColourUtils.semiTransparent(feature.properties.colour);

    const geometry = feature.olFeature.getGeometry();

    // we need to calculate the icon size on a feature by feature basis
    let largestPolygon: OLPolygon | null;
    if (processGeometryCollection) {
      largestPolygon = AlloyGeometryCollectionFunctions.calculateLargestPolygon(
        geometry as OLGeometryCollection,
      );
    } else {
      largestPolygon = AlloyMultiPolygonFunctions.calculateLargestPolygon(
        geometry as OLMultiPolygon,
      );
    }

    if (!largestPolygon) {
      return [];
    }

    // calculate the mid point of the largest polygon, this is cached
    const midPoint = AlloyPolygonFunctions.convertGeometryToMidPoint(largestPolygon);

    // calculate the mid point of the multi geometries largest polygon, this is cached
    let iconSize = AlloyPolygonFunctions.calculateMidPointSize(
      largestPolygon,
      resolution,
      this.map.olMap,
    );

    // clamp the icon size to a max
    iconSize = Math.min(iconSize, AlloyScaleUtils.POINT_RADIUS_MAX * 2);

    return [
      AlloyPolygonUtils.createPolygonStyle(
        semiTransparentColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createGeometryCollectionHoverStyles(
    resolution: number,
    feature: AlloyDrawFeature,
  ): OLStyle[] {
    return [
      ...this.createPointHoverStyles(resolution, feature, true),
      ...this.createMultiPointHoverStyles(resolution, feature, true),
      ...this.createLineStringHoverStyles(resolution, feature, true),
      ...this.createMultiLineStringHoverStyles(resolution, feature, true),
      ...this.createPolygonHoverStyles(resolution, feature, true),
      ...this.createMultiPolygonHoverStyles(resolution, feature, true),
    ];
  }

  private createPointHoverStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);
    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        hoverColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        hoverColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    ];
  }

  private createMultiPointHoverStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);
    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        hoverColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        hoverColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    ];
  }

  private createLineStringHoverStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);

    return [
      AlloyLineUtils.createLineHaloStyle(
        width,
        hoverColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        hoverColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
    ];
  }

  private createMultiLineStringHoverStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);

    return [
      AlloyLineUtils.createLineHaloStyle(
        width,
        hoverColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        hoverColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
    ];
  }

  private createPolygonHoverStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);

    const geometry = feature.olFeature.getGeometry();

    // we need to calculate the icon size on a feature by feature basis
    let largestPolygon: OLPolygon | null;
    if (processGeometryCollection) {
      largestPolygon = AlloyGeometryCollectionFunctions.calculateLargestPolygon(
        geometry as OLGeometryCollection,
      );
    } else {
      largestPolygon = feature.olFeature.getGeometry() as OLPolygon;
    }

    if (!largestPolygon) {
      return [];
    }

    // calculate the mid point of the largest polygon, this is cached
    const midPoint = AlloyPolygonFunctions.convertGeometryToMidPoint(largestPolygon);

    // calculate the mid point of the multi geometries largest polygon, this is cached
    let iconSize = AlloyPolygonFunctions.calculateMidPointSize(
      largestPolygon,
      resolution,
      this.map.olMap,
    );

    // clamp the icon size to a max
    iconSize = Math.min(iconSize, AlloyScaleUtils.POINT_RADIUS_MAX * 2);

    return [
      AlloyPolygonUtils.createPolygonHaloStyle(
        hoverColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        hoverColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createMultiPolygonHoverStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);

    const geometry = feature.olFeature.getGeometry();

    // we need to calculate the icon size on a feature by feature basis
    let largestPolygon: OLPolygon | null;
    if (processGeometryCollection) {
      largestPolygon = AlloyGeometryCollectionFunctions.calculateLargestPolygon(
        geometry as OLGeometryCollection,
      );
    } else {
      largestPolygon = AlloyMultiPolygonFunctions.calculateLargestPolygon(
        geometry as OLMultiPolygon,
      );
    }

    if (!largestPolygon) {
      return [];
    }

    // calculate the mid point of the largest polygon, this is cached
    const midPoint = AlloyPolygonFunctions.convertGeometryToMidPoint(largestPolygon);

    // calculate the mid point of the multi geometries largest polygon, this is cached
    let iconSize = AlloyPolygonFunctions.calculateMidPointSize(
      largestPolygon,
      resolution,
      this.map.olMap,
    );

    // clamp the icon size to a max
    iconSize = Math.min(iconSize, AlloyScaleUtils.POINT_RADIUS_MAX * 2);

    return [
      AlloyPolygonUtils.createPolygonHaloStyle(
        hoverColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        hoverColour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createGeometryCollectionSelectedStyles(
    resolution: number,
    feature: AlloyDrawFeature,
  ): OLStyle[] {
    return [
      ...this.createPointSelectedStyles(resolution, feature, true),
      ...this.createMultiPointSelectedStyles(resolution, feature, true),
      ...this.createLineStringSelectedStyles(resolution, feature, true),
      ...this.createMultiLineStringSelectedStyles(resolution, feature, true),
      ...this.createPolygonSelectedStyles(resolution, feature, true),
      ...this.createMultiPolygonSelectedStyles(resolution, feature, true),
    ];
  }

  private createPointSelectedStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    ];
  }

  private createMultiPointSelectedStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    ];
  }

  private createLineStringSelectedStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);
    const radius = this.getBallRadius(resolution);

    return [
      AlloyLineUtils.createLineHaloStyle(
        width,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              AlloyMultiLineStringFunctions.convertGeometryToMidPoint,
            )
          : AlloyLineStringFunctions.convertFeatureToMidPoint,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              AlloyMultiLineStringFunctions.convertGeometryToMidPoint,
            )
          : AlloyLineStringFunctions.convertFeatureToMidPoint,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              AlloyMultiLineStringFunctions.convertGeometryToMidPoint,
            )
          : AlloyLineStringFunctions.convertFeatureToMidPoint,
      ),
    ];
  }

  private createMultiLineStringSelectedStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);
    const radius = this.getBallRadius(resolution);

    return [
      AlloyLineUtils.createLineHaloStyle(
        width,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              AlloyMultiLineStringFunctions.convertGeometryToMidPoint,
            )
          : AlloyMultiLineStringFunctions.convertFeatureToMidPoint,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              AlloyMultiLineStringFunctions.convertGeometryToMidPoint,
            )
          : AlloyMultiLineStringFunctions.convertFeatureToMidPoint,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              AlloyMultiLineStringFunctions.convertGeometryToMidPoint,
            )
          : AlloyMultiLineStringFunctions.convertFeatureToMidPoint,
      ),
    ];
  }

  private createPolygonSelectedStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const geometry = feature.olFeature.getGeometry();

    // we need to calculate the icon size on a feature by feature basis
    let largestPolygon: OLPolygon | null;
    if (processGeometryCollection) {
      largestPolygon = AlloyGeometryCollectionFunctions.calculateLargestPolygon(
        geometry as OLGeometryCollection,
      );
    } else {
      largestPolygon = feature.olFeature.getGeometry() as OLPolygon;
    }

    if (!largestPolygon) {
      return [];
    }

    // calculate the mid point of the largest polygon, this is cached
    const midPoint = AlloyPolygonFunctions.convertGeometryToMidPoint(largestPolygon);

    // calculate the mid point of the multi geometries largest polygon, this is cached
    let iconSize = AlloyPolygonFunctions.calculateMidPointSize(
      largestPolygon,
      resolution,
      this.map.olMap,
    );

    // clamp the icon size to a max
    iconSize = Math.min(iconSize, AlloyScaleUtils.POINT_RADIUS_MAX * 2);

    return [
      AlloyPolygonUtils.createPolygonHaloStyle(
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createMultiPolygonSelectedStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const geometry = feature.olFeature.getGeometry();

    // we need to calculate the icon size on a feature by feature basis
    let largestPolygon: OLPolygon | null;
    if (processGeometryCollection) {
      largestPolygon = AlloyGeometryCollectionFunctions.calculateLargestPolygon(
        geometry as OLGeometryCollection,
      );
    } else {
      largestPolygon = AlloyMultiPolygonFunctions.calculateLargestPolygon(
        geometry as OLMultiPolygon,
      );
    }

    if (!largestPolygon) {
      return [];
    }

    // calculate the mid point of the largest polygon, this is cached
    const midPoint = AlloyPolygonFunctions.convertGeometryToMidPoint(largestPolygon);

    // calculate the mid point of the multi geometries largest polygon, this is cached
    let iconSize = AlloyPolygonFunctions.calculateMidPointSize(
      largestPolygon,
      resolution,
      this.map.olMap,
    );

    // clamp the icon size to a max
    iconSize = Math.min(iconSize, AlloyScaleUtils.POINT_RADIUS_MAX * 2);

    return [
      AlloyPolygonUtils.createPolygonHaloStyle(
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLayerStyleOpacity.Opaque,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  /**
   * calculates the size of a ball on screen given the resolution
   * @param resolution the current resolution
   * @param scale whether to scale the radius based on resolution or not
   */
  private getBallRadius(resolution: number, scale?: boolean): number {
    if (scale === false) {
      return AlloyScaleUtils.POINT_RADIUS_MAX;
    }

    return (
      AlloyScaleUtils.POINT_RADIUS_MAX * AlloyScaleUtils.getScaleMultiplierForResolution(resolution)
    );
  }

  /**
   * calculates the line width on screen given the resolution
   * @param resolution the current resolution
   * @param scale whether to scale the width based on resolution or not
   */
  private getLineWidth(resolution: number, scale?: boolean): number {
    if (scale === false) {
      return AlloyScaleUtils.LINE_WIDTH_MAX;
    }

    return (
      AlloyScaleUtils.LINE_WIDTH_MAX * AlloyScaleUtils.getScaleMultiplierForResolution(resolution)
    );
  }
}
