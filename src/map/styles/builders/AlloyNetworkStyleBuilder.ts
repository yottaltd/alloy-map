import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLGeometryType from 'ol/geom/GeometryType';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPolygon from 'ol/geom/Polygon';
import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { ColourUtils } from '../../../utils/ColourUtils';
import { StringUtils } from '../../../utils/StringUtils';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyFeatureType } from '../../features/AlloyFeatureType';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloySimplifiedGeometryFeature } from '../../features/AlloySimplifiedGeometryFeature';
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
 * the colour for network centre lines
 * @ignore
 */
const NETWORK_LINE_COLOUR = '#ffffff';

/**
 * builds styles for network features, this can be any type of geometry
 * @ignore
 * @internal
 */
export class AlloyNetworkStyleBuilder extends AlloyStyleBuilderWithLayerStyles<
  AlloyItemFeature | AlloySimplifiedGeometryFeature
> {
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
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): string {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1555504662, 'missing layer style: ' + feature.properties.styleId);
    }

    const type = feature.olFeature.getGeometry().getType();

    return StringUtils.cacheKeyConcat(
      state,
      resolution,
      layerStyle.icon,
      layerStyle.colour,
      state === AlloyStyleBuilderBuildState.Default ? layerStyle.opacity : 1,
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
  protected createStyles(
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1555504675, 'missing layer style: ' + feature.properties.styleId);
    }

    switch (feature.olFeature.getGeometry().getType()) {
      case OLGeometryType.POINT:
        return this.createPointStyles(resolution, layerStyle);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringStyles(resolution, layerStyle);
      case OLGeometryType.POLYGON:
        return this.createPolygonStyles(resolution, feature, layerStyle);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointStyles(resolution, layerStyle);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringStyles(resolution, layerStyle);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonStyles(resolution, feature, layerStyle);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionStyles(resolution, feature, layerStyle);
      default:
        throw new AlloyMapError(1555504685, 'unsupported geometry type');
    }
  }

  /**
   * @override
   */
  protected createHoverStyles(
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1555504692, 'missing layer style: ' + feature.properties.styleId);
    }

    switch (feature.olFeature.getGeometry().getType()) {
      case OLGeometryType.POINT:
        return this.createPointHoverStyles(resolution, layerStyle);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringHoverStyles(resolution, layerStyle);
      case OLGeometryType.POLYGON:
        return this.createPolygonHoverStyles(resolution, feature, layerStyle);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointHoverStyles(resolution, layerStyle);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringHoverStyles(resolution, layerStyle);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonHoverStyles(resolution, feature, layerStyle);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionHoverStyles(resolution, feature, layerStyle);
      default:
        throw new AlloyMapError(1555504703, 'unsupported geometry type');
    }
  }

  /**
   * @override
   */
  protected createSelectedStyles(
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1555504729, 'missing layer style: ' + feature.properties.styleId);
    }

    switch (feature.olFeature.getGeometry().getType()) {
      case OLGeometryType.POINT:
        return this.createPointSelectedStyles(resolution, layerStyle);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringSelectedStyles(resolution, layerStyle);
      case OLGeometryType.POLYGON:
        return this.createPolygonSelectedStyles(resolution, feature, layerStyle);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointSelectedStyles(resolution, layerStyle);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringSelectedStyles(resolution, layerStyle);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonSelectedStyles(resolution, feature, layerStyle);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionSelectedStyles(resolution, feature, layerStyle);
      default:
        throw new AlloyMapError(1555504758, 'unsupported geometry type');
    }
  }

  private createPointStyles(
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    const styles = [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        layerStyle.colour,
        layerStyle.opacity,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    ];

    if (layerStyle.icon) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          layerStyle.opacity,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createMultiPointStyles(
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    const styles = [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        layerStyle.colour,
        layerStyle.opacity,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    ];

    if (layerStyle.icon) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          layerStyle.opacity,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createLineStringStyles(
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    return [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution),
        layerStyle.colour,
        layerStyle.opacity,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
    ];
  }

  private createMultiLineStringStyles(
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    return [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution),
        layerStyle.colour,
        layerStyle.opacity,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
    ];
  }

  private createPolygonStyles(
    resolution: number,
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const semiTransparentColour = ColourUtils.semiTransparent(layerStyle.colour);

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

    const styles = [
      AlloyPolygonUtils.createPolygonStyle(
        semiTransparentColour,
        layerStyle.opacity,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
    ];

    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          layerStyle.opacity,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    return styles;
  }

  private createMultiPolygonStyles(
    resolution: number,
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const semiTransparentColour = ColourUtils.semiTransparent(layerStyle.colour);

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

    const styles = [
      AlloyPolygonUtils.createPolygonStyle(
        semiTransparentColour,
        layerStyle.opacity,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
    ];

    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          layerStyle.opacity,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    return styles;
  }

  private createGeometryCollectionStyles(
    resolution: number,
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    layerStyle: AlloyLayerStyle,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointStyles(resolution, layerStyle, true),
      ...this.createMultiPointStyles(resolution, layerStyle, true),
      ...this.createLineStringStyles(resolution, layerStyle, true),
      ...this.createMultiLineStringStyles(resolution, layerStyle, true),
      ...this.createPolygonStyles(resolution, feature, layerStyle, true),
      ...this.createMultiPolygonStyles(resolution, feature, layerStyle, true),
    ];
  }

  private createPointHoverStyles(
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);
    const styles = [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        hoverColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        hoverColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    ];

    if (layerStyle.icon) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          1,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createMultiPointHoverStyles(
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);
    const styles = [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        hoverColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        hoverColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    ];

    if (layerStyle.icon) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          1,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createLineStringHoverStyles(
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);

    return [
      AlloyLineUtils.createLineHaloStyle(
        width,
        hoverColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        hoverColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineDashStyle(
        width,
        NETWORK_LINE_COLOUR,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineEndStyle(
        width,
        NETWORK_LINE_COLOUR,
        1,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to end points
              AlloyMultiLineStringFunctions.convertGeometryToEndPoints,
            )
          : AlloyLineStringFunctions.convertFeatureToEndPoints,
      ),
    ];
  }

  private createMultiLineStringHoverStyles(
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);

    return [
      AlloyLineUtils.createLineHaloStyle(
        width,
        hoverColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        hoverColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineDashStyle(
        width,
        NETWORK_LINE_COLOUR,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineEndStyle(
        width,
        NETWORK_LINE_COLOUR,
        1,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to end points
              AlloyMultiLineStringFunctions.convertGeometryToEndPoints,
            )
          : AlloyMultiLineStringFunctions.convertFeatureToEndPoints,
      ),
    ];
  }

  private createPolygonHoverStyles(
    resolution: number,
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);

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

    const styles = [
      AlloyPolygonUtils.createPolygonHaloStyle(
        hoverColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        hoverColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
    ];

    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          1,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    return styles;
  }

  private createMultiPolygonHoverStyles(
    resolution: number,
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);

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

    const styles = [
      AlloyPolygonUtils.createPolygonHaloStyle(
        hoverColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        hoverColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
    ];

    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          1,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    return styles;
  }

  private createGeometryCollectionHoverStyles(
    resolution: number,
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    layerStyle: AlloyLayerStyle,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointHoverStyles(resolution, layerStyle, true),
      ...this.createMultiPointHoverStyles(resolution, layerStyle, true),
      ...this.createLineStringHoverStyles(resolution, layerStyle, true),
      ...this.createMultiLineStringHoverStyles(resolution, layerStyle, true),
      ...this.createPolygonHoverStyles(resolution, feature, layerStyle, true),
      ...this.createMultiPolygonHoverStyles(resolution, feature, layerStyle, true),
    ];
  }

  private createPointSelectedStyles(
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    const styles = [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        layerStyle.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        layerStyle.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    ];

    if (layerStyle.icon) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          1,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createMultiPointSelectedStyles(
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    const styles = [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        layerStyle.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        layerStyle.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    ];

    if (layerStyle.icon) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          1,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createLineStringSelectedStyles(
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);
    const radius = this.getBallRadius(resolution);

    const styles = [
      AlloyLineUtils.createLineHaloStyle(
        width,
        layerStyle.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        layerStyle.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineDashStyle(
        width,
        NETWORK_LINE_COLOUR,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineEndStyle(
        width,
        NETWORK_LINE_COLOUR,
        1,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to end points
              AlloyMultiLineStringFunctions.convertGeometryToEndPoints,
            )
          : AlloyLineStringFunctions.convertFeatureToEndPoints,
      ),
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        layerStyle.colour,
        1,
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
        layerStyle.colour,
        1,
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

    if (layerStyle.icon) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          1,
          processGeometryCollection
            ? AlloyGeometryFunctionUtils.pipe(
                // if we have geometry collection, first convert to multi line strings
                AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
                // then convert to mid points
                AlloyMultiLineStringFunctions.convertGeometryToMidPoints,
              )
            : AlloyLineStringFunctions.convertFeatureToMidPoint,
        ),
      );
    }

    return styles;
  }

  private createMultiLineStringSelectedStyles(
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);
    const radius = this.getBallRadius(resolution);

    const styles = [
      AlloyLineUtils.createLineHaloStyle(
        width,
        layerStyle.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        layerStyle.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        layerStyle.colour,
        1,
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
        layerStyle.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to mid points
              AlloyMultiLineStringFunctions.convertGeometryToMidPoints,
            )
          : AlloyMultiLineStringFunctions.convertFeatureToMidPoints,
      ),
      AlloyLineUtils.createLineDashStyle(
        width,
        NETWORK_LINE_COLOUR,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineEndStyle(
        width,
        NETWORK_LINE_COLOUR,
        1,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to end points
              AlloyMultiLineStringFunctions.convertGeometryToEndPoints,
            )
          : AlloyMultiLineStringFunctions.convertFeatureToEndPoints,
      ),
    ];

    if (layerStyle.icon) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          1,
          processGeometryCollection
            ? AlloyGeometryFunctionUtils.pipe(
                // if we have geometry collection, first convert to multi line strings
                AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
                // then convert to mid points
                AlloyMultiLineStringFunctions.convertGeometryToMidPoints,
              )
            : AlloyMultiLineStringFunctions.convertFeatureToMidPoints,
        ),
      );
    }

    return styles;
  }

  private createPolygonSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
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

    const styles = [
      AlloyPolygonUtils.createPolygonHaloStyle(
        layerStyle.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        layerStyle.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
    ];

    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          1,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    return styles;
  }

  private createMultiPolygonSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
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

    const styles = [
      AlloyPolygonUtils.createPolygonHaloStyle(
        layerStyle.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        layerStyle.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
    ];

    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          1,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    return styles;
  }

  private createGeometryCollectionSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    layerStyle: AlloyLayerStyle,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointSelectedStyles(resolution, layerStyle, true),
      ...this.createMultiPointSelectedStyles(resolution, layerStyle, true),
      ...this.createLineStringSelectedStyles(resolution, layerStyle, true),
      ...this.createMultiLineStringSelectedStyles(resolution, layerStyle, true),
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
