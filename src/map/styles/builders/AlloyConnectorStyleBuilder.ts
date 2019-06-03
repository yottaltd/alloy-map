import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { StringUtils } from '../../../utils/StringUtils';
import { AlloyConnectorFeature } from '../../features/AlloyConnectorFeature';
import { AlloyStyleBuilder } from '../AlloyStyleBuilder';

/**
 * builds styles for connectors (line strings)
 * @ignore
 * @internal
 */
export class AlloyConnectorStyleBuilder extends AlloyStyleBuilder<AlloyConnectorFeature> {
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
  protected getKey(feature: AlloyConnectorFeature, resolution: number): string {
    return StringUtils.cacheKeyConcat(feature.properties.colour);
  }

  /**
   * @override
   */
  protected createStyles(feature: AlloyConnectorFeature, resolution: number): OLStyle | OLStyle[] {
    if (feature.olFeature.getGeometry().getType() === 'LineString') {
      return new OLStyle({
        stroke: new OLStroke({
          width: 2,
          color: feature.properties.colour,
          lineCap: 'round',
          lineJoin: 'round',
        }),
      });
    }
    throw new AlloyMapError(1559408789, 'unsupported geometry type');
  }

  /**
   * @override
   */
  protected createHoverStyles(
    feature: AlloyConnectorFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    return this.createStyles(feature, resolution);
  }

  /**
   * @override
   */
  protected createSelectedStyles(
    feature: AlloyConnectorFeature,
    resolution: number,
  ): OLStyle | OLStyle[] {
    return this.createStyles(feature, resolution);
  }
}
