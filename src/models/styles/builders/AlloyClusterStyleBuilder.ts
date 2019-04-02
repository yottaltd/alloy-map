import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../core/AlloyMapError';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyStyleBuilderWithLayerStyles } from '../AlloyStyleBuilderWithLayerStyles';

/**
 * builds styles for cluster features
 * @ignore
 */
export class AlloyClusterStyleBuilder extends AlloyStyleBuilderWithLayerStyles<
  AlloyClusterFeature
> {
  /**
   * @override
   */
  protected getKey(feature: AlloyClusterFeature, resolution: number): string {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163345, 'missing layer style: ' + feature.properties.styleId);
    }

    return Math.floor(resolution) + ':' + layerStyle.icon + ':' + layerStyle.colour;
  }

  /**
   * @override
   */
  protected createStyles(feature: AlloyClusterFeature, resolution: number): OLStyle | OLStyle[] {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163016, 'missing layer style: ' + feature.properties.styleId);
    }

    return new OLStyle({
      image: new OLCircle({
        radius: 10,
        fill: new OLFill({ color: layerStyle.colour }),
      }),
    });
  }
}
