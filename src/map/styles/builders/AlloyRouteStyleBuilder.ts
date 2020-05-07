/* eslint-disable max-len */

import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLGeometryType from 'ol/geom/GeometryType';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { ColourUtils } from '../../../utils/ColourUtils';
import { StringUtils } from '../../../utils/StringUtils';
import { AlloyRouteFeature } from '../../features/AlloyRouteFeature';
import { AlloyRouteWaypointFeature } from '../../features/AlloyRouteWaypointFeature';
import { AlloyLayerStyleOpacity } from '../AlloyLayerStyleOpacity';
import { AlloyLayerStyleScale } from '../AlloyLayerStyleScale';
import { AlloyStyleBuilder } from '../AlloyStyleBuilder';
import { AlloyBallUtils } from '../utils/AlloyBallUtils';
import { AlloyIconUtils } from '../utils/AlloyIconUtils';
import { AlloyLabelUtils } from '../utils/AlloyLabelUtils';
import { AlloyLineUtils } from '../utils/AlloyLineUtils';
import { AlloyScaleUtils } from '../utils/AlloyScaleUtils';
import { AlloyGeometryCollectionFunctions } from '../utils/geometry-functions/AlloyGeometryCollectionFunctions';

/* eslint-enable max-len */

/**
 * the icon colour in the balls
 * @ignore
 */
const ICON_COLOUR = '#ffffff';

/**
 * builds styles for route features,
 * this has to be points (for waypoints) or linestrings (for route)
 * @ignore
 * @internal
 */
export class AlloyRouteStyleBuilder extends AlloyStyleBuilder<
  AlloyRouteFeature | AlloyRouteWaypointFeature
> {
  /**
   * creates a new instance
   * @ignore
   * @internal
   */
  constructor() {
    super();
  }

  /**
   * @override
   */
  protected getKey(
    feature: AlloyRouteFeature | AlloyRouteWaypointFeature,
    resolution: number,
  ): string {
    return StringUtils.cacheKeyConcat(
      resolution,
      feature.id, // each route feature is unique (expensive)
      feature.properties.colour,
      feature instanceof AlloyRouteWaypointFeature ? feature.properties.title : undefined,
      feature instanceof AlloyRouteWaypointFeature ? feature.properties.subtitle : undefined,
      feature instanceof AlloyRouteWaypointFeature
        ? feature.properties.icon || feature.properties.text
        : undefined,
      feature.olFeature.getRevision(),
    );
  }

  /**
   * @override
   */
  protected createStyles(
    feature: AlloyRouteFeature | AlloyRouteWaypointFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    const geometryType = feature.olFeature.getGeometry().getType();
    if (geometryType === OLGeometryType.POINT && feature instanceof AlloyRouteWaypointFeature) {
      return this.createRouteWaypointStyles(resolution, feature);
    } else if (
      geometryType === OLGeometryType.LINE_STRING &&
      feature instanceof AlloyRouteFeature
    ) {
      return this.createRouteStyles(resolution, feature);
    }
    throw new AlloyMapError(1559453941, 'unsupported geometry type');
  }

  /**
   * @override
   */
  protected createHoverStyles(
    feature: AlloyRouteFeature | AlloyRouteWaypointFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    return this.createStyles(feature, resolution);
  }

  /**
   * @override
   */
  protected createSelectedStyles(
    feature: AlloyRouteFeature | AlloyRouteWaypointFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    return this.createStyles(feature, resolution);
  }

  private createIconStyle(
    radius: number,
    feature: AlloyRouteWaypointFeature,
    colour: string,
    geometryFunction?: OLGeometry | ((olFeature: OLFeature | OLRenderFeature) => OLGeometry),
  ): OLStyle {
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
    } else {
      throw new AlloyMapError(1558971976, 'Route waypoint style requires an icon or text');
    }
  }

  private createRouteWaypointStyles(
    resolution: number,
    feature: AlloyRouteWaypointFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);
    const styles = [
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
      this.createIconStyle(
        radius,
        feature,
        ICON_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    ];
    const labelStyle = AlloyLabelUtils.createLabelStyle(
      feature.properties.title,
      feature.properties.subtitle,
      hoverColour,
      AlloyLayerStyleScale.Medium,
      processGeometryCollection
        ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
        : undefined,
    );
    if (labelStyle) {
      styles.push(labelStyle);
    }
    return styles;
  }

  private createRouteStyles(
    resolution: number,
    feature: AlloyRouteFeature,
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
