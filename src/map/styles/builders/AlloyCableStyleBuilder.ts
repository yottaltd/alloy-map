/* eslint-disable max-len */

import { AlloyMapError } from '@/error/AlloyMapError';
import { AlloyCableFeature } from '@/map/features/AlloyCableFeature';
import { AlloyCableUnitFeature } from '@/map/features/AlloyCableUnitFeature';
import { AlloyLayerStyleOpacity } from '@/map/styles/AlloyLayerStyleOpacity';
import { AlloyStyleBuilder } from '@/map/styles/AlloyStyleBuilder';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { AlloyBallUtils } from '@/map/styles/utils/AlloyBallUtils';
import { AlloyIconUtils } from '@/map/styles/utils/AlloyIconUtils';
import { AlloyLineUtils } from '@/map/styles/utils/AlloyLineUtils';
import { AlloyScaleUtils } from '@/map/styles/utils/AlloyScaleUtils';
import { AlloyGeometryCollectionFunctions } from '@/map/styles/utils/geometry-functions/AlloyGeometryCollectionFunctions';
import { ColourUtils } from '@/utils/ColourUtils';
import { StringUtils } from '@/utils/StringUtils';
import OLGeometryType from 'ol/geom/GeometryType';
import OLStyle from 'ol/style/Style';

/* eslint-enable max-len */

/**
 * the icon colour for feeds and units
 * @ignore
 */
const ICON_COLOUR = '#ffffff';
/**
 * builds styles for cable features,
 * this has to be points (for feeds) or linestrings (for cables)
 * @ignore
 * @internal
 */
export class AlloyCableStyleBuilder extends AlloyStyleBuilder<
  AlloyCableFeature | AlloyCableUnitFeature
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
    feature: AlloyCableFeature | AlloyCableUnitFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): string {
    return StringUtils.cacheKeyConcat(
      resolution,
      state,
      feature.olFeature.getId(), // each cable feature is unique (expensive)
      feature instanceof AlloyCableUnitFeature ? feature.properties.icon : undefined,
      feature.olFeature.getRevision(),
    );
  }

  /**
   * @override
   */
  protected createStyles(
    feature: AlloyCableFeature | AlloyCableUnitFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    const geometryType = feature.olFeature.getGeometry().getType();
    if (geometryType === OLGeometryType.POINT && feature instanceof AlloyCableUnitFeature) {
      return this.createCableUnitStyles(resolution, feature);
    } else if (
      geometryType === OLGeometryType.LINE_STRING &&
      feature instanceof AlloyCableFeature
    ) {
      return this.createCableStyles(resolution, feature);
    }
    throw new AlloyMapError(1559408789, 'unsupported geometry type');
  }

  /**
   * @override
   */
  protected createHoverStyles(
    feature: AlloyCableFeature | AlloyCableUnitFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    const geometryType = feature.olFeature.getGeometry().getType();
    if (geometryType === OLGeometryType.POINT && feature instanceof AlloyCableUnitFeature) {
      return this.createCableUnitHoverStyles(resolution, feature);
    } else if (
      geometryType === OLGeometryType.LINE_STRING &&
      feature instanceof AlloyCableFeature
    ) {
      return this.createCableHoverStyles(resolution, feature);
    }
    throw new AlloyMapError(1561046423, 'unsupported geometry type');
  }

  /**
   * @override
   */
  protected createSelectedStyles(
    feature: AlloyCableFeature | AlloyCableUnitFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    const geometryType = feature.olFeature.getGeometry().getType();
    if (geometryType === OLGeometryType.POINT && feature instanceof AlloyCableUnitFeature) {
      return this.createCableUnitSelectedStyles(resolution, feature);
    } else if (
      geometryType === OLGeometryType.LINE_STRING &&
      feature instanceof AlloyCableFeature
    ) {
      return this.createCableSelectedStyles(resolution, feature);
    }
    throw new AlloyMapError(1561046431, 'unsupported geometry type');
  }

  private createCableUnitStyles(
    resolution: number,
    feature: AlloyCableUnitFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    const styles = [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeaturePointsToMultiPoint
          : undefined,
      ),
    ];
    if (feature.properties.icon) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          feature.properties.icon,
          ICON_COLOUR,
          AlloyLayerStyleOpacity.Opaque,
        ),
      );
    }
    return styles;
  }

  private createCableStyles(
    resolution: number,
    feature: AlloyCableFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);

    return [
      AlloyLineUtils.createLineStyle(
        width,
        feature.properties.colour,
        AlloyLayerStyleOpacity.Opaque,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.convertFeatureLineStringsToMultiLineString
          : undefined,
      ),
    ];
  }

  private createCableUnitHoverStyles(
    resolution: number,
    feature: AlloyCableUnitFeature,
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
    ];
    if (feature.properties.icon) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          feature.properties.icon,
          ICON_COLOUR,
          AlloyLayerStyleOpacity.Opaque,
        ),
      );
    }
    return styles;
  }

  private createCableHoverStyles(
    resolution: number,
    feature: AlloyCableFeature,
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

  private createCableUnitSelectedStyles(
    resolution: number,
    feature: AlloyCableUnitFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    const styles = [
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
    ];
    if (feature.properties.icon) {
      // the icon of the item
      styles.push(
        AlloyIconUtils.createAlloyIconStyle(
          radius,
          feature.properties.icon,
          ICON_COLOUR,
          AlloyLayerStyleOpacity.Opaque,
        ),
      );
    }
    return styles;
  }

  private createCableSelectedStyles(
    resolution: number,
    feature: AlloyCableFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);

    return [
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
