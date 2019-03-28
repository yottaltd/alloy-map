import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { AlloyStyleFunction } from '../AlloyStyleFunction';

export class AlloyClusterStyleFunction extends AlloyStyleFunction {
  public func(
    feature: OLFeature | OLRenderFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    return new OLStyle({
      image: new OLCircle({
        radius: 3,
        fill: new OLFill({ color: '#cc3300' }),
        stroke: new OLStroke({ color: 'red', width: 1 }),
      }),
    });
  }
}
