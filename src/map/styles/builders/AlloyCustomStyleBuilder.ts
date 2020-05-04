/* eslint-disable max-len */

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
import { AlloyLayerStyleLabelMode } from '../AlloyLayerStyleLabelMode';
import { AlloyLayerStyleOpacity } from '../AlloyLayerStyleOpacity';
import { AlloyLayerStyleScale } from '../AlloyLayerStyleScale';
import { AlloyStyleBuilder } from '../AlloyStyleBuilder';
import { AlloyStyleBuilderBuildState } from '../AlloyStyleBuilderBuildState';
import { AlloyBallUtils } from '../utils/AlloyBallUtils';
import { AlloyIconUtils } from '../utils/AlloyIconUtils';
import { AlloyLabelUtils } from '../utils/AlloyLabelUtils';
import { AlloyLineUtils } from '../utils/AlloyLineUtils';
import { AlloyPolygonUtils } from '../utils/AlloyPolygonUtils';
import { AlloyScaleUtils } from '../utils/AlloyScaleUtils';
import { AlloyGeometryCollectionFunctions } from '../utils/geometry-functions/AlloyGeometryCollectionFunctions';
import { AlloyGeometryFunctionUtils } from '../utils/geometry-functions/AlloyGeometryFunctionUtils';
import { AlloyLineStringFunctions } from '../utils/geometry-functions/AlloyLineStringFunctions';
import { AlloyMultiLineStringFunctions } from '../utils/geometry-functions/AlloyMultiLineStringFunctions';
import { AlloyMultiPolygonFunctions } from '../utils/geometry-functions/AlloyMultiPolygonFunctions';
import { AlloyPolygonFunctions } from '../utils/geometry-functions/AlloyPolygonFunctions';

