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
import { AlloyLineStringFunctions } from '../utils/geometry-functions/AlloyLineStringFunctions';
import { AlloyPolygonFunctions } from '../utils/geometry-functions/AlloyPolygonFunctions';

/**
 * the icon colour in the balls
 * @ignore
 */
const ICON_COLOUR = '#ffffff';

/**
 * builds styles for draw features, this can be point, line and polygon geometry
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
      default:
        throw new AlloyMapError(1556272894, 'unsupported geometry type');
    }
  }

  private createPointStyles(resolution: number, feature: AlloyDrawFeature): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(radius, feature.properties.colour, undefined),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(radius, feature.properties.icon, ICON_COLOUR, undefined),
    ];
  }

  private createLineStringStyles(resolution: number, feature: AlloyDrawFeature): OLStyle[] {
    return [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution),
        feature.properties.colour,
        undefined,
      ),
    ];
  }

  private createPolygonStyles(resolution: number, feature: AlloyDrawFeature): OLStyle[] {
    const semiTransparentColour = ColourUtils.semiTransparent(feature.properties.colour);

    // we need to calculate the icon size on a feature by feature basis
    const largestPolygon: OLPolygon = feature.olFeature.getGeometry() as OLPolygon;

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
      AlloyPolygonUtils.createPolygonStyle(semiTransparentColour, undefined),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createPointHoverStyles(resolution: number, feature: AlloyDrawFeature): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);
    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(radius, hoverColour, undefined),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(radius, hoverColour, undefined),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(radius, feature.properties.icon, ICON_COLOUR, undefined),
    ];
  }

  private createLineStringHoverStyles(resolution: number, feature: AlloyDrawFeature): OLStyle[] {
    const width = this.getLineWidth(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);

    return [
      AlloyLineUtils.createLineHaloStyle(width, hoverColour, undefined),
      AlloyLineUtils.createLineStyle(width, hoverColour, undefined),
    ];
  }

  private createPolygonHoverStyles(resolution: number, feature: AlloyDrawFeature): OLStyle[] {
    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);

    // we need to calculate the icon size on a feature by feature basis
    const largestPolygon: OLPolygon = feature.olFeature.getGeometry() as OLPolygon;

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
      AlloyPolygonUtils.createPolygonHaloStyle(hoverColour, undefined),
      AlloyPolygonUtils.createPolygonStyle(hoverColour, undefined),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
        // we already have the mid point so use it
        midPoint,
      ),
    ];
  }

  private createPointSelectedStyles(resolution: number, feature: AlloyDrawFeature): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(radius, feature.properties.colour, undefined),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(radius, feature.properties.colour, undefined),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(radius, feature.properties.icon, ICON_COLOUR, undefined),
    ];
  }

  private createLineStringSelectedStyles(resolution: number, feature: AlloyDrawFeature): OLStyle[] {
    const width = this.getLineWidth(resolution);
    const radius = this.getBallRadius(resolution);

    return [
      AlloyLineUtils.createLineHaloStyle(width, feature.properties.colour, undefined),
      AlloyLineUtils.createLineStyle(width, feature.properties.colour, undefined),
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour,
        AlloyLineStringFunctions.convertFeatureToMidPoint,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        AlloyLineStringFunctions.convertFeatureToMidPoint,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon,
        ICON_COLOUR,
        AlloyLineStringFunctions.convertFeatureToMidPoint,
      ),
    ];
  }

  private createPolygonSelectedStyles(resolution: number, feature: AlloyDrawFeature): OLStyle[] {
    // we need to calculate the icon size on a feature by feature basis
    const largestPolygon: OLPolygon = feature.olFeature.getGeometry() as OLPolygon;

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
      AlloyPolygonUtils.createPolygonHaloStyle(feature.properties.colour, undefined),
      AlloyPolygonUtils.createPolygonStyle(feature.properties.colour, undefined),
      AlloyIconUtils.createAlloyIconStyle(
        iconSize,
        feature.properties.icon,
        ICON_COLOUR,
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
