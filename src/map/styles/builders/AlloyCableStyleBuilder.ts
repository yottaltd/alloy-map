import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { ColourUtils } from '../../../utils/ColourUtils';
import { StringUtils } from '../../../utils/StringUtils';
import { AlloyCableFeature } from '../../features/AlloyCableFeature';
import { AlloyCableUnitFeature } from '../../features/AlloyCableUnitFeature';
import { AlloyStyleBuilder } from '../AlloyStyleBuilder';
import { AlloyBallUtils } from '../utils/AlloyBallUtils';
import { AlloyIconUtils } from '../utils/AlloyIconUtils';
import { AlloyLineUtils } from '../utils/AlloyLineUtils';
import { AlloyScaleUtils } from '../utils/AlloyScaleUtils';
// tslint:disable-next-line: max-line-length
import { AlloyGeometryCollectionFunctions } from '../utils/geometry-functions/AlloyGeometryCollectionFunctions';

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
  protected getKey(feature: AlloyCableFeature | AlloyCableUnitFeature, resolution: number): string {
    return StringUtils.cacheKeyConcat(resolution, feature.properties.colour);
  }

  /**
   * @override
   */
  protected createStyles(
    feature: AlloyCableFeature | AlloyCableUnitFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    const geometryType = feature.olFeature.getGeometry().getType();
    if (geometryType === 'Point' && feature instanceof AlloyCableUnitFeature) {
      return this.createCableUnitStyles(resolution, feature);
    } else if (geometryType === 'LineString' && feature instanceof AlloyCableFeature) {
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
    return this.createStyles(feature, resolution);
  }

  /**
   * @override
   */
  protected createSelectedStyles(
    feature: AlloyCableFeature | AlloyCableUnitFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    return this.createStyles(feature, resolution);
  }

  private createCableUnitStyles(
    resolution: number,
    feature: AlloyCableUnitFeature,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(feature.properties.colour);
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
      AlloyIconUtils.createAlloyIconStyle(radius, feature.properties.icon, ICON_COLOUR),
    ];
  }

  private createCableStyles(
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
  private getLineWidth(resolution: number, scale?: boolean): number {
    return (
      AlloyScaleUtils.LINE_WIDTH_MAX * AlloyScaleUtils.getScaleMultiplierForResolution(resolution)
    );
  }
}