/* eslint-enable max-len */

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
        return this.createPointStyles(feature, resolution);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringStyles(feature, resolution);
      case OLGeometryType.POLYGON:
        return this.createPolygonStyles(feature, resolution);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointStyles(feature, resolution);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringStyles(feature, resolution);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonStyles(feature, resolution);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionStyles(feature, resolution);
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
        return this.createPointHoverStyles(feature, resolution);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringHoverStyles(feature, resolution);
      case OLGeometryType.POLYGON:
        return this.createPolygonHoverStyles(feature, resolution);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointHoverStyles(feature, resolution);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringHoverStyles(feature, resolution);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonHoverStyles(feature, resolution);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionHoverStyles(feature, resolution);
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
        return this.createPointSelectedStyles(feature, resolution);
      case OLGeometryType.LINE_STRING:
        return this.createLineStringSelectedStyles(feature, resolution);
      case OLGeometryType.POLYGON:
        return this.createPolygonSelectedStyles(feature, resolution);
      case OLGeometryType.MULTI_POINT:
        return this.createMultiPointSelectedStyles(feature, resolution);
      case OLGeometryType.MULTI_LINE_STRING:
        return this.createMultiLineStringSelectedStyles(feature, resolution);
      case OLGeometryType.MULTI_POLYGON:
        return this.createMultiPolygonSelectedStyles(feature, resolution);
      case OLGeometryType.GEOMETRY_COLLECTION:
        return this.createGeometryCollectionSelectedStyles(feature, resolution);
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
        AlloyLayerStyleOpacity.Opaque,
        geometryFunction,
      );
    } else if (feature.properties.text) {
      return AlloyIconUtils.createTextIconStyle(
        feature.properties.text,
        colour,
        AlloyLayerStyleOpacity.Opaque,
        geometryFunction,
      );
    }
    return null;
  }

  private createPointStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, feature.properties.scale);
    const styles: OLStyle[] = [];

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    styles.push(
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    );

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
    feature: AlloyCustomFeatureBase,
    resolution: number,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, feature.properties.scale);
    const styles: OLStyle[] = [];

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    styles.push(
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    );

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
    feature: AlloyCustomFeatureBase,
    resolution: number,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const styles: OLStyle[] = [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution, feature.properties.scale),
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
    ];

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to mid point
              AlloyMultiLineStringFunctions.convertGeometryToMidPoint,
            )
          : AlloyLineStringFunctions.convertFeatureToMidPoint,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    return styles;
  }

  private createMultiLineStringStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const styles: OLStyle[] = [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution, feature.properties.scale),
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
    ];

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to mid point
              AlloyMultiLineStringFunctions.convertGeometryToMidPoint,
            )
          : AlloyMultiLineStringFunctions.convertFeatureToMidPoint,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    return styles;
  }

  private createPolygonStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
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
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
    ];

    // add icon support
    const iconStyle = this.createIconOrTextStyle(iconSize, feature, ICON_COLOUR, midPoint);
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        // we already have the mid point so use it
        midPoint,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    return styles;
  }

  private createMultiPolygonStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
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
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
    ];

    // add icon support
    const iconStyle = this.createIconOrTextStyle(iconSize, feature, ICON_COLOUR, midPoint);
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        // we already have the mid point so use it
        midPoint,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }
    return styles;
  }

  private createGeometryCollectionStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointStyles(feature, resolution, true),
      ...this.createMultiPointStyles(feature, resolution, true),
      ...this.createLineStringStyles(feature, resolution, true),
      ...this.createMultiLineStringStyles(feature, resolution, true),
      ...this.createPolygonStyles(feature, resolution, true),
      ...this.createMultiPolygonStyles(feature, resolution, true),
    ];
  }

  private createPointHoverStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, feature.properties.scale);
    const styles: OLStyle[] = [];

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);
    styles.push(
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
    );

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
    feature: AlloyCustomFeatureBase,
    resolution: number,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, feature.properties.scale);
    const styles: OLStyle[] = [];

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);
    styles.push(
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
    );

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
    feature: AlloyCustomFeatureBase,
    resolution: number,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, feature.properties.scale);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);

    const styles: OLStyle[] = [
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

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to mid point
              AlloyMultiLineStringFunctions.convertGeometryToMidPoint,
            )
          : AlloyLineStringFunctions.convertFeatureToMidPoint,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    return styles;
  }

  private createMultiLineStringHoverStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, feature.properties.scale);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);

    const styles: OLStyle[] = [
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

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to mid point
              AlloyMultiLineStringFunctions.convertGeometryToMidPoint,
            )
          : AlloyMultiLineStringFunctions.convertFeatureToMidPoint,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    return styles;
  }

  private createPolygonHoverStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
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
    ];

    // add icon support
    const iconStyle = this.createIconOrTextStyle(iconSize, feature, ICON_COLOUR, midPoint);
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        // we already have the mid point so use it
        midPoint,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    return styles;
  }

  private createMultiPolygonHoverStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
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
    ];

    // add icon support
    const iconStyle = this.createIconOrTextStyle(iconSize, feature, ICON_COLOUR, midPoint);
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        // we already have the mid point so use it
        midPoint,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    return styles;
  }

  private createGeometryCollectionHoverStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointHoverStyles(feature, resolution, true),
      ...this.createMultiPointHoverStyles(feature, resolution, true),
      ...this.createLineStringHoverStyles(feature, resolution, true),
      ...this.createMultiLineStringHoverStyles(feature, resolution, true),
      ...this.createPolygonHoverStyles(feature, resolution, true),
      ...this.createMultiPolygonHoverStyles(feature, resolution, true),
    ];
  }

  private createPointSelectedStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, feature.properties.scale);
    const styles: OLStyle[] = [];

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    styles.push(
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
    );

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
    feature: AlloyCustomFeatureBase,
    resolution: number,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, feature.properties.scale);
    const styles: OLStyle[] = [];

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    styles.push(
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
    );

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
    feature: AlloyCustomFeatureBase,
    resolution: number,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, feature.properties.scale);
    const radius = this.getBallRadius(resolution, feature.properties.scale);

    const styles = [
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
    ];

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to mid point
              AlloyMultiLineStringFunctions.convertGeometryToMidPoint,
            )
          : AlloyLineStringFunctions.convertFeatureToMidPoint,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    styles.push(
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
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
        AlloyLayerStyleOpacity.Opaque,
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
    feature: AlloyCustomFeatureBase,
    resolution: number,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, feature.properties.scale);
    const radius = this.getBallRadius(resolution, feature.properties.scale);

    const styles = [
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
    ];

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        processGeometryCollection
          ? AlloyGeometryFunctionUtils.pipe(
              // if we have geometry collection, first convert to multi line strings
              AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString,
              // then convert to mid point
              AlloyMultiLineStringFunctions.convertGeometryToMidPoint,
            )
          : AlloyMultiLineStringFunctions.convertFeatureToMidPoint,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    styles.push(
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
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
        AlloyLayerStyleOpacity.Opaque,
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
    feature: AlloyCustomFeatureBase,
    resolution: number,
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
    ];

    // add icon support
    const iconStyle = this.createIconOrTextStyle(iconSize, feature, ICON_COLOUR, midPoint);
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        // we already have the mid point so use it
        midPoint,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    return styles;
  }

  private createMultiPolygonSelectedStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
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
    ];

    // add icon support
    const iconStyle = this.createIconOrTextStyle(iconSize, feature, ICON_COLOUR, midPoint);
    if (iconStyle !== null) {
      styles.push(iconStyle);
    }

    // add labelling support
    if (
      feature.properties.labelMode === AlloyLayerStyleLabelMode.Title ||
      feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
    ) {
      const labelStyle = AlloyLabelUtils.createLabelStyle(
        feature.properties.title,
        feature.properties.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
          ? feature.properties.subtitle
          : null,
        feature.properties.colour,
        AlloyLayerStyleScale.Medium,
        // we already have the mid point so use it
        midPoint,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    return styles;
  }

  private createGeometryCollectionSelectedStyles(
    feature: AlloyCustomFeatureBase,
    resolution: number,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointSelectedStyles(feature, resolution, true),
      ...this.createMultiPointSelectedStyles(feature, resolution, true),
      ...this.createLineStringSelectedStyles(feature, resolution, true),
      ...this.createMultiLineStringSelectedStyles(feature, resolution, true),
      ...this.createPolygonSelectedStyles(feature, resolution, true),
      ...this.createMultiPolygonSelectedStyles(feature, resolution, true),
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
