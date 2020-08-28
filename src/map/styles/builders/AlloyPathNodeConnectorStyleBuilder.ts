import { AlloyMapError } from '@/error/AlloyMapError';
import { AlloyPathNodeConnectorFeature } from '@/map/features/AlloyPathNodeConnectorFeature';
import { AlloyStyleBuilder } from '@/map/styles/AlloyStyleBuilder';
import { StringUtils } from '@/utils/StringUtils';
import OLGeometryType from 'ol/geom/GeometryType';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';

/**
 * builds styles for connectors (line strings)
 * @ignore
 * @internal
 */
export class AlloyPathNodeConnectorStyleBuilder extends AlloyStyleBuilder<
  AlloyPathNodeConnectorFeature
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
  protected getKey(feature: AlloyPathNodeConnectorFeature): string {
    return StringUtils.cacheKeyConcat(feature.properties.colour);
  }

  /**
   * @override
   */
  protected createStyles(feature: AlloyPathNodeConnectorFeature): OLStyle | OLStyle[] {
    if (feature.olFeature.getGeometry().getType() === OLGeometryType.LINE_STRING) {
      return new OLStyle({
        stroke: new OLStroke({
          width: 2,
          color: feature.properties.colour,
          lineCap: 'round',
          lineJoin: 'round',
        }),
      });
    }
    throw new AlloyMapError(1560774555, 'unsupported geometry type');
  }

  /**
   * @override
   */
  protected createHoverStyles(feature: AlloyPathNodeConnectorFeature): OLStyle | OLStyle[] {
    return this.createStyles(feature);
  }

  /**
   * @override
   */
  protected createSelectedStyles(feature: AlloyPathNodeConnectorFeature): OLStyle | OLStyle[] {
    return this.createStyles(feature);
  }
}
