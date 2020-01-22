import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLGeometryType from 'ol/geom/GeometryType';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPolygon from 'ol/geom/Polygon';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { ColourUtils } from '../../../utils/ColourUtils';
import { StringUtils } from '../../../utils/StringUtils';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyCustomFeatureBase } from '../../features/AlloyCustomFeatureBase';
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
 * builds styles for custom features, this can be any type of geometry
 * @ignore
 * @internal
 */
export class AlloyCustomStyleBuilder extends AlloyStyleBuilder<AlloyCustomFeatureBase> {
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
    feature: AlloyCustomFeatureBase,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): string {
    return StringUtils.cacheKeyConcat(
      state,
      // scaling is undefined or true then we allow the feature to scale normally, if false it is a
      // fixed max size all the time
      feature.properties.scale === undefined || feature.properties.scale ? resolution : 1,
      feature.id, // each custom feature is unique (expensive)
      feature.olFeature.getRevision(),
    );
  }

  /**
   * @override
   */
  protected createStyles(feature: AlloyCustomFeatureBase, resolution: number): OLStyle | OLStyle[] {
    switch (feature.olFeature.getGeometry().getType()) {
      case OLGeometryType.POINT:
        return this.createPointStyles(resolution, feature);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringStyles(resolution, feature);
      case OLGeometryType.POLYGON:
        return this.createPolygonStyles(resolution, feature);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointStyles(resolution, feature);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringStyles(resolution, feature);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonStyles(resolution, feature);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionStyles(resolution, feature);
      default:
        throw new AlloyMapError(1556117088, 'unsupported geometry type');
    }
  }

  /**
   * @override
   */
  protected createHoverStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
  ): OLStyle | OLStyle[] {
    switch (feature.olFeature.getGeometry().getType()) {
      case OLGeometryType.POINT:
        return this.createPointHoverStyles(resolution, feature);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringHoverStyles(resolution, feature);
      case OLGeometryType.POLYGON:
        return this.createPolygonHoverStyles(resolution, feature);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointHoverStyles(resolution, feature);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringHoverStyles(resolution, feature);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonHoverStyles(resolution, feature);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionHoverStyles(resolution, feature);
      default:
        throw new AlloyMapError(1556117120, 'unsupported geometry type');
    }
  }

  /**
   * @override
   */
  protected createSelectedStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
  ): OLStyle | OLStyle[] {
    switch (feature.olFeature.getGeometry().getType()) {
      case OLGeometryType.POINT:
        return this.createPointSelectedStyles(resolution, feature);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringSelectedStyles(resolution, feature);
      case OLGeometryType.POLYGON:
        return this.createPolygonSelectedStyles(resolution, feature);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointSelectedStyles(resolution, feature);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringSelectedStyles(resolution, feature);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonSelectedStyles(resolution, feature);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionSelectedStyles(resolution, feature);
      default:
        throw new AlloyMapError(1556117154, 'unsupported geometry type');
    }
  }

  /**
   * creates the icon style for a feature that may have an icon or text
   * @param radius the size of the style
   * @param feature the feature to style
   * @param colour the colour to apply
   * @param geometryFunction the geometry function to apply
   */
  private createIconOrTextStyle(
    radius: number,
    feature: AlloyCustomFeatureBase,
    colour: string,
    geometryFunction?: OLGeometry | ((olFeature: OLFeature | OLRenderFeature) => OLGeometry),
  ): OLStyle | null {
    if (feature.properties.icon) {
      return AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        colour,
        1,
        geometryFunction,
      );
    } else if (feature.properties.text) {
      return AlloyIconUtils.createTextIconStyle(
        feature.properties.text,
        colour,
        1,
        geometryFunction,
      );
    }
    return null;
  }

  private createPointStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, feature.properties.scale);

    const styles = [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    ];
    // the icon of the item
    const iconStyle = this.createIconOrTextStyle(
      radius,
      feature,
      ICON_COLOUR,
      processGeometryCollection
        ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
        : undefined,
    );
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createMultiPointStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, feature.properties.scale);

    const styles = [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    ];
    // the icon of the item
    const iconStyle = this.createIconOrTextStyle(
      radius,
      feature,
      ICON_COLOUR,
      processGeometryCollection
        ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
        : undefined,
    );
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createLineStringStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    return [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution, feature.properties.scale),
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
    ];
  }

  private createMultiLineStringStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    return [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution, feature.properties.scale),
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
    ];
  }

  private createPolygonStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
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

    const styles = [
      AlloyPolygonUtils.createPolygonStyle(
        semiTransparentColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
    ];
    const iconStyle = this.createIconOrTextStyle(iconSize, feature, ICON_COLOUR, midPoint);
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createMultiPolygonStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
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

    const styles = [
      AlloyPolygonUtils.createPolygonStyle(
        semiTransparentColour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
    ];
    const iconStyle = this.createIconOrTextStyle(iconSize, feature, ICON_COLOUR, midPoint);
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createGeometryCollectionStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
  ): OLStyle[] {
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
    feature: AlloyCustomFeatureBase,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, feature.properties.scale);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);
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
    // the icon of the item
    const iconStyle = this.createIconOrTextStyle(
      radius,
      feature,
      ICON_COLOUR,
      processGeometryCollection
        ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
        : undefined,
    );
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createMultiPointHoverStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, feature.properties.scale);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);
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
    // the icon of the item
    const iconStyle = this.createIconOrTextStyle(
      radius,
      feature,
      ICON_COLOUR,
      processGeometryCollection
        ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
        : undefined,
    );
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createLineStringHoverStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, feature.properties.scale);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);

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
    ];
  }

  private createMultiLineStringHoverStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, feature.properties.scale);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);

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
    ];
  }

  private createPolygonHoverStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
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
    const iconStyle = this.createIconOrTextStyle(iconSize, feature, ICON_COLOUR, midPoint);
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createMultiPolygonHoverStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
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
    const iconStyle = this.createIconOrTextStyle(iconSize, feature, ICON_COLOUR, midPoint);
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createGeometryCollectionHoverStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
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
    feature: AlloyCustomFeatureBase,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, feature.properties.scale);

    const styles = [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    ];
    // the icon of the item
    const iconStyle = this.createIconOrTextStyle(
      radius,
      feature,
      ICON_COLOUR,
      processGeometryCollection
        ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
        : undefined,
    );
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createMultiPointSelectedStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, feature.properties.scale);

    const styles = [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    ];
    // the icon of the item
    const iconStyle = this.createIconOrTextStyle(
      radius,
      feature,
      ICON_COLOUR,
      processGeometryCollection
        ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
        : undefined,
    );
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createLineStringSelectedStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, feature.properties.scale);
    const radius = this.getBallRadius(resolution, feature.properties.scale);

    const styles = [
      AlloyLineUtils.createLineHaloStyle(
        width,
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour,
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
        feature.properties.colour,
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
    // the icon of the item
    const iconStyle = this.createIconOrTextStyle(
      radius,
      feature,
      ICON_COLOUR,
      processGeometryCollection
        ? AlloyGeometryFunctionUtils.pipe(
            // if we have geometry collection, first convert to multi line strings
            AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
            // then convert to mid points
            AlloyMultiLineStringFunctions.convertGeometryToMidPoints,
          )
        : AlloyLineStringFunctions.convertFeatureToMidPoint,
    );
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createMultiLineStringSelectedStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, feature.properties.scale);
    const radius = this.getBallRadius(resolution, feature.properties.scale);

    const styles = [
      AlloyLineUtils.createLineHaloStyle(
        width,
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour,
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
        feature.properties.colour,
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
    ];
    // the icon of the item
    const iconStyle = this.createIconOrTextStyle(
      radius,
      feature,
      ICON_COLOUR,
      processGeometryCollection
        ? AlloyGeometryFunctionUtils.pipe(
            // if we have geometry collection, first convert to multi line strings
            AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
            // then convert to mid points
            AlloyMultiLineStringFunctions.convertGeometryToMidPoints,
          )
        : AlloyMultiLineStringFunctions.convertFeatureToMidPoints,
    );
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createPolygonSelectedStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
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
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
    ];
    const iconStyle = this.createIconOrTextStyle(iconSize, feature, ICON_COLOUR, midPoint);
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createMultiPolygonSelectedStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
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
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        feature.properties.colour,
        1,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
    ];
    const iconStyle = this.createIconOrTextStyle(iconSize, feature, ICON_COLOUR, midPoint);
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }
    return styles;
  }

  private createGeometryCollectionSelectedStyles(
    resolution: number,
    feature: AlloyCustomFeatureBase,
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
