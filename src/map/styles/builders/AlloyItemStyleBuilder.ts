import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLGeometryType from 'ol/geom/GeometryType';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPolygon from 'ol/geom/Polygon';
import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { ColourUtils } from '../../../utils/ColourUtils';
import { StringUtils } from '../../../utils/StringUtils';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyLayerStyle } from '../AlloyLayerStyle';
import { AlloyStyleBuilderBuildState } from '../AlloyStyleBuilderBuildState';
import { AlloyStyleBuilderWithLayerStyles } from '../AlloyStyleBuilderWithLayerStyles';
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
 * builds styles for item features, this can be any type of geometry
 * @ignore
 * @internal
 */
export class AlloyItemStyleBuilder extends AlloyStyleBuilderWithLayerStyles<AlloyItemFeature> {
  /**
   * shame we need a reference to the map :( but its for calculating coord to pixel coord transforms
   */
  private readonly map: AlloyMap;

  /**
   * creates a new instance
   * @param map the map instance for calculations
   * @param styles the styles to build
   * @ignore
   * @internal
   */
  constructor(map: AlloyMap, styles: Readonly<AlloyLayerStyle[]>) {
    super(styles);
    this.map = map;
  }

  /**
   * @override
   */
  protected getKey(
    feature: AlloyItemFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): string {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163769, 'missing layer style: ' + feature.properties.styleId);
    }

    const type = feature.olFeature.getGeometry().getType();

    return StringUtils.cacheKeyConcat(
      state,
      resolution,
      feature.properties.icon || layerStyle.icon,
      feature.properties.colour || layerStyle.colour,
      // need to key on geometry type as we support everything
      type,
      // polygons, multi polygons and geometry collections are also special due to icon sizing
      // inside polygons that need to be processed per item
      type === OLGeometryType.POLYGON ||
        type === OLGeometryType.MULTI_POLYGON ||
        type === OLGeometryType.GEOMETRY_COLLECTION
        ? feature.olFeature.getId()
        : undefined,
    );
  }

  /**
   * @override
   */
  protected createStyles(feature: AlloyItemFeature, resolution: number): OLStyle | OLStyle[] {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163777, 'missing layer style: ' + feature.properties.styleId);
    }

    switch (feature.olFeature.getGeometry().getType()) {
      case OLGeometryType.POINT:
        return this.createPointStyles(resolution, feature, layerStyle);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringStyles(resolution, feature, layerStyle);
      case OLGeometryType.POLYGON:
        return this.createPolygonStyles(resolution, feature, layerStyle);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointStyles(resolution, feature, layerStyle);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringStyles(resolution, feature, layerStyle);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonStyles(resolution, feature, layerStyle);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionStyles(resolution, feature, layerStyle);
      default:
        throw new AlloyMapError(1554458665, 'unsupported geometry type');
    }
  }

  /**
   * @override
   */
  protected createHoverStyles(feature: AlloyItemFeature, resolution: number): OLStyle | OLStyle[] {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554419738, 'missing layer style: ' + feature.properties.styleId);
    }

    switch (feature.olFeature.getGeometry().getType()) {
      case OLGeometryType.POINT:
        return this.createPointHoverStyles(resolution, feature, layerStyle);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringHoverStyles(resolution, feature, layerStyle);
      case OLGeometryType.POLYGON:
        return this.createPolygonHoverStyles(resolution, feature, layerStyle);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointHoverStyles(resolution, feature, layerStyle);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringHoverStyles(resolution, feature, layerStyle);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonHoverStyles(resolution, feature, layerStyle);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionHoverStyles(resolution, feature, layerStyle);
      default:
        throw new AlloyMapError(1554458665, 'unsupported geometry type');
    }
  }

  /**
   * @override
   */
  protected createSelectedStyles(
    feature: AlloyItemFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554419738, 'missing layer style: ' + feature.properties.styleId);
    }

    switch (feature.olFeature.getGeometry().getType()) {
      case OLGeometryType.POINT:
        return this.createPointSelectedStyles(resolution, feature, layerStyle);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringSelectedStyles(resolution, feature, layerStyle);
      case OLGeometryType.POLYGON:
        return this.createPolygonSelectedStyles(resolution, feature, layerStyle);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointSelectedStyles(resolution, feature, layerStyle);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringSelectedStyles(resolution, feature, layerStyle);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonSelectedStyles(resolution, feature, layerStyle);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionSelectedStyles(resolution, feature, layerStyle);
      default:
        throw new AlloyMapError(1554458665, 'unsupported geometry type');
    }
  }

  private createPointStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    ];
  }

  private createMultiPointStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    ];
  }

  private createLineStringStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    return [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution),
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
    ];
  }

  private createMultiLineStringStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    return [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution),
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
    ];
  }

  private createPolygonStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const semiTransparentColour = ColourUtils.semiTransparent(
      feature.properties.colour || layerStyle.colour,
    );

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
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createMultiPolygonStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const semiTransparentColour = ColourUtils.semiTransparent(
      feature.properties.colour || layerStyle.colour,
    );

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
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createGeometryCollectionStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointStyles(resolution, feature, layerStyle, true),
      ...this.createMultiPointStyles(resolution, feature, layerStyle, true),
      ...this.createLineStringStyles(resolution, feature, layerStyle, true),
      ...this.createMultiLineStringStyles(resolution, feature, layerStyle, true),
      ...this.createPolygonStyles(resolution, feature, layerStyle, true),
      ...this.createMultiPolygonStyles(resolution, feature, layerStyle, true),
    ];
  }

  private createPointHoverStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(
      feature.properties.colour || layerStyle.colour,
    );
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
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    ];
  }

  private createMultiPointHoverStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(
      feature.properties.colour || layerStyle.colour,
    );
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
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    ];
  }

  private createLineStringHoverStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(
      feature.properties.colour || layerStyle.colour,
    );

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
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(
      feature.properties.colour || layerStyle.colour,
    );

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
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(
      feature.properties.colour || layerStyle.colour,
    );

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
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createMultiPolygonHoverStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(
      feature.properties.colour || layerStyle.colour,
    );

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
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createGeometryCollectionHoverStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointHoverStyles(resolution, feature, layerStyle, true),
      ...this.createMultiPointHoverStyles(resolution, feature, layerStyle, true),
      ...this.createLineStringHoverStyles(resolution, feature, layerStyle, true),
      ...this.createMultiLineStringHoverStyles(resolution, feature, layerStyle, true),
      ...this.createPolygonHoverStyles(resolution, feature, layerStyle, true),
      ...this.createMultiPolygonHoverStyles(resolution, feature, layerStyle, true),
    ];
  }

  private createPointSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    ];
  }

  private createMultiPointSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    ];
  }

  private createLineStringSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);
    const radius = this.getBallRadius(resolution);

    return [
      AlloyLineUtils.createLineHaloStyle(
        width,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
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
        feature.properties.colour || layerStyle.colour,
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
        feature.properties.icon || layerStyle.icon,
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
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);
    const radius = this.getBallRadius(resolution);

    return [
      AlloyLineUtils.createLineHaloStyle(
        width,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
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
        feature.properties.colour || layerStyle.colour,
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
        feature.properties.icon || layerStyle.icon,
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
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
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
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createMultiPolygonSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
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
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createGeometryCollectionSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointSelectedStyles(resolution, feature, layerStyle, true),
      ...this.createMultiPointSelectedStyles(resolution, feature, layerStyle, true),
      ...this.createLineStringSelectedStyles(resolution, feature, layerStyle, true),
      ...this.createMultiLineStringSelectedStyles(resolution, feature, layerStyle, true),
      ...this.createPolygonSelectedStyles(resolution, feature, layerStyle, true),
      ...this.createMultiPolygonSelectedStyles(resolution, feature, layerStyle, true),
    ];
  }

  /**
   * calculates the size of a ball on screen given the resolution
   * @param resolution the current resolution
   */
  private getBallRadius(resolution: number): number {
    return (
      AlloyScaleUtils.POINT_RADIUS_MAX * AlloyScaleUtils.getScaleMultiplierForResolution(resolution)
    );
  }

  /**
   * calculates the line width on screen given the resolution
   * @param resolution the current resolution
   */
  private getLineWidth(resolution: number): number {
    return (
      AlloyScaleUtils.LINE_WIDTH_MAX * AlloyScaleUtils.getScaleMultiplierForResolution(resolution)
    );
  }
}
