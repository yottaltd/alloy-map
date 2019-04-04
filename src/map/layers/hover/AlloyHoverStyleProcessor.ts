import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { AlloyStyleProcessor } from '../AlloyStyleProcessor';

/**
 * processes the hover styled feature items
 * @ignore
 */
export class AlloyHoverStyleProcessor extends AlloyStyleProcessor {
  public onStyleProcess(
    olFeature: OLFeature | OLRenderFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    return new OLStyle({
      image: new OLCircle({
        radius: 3,
        fill: new OLFill({ color: '#33cc00' }),
        stroke: new OLStroke({ color: 'blue', width: 2 }),
      }),
    });
  }
}
