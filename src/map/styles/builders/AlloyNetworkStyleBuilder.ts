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
import { AlloySimplifiedGeometryFeature } from '../../features/AlloySimplifiedGeometryFeature';
import { FeatureGuards } from '../../guards/FeatureGuards';
import { AlloyLayerStyle } from '../AlloyLayerStyle';
import { AlloyLayerStyleLabelMode } from '../AlloyLayerStyleLabelMode';
import { AlloyStyleBuilderBuildState } from '../AlloyStyleBuilderBuildState';
import { AlloyStyleBuilderWithLayerStyles } from '../AlloyStyleBuilderWithLayerStyles';
import { AlloyBallUtils } from '../utils/AlloyBallUtils';
import { AlloyIconUtils } from '../utils/AlloyIconUtils';
import { AlloyLabelUtils } from '../utils/AlloyLabelUtils';
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
import { AlloyLayerStyleScale } from '../AlloyLayerStyleScale';

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

    // do this check once for title and subtitle
    let title: string | undefined;
    let subtitle: string | undefined;
    if (
      (layerStyle.labelMode === AlloyLayerStyleLabelMode.Title ||
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle) &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      title = feature.properties.title;
      if (layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle) {
        subtitle = feature.properties.subtitle;
      }
    }

    return StringUtils.cacheKeyConcat(
      state,
      resolution,
      layerStyle.scale !== AlloyLayerStyleScale.Tiny ? layerStyle.icon : undefined,
      layerStyle.colour,
      layerStyle.scale,
      // need to key on geometry type as we support everything
      type,
      // polygons, multi polygons and geometry collections are also special due to icon sizing
      // inside polygons that need to be processed per item
      layerStyle.icon &&
        (type === OLGeometryType.POLYGON ||
          type === OLGeometryType.MULTI_POLYGON ||
          type === OLGeometryType.GEOMETRY_COLLECTION)
        ? feature.olFeature.getId()
        : undefined,
      // if label titles are enabled then key on title
      title,
      // if label subtitles are enabled then key on title
      subtitle,
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
        return this.createPointStyles(feature, resolution, layerStyle);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringStyles(feature, resolution, layerStyle);
      case OLGeometryType.POLYGON:
        return this.createPolygonStyles(feature, resolution, layerStyle);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointStyles(feature, resolution, layerStyle);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringStyles(feature, resolution, layerStyle);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonStyles(feature, resolution, layerStyle);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionStyles(feature, resolution, layerStyle);
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
        return this.createPointHoverStyles(feature, resolution, layerStyle);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringHoverStyles(feature, resolution, layerStyle);
      case OLGeometryType.POLYGON:
        return this.createPolygonHoverStyles(feature, resolution, layerStyle);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointHoverStyles(feature, resolution, layerStyle);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringHoverStyles(feature, resolution, layerStyle);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonHoverStyles(feature, resolution, layerStyle);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionHoverStyles(feature, resolution, layerStyle);
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
        return this.createPointSelectedStyles(feature, resolution, layerStyle);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringSelectedStyles(feature, resolution, layerStyle);
      case OLGeometryType.POLYGON:
        return this.createPolygonSelectedStyles(feature, resolution, layerStyle);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointSelectedStyles(feature, resolution, layerStyle);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringSelectedStyles(feature, resolution, layerStyle);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonSelectedStyles(feature, resolution, layerStyle);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionSelectedStyles(feature, resolution, layerStyle);
      default:
        throw new AlloyMapError(1555504758, 'unsupported geometry type');
    }
  }

  private createPointStyles(
    // only usable for labelling! the cache does not guarantee you will get the same feature, this
    // function may produce an output shared across many!
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, layerStyle.scale);
    const styles: OLStyle[] = [];

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    styles.push(
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    );

    // add icon support
    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createMultiPointStyles(
    // only usable for labelling! the cache does not guarantee you will get the same feature, this
    // function may produce an output shared across many!
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, layerStyle.scale);
    const styles: OLStyle[] = [];

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    styles.push(
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    );

    // add icon support
    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createLineStringStyles(
    // only usable for labelling! the cache does not guarantee you will get the same feature, this
    // function may produce an output shared across many!
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const styles: OLStyle[] = [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution, layerStyle.scale),
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
    ];

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
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

  private createMultiLineStringStyles(
    // only usable for labelling! the cache does not guarantee you will get the same feature, this
    // function may produce an output shared across many!
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const styles: OLStyle[] = [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution, layerStyle.scale),
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
    ];

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
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

  private createPolygonStyles(
    // can be used within this function as polyfon style functions are unique per feature
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
    ];

    // add icon support
    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    return styles;
  }

  private createMultiPolygonStyles(
    // can be used within this function as polyfon style functions are unique per feature
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
    ];

    // add icon support
    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    return styles;
  }

  private createGeometryCollectionStyles(
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointStyles(feature, resolution, layerStyle, true),
      ...this.createMultiPointStyles(feature, resolution, layerStyle, true),
      ...this.createLineStringStyles(feature, resolution, layerStyle, true),
      ...this.createMultiLineStringStyles(feature, resolution, layerStyle, true),
      ...this.createPolygonStyles(feature, resolution, layerStyle, true),
      ...this.createMultiPolygonStyles(feature, resolution, layerStyle, true),
    ];
  }

  private createPointHoverStyles(
    // only usable for labelling! the cache does not guarantee you will get the same feature, this
    // function may produce an output shared across many!
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, layerStyle.scale);
    const styles: OLStyle[] = [];

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);
    styles.push(
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
    );

    // add icon support
    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createMultiPointHoverStyles(
    // only usable for labelling! the cache does not guarantee you will get the same feature, this
    // function may produce an output shared across many!
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, layerStyle.scale);
    const styles: OLStyle[] = [];

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);
    styles.push(
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
    );

    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createLineStringHoverStyles(
    // only usable for labelling! the cache does not guarantee you will get the same feature, this
    // function may produce an output shared across many!
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, layerStyle.scale);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);

    const styles: OLStyle[] = [
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
      AlloyLineUtils.createLineDashStyle(
        width,
        NETWORK_LINE_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineEndStyle(
        width,
        NETWORK_LINE_COLOUR,
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

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
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

  private createMultiLineStringHoverStyles(
    // only usable for labelling! the cache does not guarantee you will get the same feature, this
    // function may produce an output shared across many!
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, layerStyle.scale);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);

    const styles: OLStyle[] = [
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
      AlloyLineUtils.createLineDashStyle(
        width,
        NETWORK_LINE_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineEndStyle(
        width,
        NETWORK_LINE_COLOUR,
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

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
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

  private createPolygonHoverStyles(
    // can be used within this function as polygon style functions are unique per feature
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
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
    ];

    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    return styles;
  }

  private createMultiPolygonHoverStyles(
    // can be used within this function as polyfon style functions are unique per feature
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
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
    ];

    // add icon support
    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    return styles;
  }

  private createGeometryCollectionHoverStyles(
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointHoverStyles(feature, resolution, layerStyle, true),
      ...this.createMultiPointHoverStyles(feature, resolution, layerStyle, true),
      ...this.createLineStringHoverStyles(feature, resolution, layerStyle, true),
      ...this.createMultiLineStringHoverStyles(feature, resolution, layerStyle, true),
      ...this.createPolygonHoverStyles(feature, resolution, layerStyle, true),
      ...this.createMultiPolygonHoverStyles(feature, resolution, layerStyle, true),
    ];
  }

  private createPointSelectedStyles(
    // only usable for labelling! the cache does not guarantee you will get the same feature, this
    // function may produce an output shared across many!
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, layerStyle.scale);
    const styles: OLStyle[] = [];

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    styles.push(
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    );

    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createMultiPointSelectedStyles(
    // only usable for labelling! the cache does not guarantee you will get the same feature, this
    // function may produce an output shared across many!
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, layerStyle.scale);
    const styles: OLStyle[] = [];

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    styles.push(
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    );

    // add icon support
    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createLineStringSelectedStyles(
    // only usable for labelling! the cache does not guarantee you will get the same feature, this
    // function may produce an output shared across many!
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, layerStyle.scale);
    const radius = this.getBallRadius(resolution, layerStyle.scale);

    const styles = [
      AlloyLineUtils.createLineHaloStyle(
        width,
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineDashStyle(
        width,
        NETWORK_LINE_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineEndStyle(
        width,
        NETWORK_LINE_COLOUR,
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

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
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

    styles.push(
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        layerStyle.colour,
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

    // add icon support
    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
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
      );
    }

    return styles;
  }

  private createMultiLineStringSelectedStyles(
    // only usable for labelling! the cache does not guarantee you will get the same feature, this
    // function may produce an output shared across many!
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, layerStyle.scale);
    const radius = this.getBallRadius(resolution, layerStyle.scale);

    const styles = [
      AlloyLineUtils.createLineHaloStyle(
        width,
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineDashStyle(
        width,
        NETWORK_LINE_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineEndStyle(
        width,
        NETWORK_LINE_COLOUR,
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

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
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

    styles.push(
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        layerStyle.colour,
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

    // add icon support
    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
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
      );
    }

    return styles;
  }

  private createPolygonSelectedStyles(
    // can be used within this function as polyfon style functions are unique per feature
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
    ];

    // add icon support
    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    return styles;
  }

  private createMultiPolygonSelectedStyles(
    // can be used within this function as polyfon style functions are unique per feature
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
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
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
    ];

    // add icon support
    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    // add labelling support
    if (
      layerStyle.labelMode !== AlloyLayerStyleLabelMode.None &&
      FeatureGuards.isAlloyItemFeature(feature)
    ) {
      styles.push(
        AlloyLabelUtils.createLabelStyle(
          feature.properties.title,
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
            ? feature.properties.subtitle
            : null,
          layerStyle.colour,
          // we already have the mid point so use it
          midPoint,
        ),
      );
    }

    return styles;
  }

  private createGeometryCollectionSelectedStyles(
    feature: AlloyItemFeature | AlloySimplifiedGeometryFeature,
    resolution: number,
    layerStyle: AlloyLayerStyle,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointSelectedStyles(feature, resolution, layerStyle, true),
      ...this.createMultiPointSelectedStyles(feature, resolution, layerStyle, true),
      ...this.createLineStringSelectedStyles(feature, resolution, layerStyle, true),
      ...this.createMultiLineStringSelectedStyles(feature, resolution, layerStyle, true),
      ...this.createPolygonSelectedStyles(feature, resolution, layerStyle, true),
      ...this.createMultiPolygonSelectedStyles(feature, resolution, layerStyle, true),
    ];
  }

  /**
   * calculates the size of a ball on screen given the resolution
   * @param resolution the current resolution
   * @param scale the style scale
   */
  private getBallRadius(resolution: number, scale: AlloyLayerStyleScale): number {
    return (
      AlloyScaleUtils.POINT_RADIUS_MAX *
      AlloyScaleUtils.getScaleMultiplierForResolution(resolution) *
      scale
    );
  }

  /**
   * calculates the line width on screen given the resolution
   * @param resolution the current resolution
   * @param scale the style scale
   */
  private getLineWidth(resolution: number, scale: AlloyLayerStyleScale): number {
    return (
      AlloyScaleUtils.LINE_WIDTH_MAX *
      AlloyScaleUtils.getScaleMultiplierForResolution(resolution) *
      scale
    );
  }
}
