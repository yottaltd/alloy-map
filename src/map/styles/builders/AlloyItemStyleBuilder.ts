import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { ColourUtils } from '../../../utils/ColourUtils';
import { StringUtils } from '../../../utils/StringUtils';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyLayerStyle } from '../AlloyLayerStyle';
import { AlloyStyleBuilderBuildState } from '../AlloyStyleBuilderBuildState';
import { AlloyStyleBuilderWithLayerStyles } from '../AlloyStyleBuilderWithLayerStyles';
import { AlloyBallUtils } from '../utils/AlloyBallUtils';
import { AlloyGeometryCollectionFunctions } from '../utils/AlloyGeometryCollectionFunctions';
import { AlloyIconUtils } from '../utils/AlloyIconUtils';
import { AlloyLineUtils } from '../utils/AlloyLineUtils';
import { AlloyPolygonUtils } from '../utils/AlloyPolygonUtils';
import { AlloyScaleUtils } from '../utils/AlloyScaleUtils';

/**
 * the icon colour in the balls
 * @ignore
 */
const ICON_COLOUR = '#ffffff';

/**
 * builds styles for item features, this can be any type of geometry
 * @ignore
 */
export class AlloyItemStyleBuilder extends AlloyStyleBuilderWithLayerStyles<AlloyItemFeature> {
  /**
   * @override
   */
  protected getKey(
    feature: AlloyItemFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): string {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163769, 'missing layer style: ' + feature.properties.styleId);
    }

    return StringUtils.cacheKeyConcat(
      state,
      Math.floor(resolution),
      feature.properties.icon || layerStyle.icon,
      feature.properties.colour || layerStyle.colour,
      // need to key on geometry type as we support everything
      feature.olFeature.getGeometry().getType(),
    );
  }

  /**
   * @override
   */
  protected createStyles(
    feature: AlloyItemFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163777, 'missing layer style: ' + feature.properties.styleId);
    }

    switch (feature.olFeature.getGeometry().getType()) {
      case 'Point':
        return this.createPointStyles(resolution, feature, layerStyle);
      case 'LineString':
        return this.createLineStringStyles(resolution, feature, layerStyle);
      case 'Polygon':
        return this.createPolygonStyles(resolution, feature, layerStyle);
      case 'MultiPoint':
        return this.createMultiPointStyles(resolution, feature, layerStyle);
      case 'MultiLineString':
        return this.createMultiLineStringStyles(resolution, feature, layerStyle);
      case 'MultiPolygon':
        return this.createMultiPolygonStyles(resolution, feature, layerStyle);
      case 'GeometryCollection':
        return this.createGeometryCollectionStyles(resolution, feature, layerStyle);
      default:
        throw new AlloyMapError(1554458665, 'unsupported geometry type');
    }
  }

  /**
   * @override
   */
  protected createHoverStyles(
    feature: AlloyItemFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554419738, 'missing layer style: ' + feature.properties.styleId);
    }

    switch (feature.olFeature.getGeometry().getType()) {
      case 'Point':
        return this.createPointHoverStyles(resolution, feature, layerStyle);
      case 'LineString':
        return this.createLineStringHoverStyles(resolution, feature, layerStyle);
      case 'Polygon':
        return this.createPolygonHoverStyles(resolution, feature, layerStyle);
      case 'MultiPoint':
        return this.createMultiPointHoverStyles(resolution, feature, layerStyle);
      case 'MultiLineString':
        return this.createMultiLineStringHoverStyles(resolution, feature, layerStyle);
      case 'MultiPolygon':
        return this.createMultiPolygonHoverStyles(resolution, feature, layerStyle);
      case 'GeometryCollection':
        return this.createGeometryCollectionHoverStyles(resolution, feature, layerStyle);
      default:
        throw new AlloyMapError(1554458665, 'unsupported geometry type');
    }
  }

  /**
   * @override
   */
  protected createSelectedStyles(
    feature: AlloyItemFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554419738, 'missing layer style: ' + feature.properties.styleId);
    }

    switch (feature.olFeature.getGeometry().getType()) {
      case 'Point':
        return this.createPointSelectedStyles(resolution, feature, layerStyle);
      case 'LineString':
        return this.createLineStringSelectedStyles(resolution, feature, layerStyle);
      case 'Polygon':
        return this.createPolygonSelectedStyles(resolution, feature, layerStyle);
      case 'MultiPoint':
        return this.createMultiPointSelectedStyles(resolution, feature, layerStyle);
      case 'MultiLineString':
        return this.createMultiLineStringSelectedStyles(resolution, feature, layerStyle);
      case 'MultiPolygon':
        return this.createMultiPolygonSelectedStyles(resolution, feature, layerStyle);
      case 'GeometryCollection':
        return this.createGeometryCollectionSelectedStyles(resolution, feature, layerStyle);
      default:
        throw new AlloyMapError(1554458665, 'unsupported geometry type');
    }
  }

  private createPointStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection ? AlloyGeometryCollectionFunctions.TO_POINT_FUNCTION : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        processGeometryCollection ? AlloyGeometryCollectionFunctions.TO_POINT_FUNCTION : undefined,
      ),
    ];
  }

  private createMultiPointStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_POINT_FUNCTION
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_POINT_FUNCTION
          : undefined,
      ),
    ];
  }

  private createLineStringStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    return [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution),
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_LINESTRING_FUNCTION
          : undefined,
      ),
    ];
  }

  private createMultiLineStringStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    return [
      AlloyLineUtils.createLineStyle(
        this.getLineWidth(resolution),
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_LINESTRING_FUNCTION
          : undefined,
      ),
    ];
  }

  private createPolygonStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const semiTransparentColour = ColourUtils.semiTransparent(
      feature.properties.colour || layerStyle.colour,
    );
    return [
      AlloyPolygonUtils.createPolygonStyle(
        semiTransparentColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_POLYGON_FUNCTION
          : undefined,
      ),
    ];
  }

  private createMultiPolygonStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const semiTransparentColour = ColourUtils.semiTransparent(
      feature.properties.colour || layerStyle.colour,
    );
    return [
      AlloyPolygonUtils.createPolygonStyle(
        semiTransparentColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_POLYGON_FUNCTION
          : undefined,
      ),
    ];
  }

  private createGeometryCollectionStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointStyles(resolution, feature, layerStyle, true),
      ...this.createMultiPointStyles(resolution, feature, layerStyle, true),
      ...this.createLineStringStyles(resolution, feature, layerStyle, true),
      ...this.createMultiLineStringStyles(resolution, feature, layerStyle, true),
      ...this.createPolygonStyles(resolution, feature, layerStyle, true),
      ...this.createMultiPolygonStyles(resolution, feature, layerStyle, true),
    ];
  }

  private createPointHoverStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(
      feature.properties.colour || layerStyle.colour,
    );
    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        hoverColour,
        processGeometryCollection ? AlloyGeometryCollectionFunctions.TO_POINT_FUNCTION : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        hoverColour,
        processGeometryCollection ? AlloyGeometryCollectionFunctions.TO_POINT_FUNCTION : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        processGeometryCollection ? AlloyGeometryCollectionFunctions.TO_POINT_FUNCTION : undefined,
      ),
    ];
  }

  private createMultiPointHoverStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(
      feature.properties.colour || layerStyle.colour,
    );
    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_POINT_FUNCTION
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_POINT_FUNCTION
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_POINT_FUNCTION
          : undefined,
      ),
    ];
  }

  private createLineStringHoverStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(
      feature.properties.colour || layerStyle.colour,
    );

    return [
      AlloyLineUtils.createLineHaloStyle(
        width,
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_LINESTRING_FUNCTION
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_LINESTRING_FUNCTION
          : undefined,
      ),
    ];
  }

  private createMultiLineStringHoverStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);

    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(
      feature.properties.colour || layerStyle.colour,
    );

    return [
      AlloyLineUtils.createLineHaloStyle(
        width,
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_LINESTRING_FUNCTION
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_LINESTRING_FUNCTION
          : undefined,
      ),
    ];
  }

  private createPolygonHoverStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(
      feature.properties.colour || layerStyle.colour,
    );

    return [
      AlloyPolygonUtils.createPolygonHaloStyle(
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_POLYGON_FUNCTION
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_POLYGON_FUNCTION
          : undefined,
      ),
    ];
  }

  private createMultiPolygonHoverStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    // modified hover colour
    const hoverColour = ColourUtils.lightenBackground(
      feature.properties.colour || layerStyle.colour,
    );

    return [
      AlloyPolygonUtils.createPolygonHaloStyle(
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_POLYGON_FUNCTION
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        hoverColour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_POLYGON_FUNCTION
          : undefined,
      ),
    ];
  }

  private createGeometryCollectionHoverStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointHoverStyles(resolution, feature, layerStyle, true),
      ...this.createMultiPointHoverStyles(resolution, feature, layerStyle, true),
      ...this.createLineStringHoverStyles(resolution, feature, layerStyle, true),
      ...this.createMultiLineStringHoverStyles(resolution, feature, layerStyle, true),
      ...this.createPolygonHoverStyles(resolution, feature, layerStyle, true),
      ...this.createMultiPolygonHoverStyles(resolution, feature, layerStyle, true),
    ];
  }

  private createPointSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection ? AlloyGeometryCollectionFunctions.TO_POINT_FUNCTION : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection ? AlloyGeometryCollectionFunctions.TO_POINT_FUNCTION : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        processGeometryCollection ? AlloyGeometryCollectionFunctions.TO_POINT_FUNCTION : undefined,
      ),
    ];
  }

  private createMultiPointSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const radius = this.getBallRadius(resolution);

    return [
      // the halo circle
      AlloyBallUtils.createBallHaloStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_POINT_FUNCTION
          : undefined,
      ),
      // the background coloured circle
      AlloyBallUtils.createBallStyle(
        radius,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_POINT_FUNCTION
          : undefined,
      ),
      // the icon of the item
      AlloyIconUtils.createAlloyIconStyle(
        radius,
        feature.properties.icon || layerStyle.icon,
        ICON_COLOUR,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_POINT_FUNCTION
          : undefined,
      ),
    ];
  }

  private createLineStringSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);

    return [
      AlloyLineUtils.createLineHaloStyle(
        width,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_LINESTRING_FUNCTION
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_LINESTRING_FUNCTION
          : undefined,
      ),
    ];
  }

  private createMultiLineStringSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    const width = this.getLineWidth(resolution);

    return [
      AlloyLineUtils.createLineHaloStyle(
        width,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_LINESTRING_FUNCTION
          : undefined,
      ),
      AlloyLineUtils.createLineStyle(
        width,
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_LINESTRING_FUNCTION
          : undefined,
      ),
    ];
  }

  private createPolygonSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    return [
      AlloyPolygonUtils.createPolygonHaloStyle(
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_POLYGON_FUNCTION
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_POLYGON_FUNCTION
          : undefined,
      ),
    ];
  }

  private createMultiPolygonSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
    processGeometryCollection?: boolean,
  ): OLStyle[] {
    return [
      AlloyPolygonUtils.createPolygonHaloStyle(
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_POLYGON_FUNCTION
          : undefined,
      ),
      AlloyPolygonUtils.createPolygonStyle(
        feature.properties.colour || layerStyle.colour,
        processGeometryCollection
          ? AlloyGeometryCollectionFunctions.TO_MULTI_POLYGON_FUNCTION
          : undefined,
      ),
    ];
  }

  private createGeometryCollectionSelectedStyles(
    resolution: number,
    feature: AlloyItemFeature,
    layerStyle: AlloyLayerStyle,
  ): OLStyle[] {
    return [
      // pass extra flag to process geometry collection on all these style rules, this will
      // recursively transform a geometry collections data into its respective types for the style
      ...this.createPointSelectedStyles(resolution, feature, layerStyle, true),
      ...this.createMultiPointSelectedStyles(resolution, feature, layerStyle, true),
      ...this.createLineStringSelectedStyles(resolution, feature, layerStyle, true),
      ...this.createMultiLineStringSelectedStyles(resolution, feature, layerStyle, true),
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
