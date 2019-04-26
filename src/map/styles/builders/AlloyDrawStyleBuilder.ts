import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPolygon from 'ol/geom/Polygon';
import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { ColourUtils } from '../../../utils/ColourUtils';
import { StringUtils } from '../../../utils/StringUtils';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyDrawFeature } from '../../features/AlloyDrawFeature';
import { AlloyStyleBuilder } from '../AlloyStyleBuilder';
import { AlloyStyleBuilderBuildState } from '../AlloyStyleBuilderBuildState';
import { AlloyBallUtils } from '../utils/AlloyBallUtils';
import { AlloyIconUtils } from '../utils/AlloyIconUtils';
import { AlloyLineUtils } from '../utils/AlloyLineUtils';
import { AlloyPolygonUtils } from '../utils/AlloyPolygonUtils';
import { AlloyScaleUtils } from '../utils/AlloyScaleUtils';
// tslint:disable-next-line: max-line-length
import { AlloyGeometryCollectionFunctions } from '../utils/geometry-functions/AlloyGeometryCollectionFunctions';
import { AlloyGeometryFunctionUtils } from '../utils/geometry-functions/AlloyGeometryFunctionUtils';
import { AlloyLineStringFunctions } from '../utils/geometry-functions/AlloyLineStringFunctions';
// tslint:disable-next-line: max-line-length
import { AlloyMultiLineStringFunctions } from '../utils/geometry-functions/AlloyMultiLineStringFunctions';
import { AlloyMultiPolygonFunctions } from '../utils/geometry-functions/AlloyMultiPolygonFunctions';
import { AlloyPolygonFunctions } from '../utils/geometry-functions/AlloyPolygonFunctions';

/**
 * the icon colour in the balls
 * @ignore
 */
const ICON_COLOUR = '#ffffff';

/**
 * builds styles for draw features, this can be any type of geometry
 * @ignore
 */
export class AlloyDrawStyleBuilder extends AlloyStyleBuilder<AlloyDrawFeature> {
  /**
   * shame we need a reference to the map :( but its for calculating coord to pixel coord transforms
   */
  private readonly map: AlloyMap;

