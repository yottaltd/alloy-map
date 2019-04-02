import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../core/AlloyMapError';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyStyleBuilderWithLayerStyles } from '../AlloyStyleBuilderWithLayerStyles';

/**
 * builds styles for item features
 * @ignore
 */
export class AlloyItemStyleBuilder extends AlloyStyleBuilderWithLayerStyles<AlloyItemFeature> {
  /**
   * @override
   */
  protected getKey(feature: AlloyItemFeature, resolution: number): string {
    const layerStyle = this.layerStyles.get(feature.properties.styleId);
    if (!layerStyle) {
      throw new AlloyMapError(1554163769, 'missing layer style: ' + feature.properties.styleId);
    }

    return (
      Math.floor(resolution) +
      ':' +
      (feature.properties.icon || layerStyle.icon) +
      ':' +
      (feature.properties.colour || layerStyle.colour)
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

    return new OLStyle({
      image: new OLCircle({
        radius: 25,
        fill: new OLFill({ color: feature.properties.colour || layerStyle.colour }),
      }),
    });
  }
}
