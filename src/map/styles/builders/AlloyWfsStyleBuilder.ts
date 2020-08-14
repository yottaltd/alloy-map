/* eslint-disable max-len */

import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLGeometryType from 'ol/geom/GeometryType';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPolygon from 'ol/geom/Polygon';
import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { ColourUtils } from '../../../utils/ColourUtils';
import { StringUtils } from '../../../utils/StringUtils';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyWfsFeature } from '../../features/AlloyWfsFeature';
import { AlloyLayerStyleLabelMode } from '../AlloyLayerStyleLabelMode';
import { AlloyLayerStyleOpacity } from '../AlloyLayerStyleOpacity';
import { AlloyStyleBuilderBuildState } from '../AlloyStyleBuilderBuildState';
import { AlloyStyleBuilderWithLayerStyles } from '../AlloyStyleBuilderWithLayerStyles';
import { AlloyWfsLayerStyle } from '../AlloyWfsLayerStyle';
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
import { AlloyLayerStyleScale } from '../AlloyLayerStyleScale';

/* eslint-enable max-len */

/**
 * the icon colour in the balls
 * @ignore
 */
const ICON_COLOUR = '#ffffff';

/**
 * builds styles for Wfs features, this can be any type of geometry
 * @ignore
 * @internal
 */
export class AlloyWfsStyleBuilder extends AlloyStyleBuilderWithLayerStyles<
  AlloyWfsFeature,
  AlloyWfsLayerStyle