  /**
   * creates a new instance
   * @param map the map instance for calculations
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
  ): string {
    return StringUtils.cacheKeyConcat(
      state,
      // scaling is undefined or true then we allow the feature to scale normally, if false it is a
      // fixed max size all the time
      resolution,
      feature.id, // each draw feature is unique (expensive)
    );
  }

  /**
   * @override
   */
  protected createStyles(feature: AlloyDrawFeature, resolution: number): OLStyle | OLStyle[] {
    switch (feature.olFeature.getGeometry().getType()) {
      case 'Point':
        return this.createPointStyles(resolution, feature);
      case 'LineString':
        return this.createLineStringStyles(resolution, feature);
      case 'Polygon':
        return this.createPolygonStyles(resolution, feature);
      case 'MultiPoint':
        return this.createMultiPointStyles(resolution, feature);
      case 'MultiLineString':
        return this.createMultiLineStringStyles(resolution, feature);
      case 'MultiPolygon':
        return this.createMultiPolygonStyles(resolution, feature);
      case 'GeometryCollection':
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
      case 'Point':
        return this.createPointHoverStyles(resolution, feature);
      case 'LineString':
        return this.createLineStringHoverStyles(resolution, feature);
      case 'Polygon':
        return this.createPolygonHoverStyles(resolution, feature);
      case 'MultiPoint':
        return this.createMultiPointHoverStyles(resolution, feature);
      case 'MultiLineString':
        return this.createMultiLineStringHoverStyles(resolution, feature);
      case 'MultiPolygon':
        return this.createMultiPolygonHoverStyles(resolution, feature);
      case 'GeometryCollection':
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
      case 'Point':
        return this.createPointSelectedStyles(resolution, feature);
      case 'LineString':
        return this.createLineStringSelectedStyles(resolution, feature);
      case 'Polygon':
        return this.createPolygonSelectedStyles(resolution, feature);
      case 'MultiPoint':
        return this.createMultiPointSelectedStyles(resolution, feature);
      case 'MultiLineString':
        return this.createMultiLineStringSelectedStyles(resolution, feature);
      case 'MultiPolygon':
        return this.createMultiPolygonSelectedStyles(resolution, feature);
      case 'GeometryCollection':
        return this.createGeometryCollectionSelectedStyles(resolution, feature);
      default:
        throw new AlloyMapError(1556272894, 'unsupported geometry type');
    }
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
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

    // we need to calculate the icon size on a feature by feature basis
    let largestPolygon: OLPolygon | null;
    if (processGeometryCollection) {
      // calculate the largest polygon in the geometry collection, this is cached
      largestPolygon = AlloyGeometryCollectionFunctions.calculateLargestPolygon(
        feature.olFeature.getGeometry() as OLGeometryCollection,
      );
    } else {
      // single polygon, so it's always the largest...
      largestPolygon = feature.olFeature.getGeometry() as OLPolygon;
    }

    // special case, we don't have a polygon in this geometry so no styles are necessary
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
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

    // we need to calculate the icon size on a feature by feature basis
    let largestPolygon: OLPolygon | null;
    if (processGeometryCollection) {
      // calculate the largest polygon in the geometry collection, this is cached
      largestPolygon = AlloyGeometryCollectionFunctions.calculateLargestPolygon(
        feature.olFeature.getGeometry() as OLGeometryCollection,
      );
    } else {
      // calculate the largest polygon in the multi polygon, this is cached
      largestPolygon = AlloyMultiPolygonFunctions.calculateLargestPolygon(
        feature.olFeature.getGeometry() as OLMultiPolygon,
      );
    }

    // special case, we don't have a polygon in this geometry so no styles are necessary
    if (!largestPolygon) {
      return [];
    }

    // calculate the mid point of the multi geometries largest polygon, this is cached
    let iconSize = AlloyPolygonFunctions.calculateMidPointSize(
      largestPolygon,
      resolution,
      this.map.olMap,
    );

    // calculate the mid point of the largest polygon, this is cached
    const midPoint = AlloyPolygonFunctions.convertGeometryToMidPoint(largestPolygon);

    // clamp the icon size to a max
    iconSize = Math.min(iconSize, AlloyScaleUtils.POINT_RADIUS_MAX * 2);

    return [
      AlloyPolygonUtils.createPolygonStyle(
        semiTransparentColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createGeometryCollectionStyles(resolution: number, feature: AlloyDrawFeature): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointStyles(resolution, feature, true),
      ...this.createMultiPointStyles(resolution, feature, true),
      ...this.createLineStringStyles(resolution, feature, true),
      ...this.createMultiLineStringStyles(resolution, feature, true),
      ...this.createPolygonStyles(resolution, feature, true),
      ...this.createMultiPolygonStyles(resolution, feature, true),
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        hoverColour,
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        hoverColour,
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

    // we need to calculate the icon size on a feature by feature basis
    let largestPolygon: OLPolygon | null;
    if (processGeometryCollection) {
      // calculate the largest polygon in the geometry collection, this is cached
      largestPolygon = AlloyGeometryCollectionFunctions.calculateLargestPolygon(
        feature.olFeature.getGeometry() as OLGeometryCollection,
      );
    } else {
      // single polygon, so it's always the largest...
      largestPolygon = feature.olFeature.getGeometry() as OLPolygon;
    }

    // special case, we don't have a polygon in this geometry so no styles are necessary
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
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

    // we need to calculate the icon size on a feature by feature basis
    let largestPolygon: OLPolygon | null;
    if (processGeometryCollection) {
      // calculate the largest polygon in the geometry collection, this is cached
      largestPolygon = AlloyGeometryCollectionFunctions.calculateLargestPolygon(
        feature.olFeature.getGeometry() as OLGeometryCollection,
      );
    } else {
      // calculate the largest polygon in the multi polygon, this is cached
      largestPolygon = AlloyMultiPolygonFunctions.calculateLargestPolygon(
        feature.olFeature.getGeometry() as OLMultiPolygon,
      );
    }

    // special case, we don't have a polygon in this geometry so no styles are necessary
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
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
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointHoverStyles(resolution, feature, true),
      ...this.createMultiPointHoverStyles(resolution, feature, true),
      ...this.createLineStringHoverStyles(resolution, feature, true),
      ...this.createMultiLineStringHoverStyles(resolution, feature, true),
      ...this.createPolygonHoverStyles(resolution, feature, true),
      ...this.createMultiPolygonHoverStyles(resolution, feature, true),
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        feature.properties.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to mid points
              AlloyMultiLineStringFunctions.convertGeometryToMidPoints,
            )
          : AlloyLineStringFunctions.convertFeatureToMidPoint,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to mid points
              AlloyMultiLineStringFunctions.convertGeometryToMidPoints,
            )
          : AlloyLineStringFunctions.convertFeatureToMidPoint,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to mid points
              AlloyMultiLineStringFunctions.convertGeometryToMidPoints,
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        feature.properties.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to mid points
              AlloyMultiLineStringFunctions.convertGeometryToMidPoints,
            )
          : AlloyMultiLineStringFunctions.convertFeatureToMidPoints,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to mid points
              AlloyMultiLineStringFunctions.convertGeometryToMidPoints,
            )
          : AlloyMultiLineStringFunctions.convertFeatureToMidPoints,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to mid points
              AlloyMultiLineStringFunctions.convertGeometryToMidPoints,
            )
          : AlloyMultiLineStringFunctions.convertFeatureToMidPoints,
      ),
    ];
  }

  private createPolygonSelectedStyles(
    resolution: number,
    feature: AlloyDrawFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    // we need to calculate the icon size on a feature by feature basis
    let largestPolygon: OLPolygon | null;
    if (processGeometryCollection) {
      // calculate the largest polygon in the geometry collection, this is cached
      largestPolygon = AlloyGeometryCollectionFunctions.calculateLargestPolygon(
        feature.olFeature.getGeometry() as OLGeometryCollection,
      );
    } else {
      // single polygon, so it's always the largest...
      largestPolygon = feature.olFeature.getGeometry() as OLPolygon;
    }

    // special case, we don't have a polygon in this geometry so no styles are necessary
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        feature.properties.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
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
    // we need to calculate the icon size on a feature by feature basis
    let largestPolygon: OLPolygon | null;
    if (processGeometryCollection) {
      // calculate the largest polygon in the geometry collection, this is cached
      largestPolygon = AlloyGeometryCollectionFunctions.calculateLargestPolygon(
        feature.olFeature.getGeometry() as OLGeometryCollection,
      );
    } else {
      // calculate the largest polygon in the multi polygon, this is cached
      largestPolygon = AlloyMultiPolygonFunctions.calculateLargestPolygon(
        feature.olFeature.getGeometry() as OLMultiPolygon,
      );
    }

    // special case, we don't have a polygon in this geometry so no styles are necessary
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        feature.properties.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
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
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointSelectedStyles(resolution, feature, true),
      ...this.createMultiPointSelectedStyles(resolution, feature, true),
      ...this.createLineStringSelectedStyles(resolution, feature, true),
      ...this.createMultiLineStringSelectedStyles(resolution, feature, true),
      ...this.createPolygonSelectedStyles(resolution, feature, true),
      ...this.createMultiPolygonSelectedStyles(resolution, feature, true),
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
