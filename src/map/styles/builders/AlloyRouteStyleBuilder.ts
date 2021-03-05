/* eslint-disable max-len */

import { AlloyMapError } from '@/error/AlloyMapError';
import { AlloyRouteFeature } from '@/map/features/AlloyRouteFeature';
import { AlloyRouteWaypointFeature } from '@/map/features/AlloyRouteWaypointFeature';
import { AlloyLayerStyleOpacity } from '@/map/styles/AlloyLayerStyleOpacity';
import { AlloyLayerStyleScale } from '@/map/styles/AlloyLayerStyleScale';
import { AlloyStyleBuilder } from '@/map/styles/AlloyStyleBuilder';
import { AlloyStyleCacheKey } from '@/map/styles/cache/AlloyStyleCacheKey';
import { AlloyStyleCacheKeyBuilder } from '@/map/styles/cache/AlloyStyleCacheKeyBuilder';
import { AlloyBallUtils } from '@/map/styles/utils/AlloyBallUtils';
import { AlloyIconUtils } from '@/map/styles/utils/AlloyIconUtils';
import { AlloyLabelUtils } from '@/map/styles/utils/AlloyLabelUtils';
import { AlloyLineUtils } from '@/map/styles/utils/AlloyLineUtils';
import { AlloyScaleUtils } from '@/map/styles/utils/AlloyScaleUtils';
import { AlloyGeometryCollectionFunctions } from '@/map/styles/utils/geometry-functions/AlloyGeometryCollectionFunctions';
import { ColourUtils } from '@/utils/ColourUtils';
import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLGeometryType from 'ol/geom/GeometryType';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';

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
  ): AlloyStyleCacheKey {
    return AlloyStyleCacheKeyBuilder.create({
      resolution,
      featureId: feature.olFeature.getId(), // each route feature is unique (expensive)
      colour: feature.properties.colour,
      title: feature instanceof AlloyRouteWaypointFeature ? feature.properties.title : undefined,
      subtitle:
        feature instanceof AlloyRouteWaypointFeature ? feature.properties.subtitle : undefined,
      icon:
        feature instanceof AlloyRouteWaypointFeature
          ? feature.properties.icon || feature.properties.text
          : undefined,
      revision: feature.olFeature.getRevision(),
    });
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