> {
  /**
   * shame we need a reference to the map :( but its for calculating coord to pixel coord transforms
   */
  private readonly map: AlloyMap;

  /**
   * creates a new instance
   * @param map the map instance for calculations
   */
  constructor(map: AlloyMap, styles: Readonly<AlloyWfsLayerStyle[]>) {
    super(styles);
    this.map = map;
  }

  /**
   * @override
   */
  protected getKey(
    feature: AlloyWfsFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): string {
    const layerStyle = this.layerStyles.get(feature.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1562245691, 'missing layer style: ' + feature.styleId);
    }
    const type = feature.getExpectedGeometry().getType();
    return StringUtils.cacheKeyConcat(
      state,
      resolution,
      layerStyle.colour,
      layerStyle.scale !== AlloyLayerStyleScale.Tiny ? layerStyle.icon : undefined,
      // if polygon then we need to cache per feature due to centre of polygon calcuations
      type === OLGeometryType.POLYGON || type === OLGeometryType.MULTI_POLYGON
        ? feature.id
        : undefined,
      // if we have titles and we are in title mode then we need to cache on them
      !!layerStyle.labelTitle &&
        (layerStyle.labelMode === AlloyLayerStyleLabelMode.Title ||
          layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle)
        ? feature.olFeature.get(layerStyle.labelTitle)
        : undefined,
      // if we have subtitles and we are in subtitle mode then we need to cache on them
      !!layerStyle.labelSubtitle &&
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle
        ? feature.olFeature.get(layerStyle.labelSubtitle)
        : undefined,
      state === AlloyStyleBuilderBuildState.Default ? layerStyle.opacity.value : 1,
    );
  }

  /**
   * @override
   */
  protected createStyles(feature: AlloyWfsFeature, resolution: number): OLStyle | OLStyle[] {
    const layerStyle = this.layerStyles.get(feature.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1562245633, 'missing layer style: ' + feature.styleId);
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
        throw new AlloyMapError(1556117088, 'unsupported geometry type');
    }
  }

  /**
   * @override
   */
  protected createHoverStyles(feature: AlloyWfsFeature, resolution: number): OLStyle | OLStyle[] {
    const layerStyle = this.layerStyles.get(feature.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1562245628, 'missing layer style: ' + feature.styleId);
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
        throw new AlloyMapError(1556117120, 'unsupported geometry type');
    }
  }

  /**
   * @override
   */
  protected createSelectedStyles(
    feature: AlloyWfsFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    const layerStyle = this.layerStyles.get(feature.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1562245706, 'missing layer style: ' + feature.styleId);
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
        throw new AlloyMapError(1556117154, 'unsupported geometry type');
    }
  }

  private createPointStyles(
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, this.getStyleScale(layerStyle.scale));
    const styles: OLStyle[] = [];

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
        layerStyle.colour,
        layerStyle.opacity,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    );

    // add icon support
    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, this.getStyleScale(layerStyle.scale));
    const styles: OLStyle[] = [];

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
        layerStyle.colour,
        layerStyle.opacity,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    );

    // add icon support
    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const styles: OLStyle[] = [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution, this.getStyleScale(layerStyle.scale)),
        layerStyle.colour,
        layerStyle.opacity,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
    ];

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const styles: OLStyle[] = [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution, this.getStyleScale(layerStyle.scale)),
        layerStyle.colour,
        layerStyle.opacity,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
    ];

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
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

    // add icon support
    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          layerStyle.opacity,
          midPoint,
        ),
      );
    }

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
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

    // add icon support
    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          layerStyle.opacity,
          midPoint,
        ),
      );
    }

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, this.getStyleScale(layerStyle.scale));
    const styles: OLStyle[] = [];

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);
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

    // add icon support
    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          AlloyLayerStyleOpacity.Opaque,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createMultiPointHoverStyles(
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, this.getStyleScale(layerStyle.scale));
    const styles: OLStyle[] = [];

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      );
      if (labelStyle) {
        styles.push(labelStyle);
      }
    }

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);
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

    // add icon support
    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          AlloyLayerStyleOpacity.Opaque,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createLineStringHoverStyles(
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, this.getStyleScale(layerStyle.scale));

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);

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
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, this.getStyleScale(layerStyle.scale));

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(layerStyle.colour);

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
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
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
    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          AlloyLayerStyleOpacity.Opaque,
          midPoint,
        ),
      );
    }

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
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
    if (layerStyle.icon) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          iconSize,
          layerStyle.icon,
          ICON_COLOUR,
          AlloyLayerStyleOpacity.Opaque,
          midPoint,
        ),
      );
    }

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, this.getStyleScale(layerStyle.scale));
    const styles: OLStyle[] = [];

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
        layerStyle.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        layerStyle.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    );

    // add icon support
    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          AlloyLayerStyleOpacity.Opaque,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createMultiPointSelectedStyles(
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution, this.getStyleScale(layerStyle.scale));
    const styles: OLStyle[] = [];

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
        layerStyle.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        layerStyle.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
          : undefined,
      ),
    );

    // add icon support
    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
          AlloyLayerStyleOpacity.Opaque,
          processGeometryCollection
            ? AlloyGeometryCollectionFunctions.convertFeatureMultiPointsToMultiPoint
            : undefined,
        ),
      );
    }

    return styles;
  }

  private createLineStringSelectedStyles(
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, this.getStyleScale(layerStyle.scale));
    const radius = this.getBallRadius(resolution, this.getStyleScale(layerStyle.scale));

    const styles = [
      AlloyLineUtils.createLineHaloStyle(
        width,
        layerStyle.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        layerStyle.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
    ];

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
        layerStyle.colour,
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
        layerStyle.colour,
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

    // add icon support
    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
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
    }

    return styles;
  }

  private createMultiLineStringSelectedStyles(
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution, this.getStyleScale(layerStyle.scale));
    const radius = this.getBallRadius(resolution, this.getStyleScale(layerStyle.scale));

    const styles = [
      AlloyLineUtils.createLineHaloStyle(
        width,
        layerStyle.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        layerStyle.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiLineStringsToMultiLineString
          : undefined,
      ),
    ];

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
        layerStyle.colour,
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
        layerStyle.colour,
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

    if (layerStyle.icon && layerStyle.scale !== AlloyLayerStyleScale.Tiny) {
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          layerStyle.icon,
          ICON_COLOUR,
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
    }

    return styles;
  }

  private createPolygonSelectedStyles(
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
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
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        layerStyle.colour,
        AlloyLayerStyleOpacity.Opaque,
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
          AlloyLayerStyleOpacity.Opaque,
          midPoint,
        ),
      );
    }

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
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
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureMultiPolygonsToMultiPolygon
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        layerStyle.colour,
        AlloyLayerStyleOpacity.Opaque,
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
          AlloyLayerStyleOpacity.Opaque,
          midPoint,
        ),
      );
    }

    // add labelling support
    if (layerStyle.labelMode !== AlloyLayerStyleLabelMode.None) {
      // parse the title and subtitle
      const { title, subtitle } = this.tryGetFeatureTitleAndSubtitle(layerStyle, feature);

      const labelStyle = AlloyLabelUtils.createLabelStyle(
        title,
        layerStyle.labelMode === AlloyLayerStyleLabelMode.TitleAndSubtitle ? subtitle : null,
        layerStyle.colour,
        this.getStyleScale(layerStyle.scale),
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
    feature: AlloyWfsFeature,
    resolution: number,
    layerStyle: AlloyWfsLayerStyle,
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

  /**
   * tries to get the title and subtitle from a wfs feature
   * @param layerStyle the layer style with keys to get from the feature
   * @param feature the feature to get the values from
   */
  private tryGetFeatureTitleAndSubtitle(
    layerStyle: AlloyWfsLayerStyle,
    feature: AlloyWfsFeature,
  ): {
    title?: string;
    subtitle?: string;
  } {
    const titleValue = layerStyle.labelTitle
      ? feature.olFeature.get(layerStyle.labelTitle)
      : undefined;
    const subtitleValue = layerStyle.labelSubtitle
      ? feature.olFeature.get(layerStyle.labelSubtitle)
      : undefined;
    return {
      title: titleValue !== undefined && titleValue !== null ? String(titleValue) : undefined,
      subtitle:
        subtitleValue !== undefined && subtitleValue !== null ? String(subtitleValue) : undefined,
    };
  }

  /**
   * Returns provided scale or default
   * @param scale this style scale or null
   */
  private getStyleScale(scale: AlloyLayerStyleScale | null): AlloyLayerStyleScale {
    return scale || AlloyLayerStyleScale.Medium;
  }
}
