import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { AlloyStyleProcessor } from '../AlloyStyleProcessor';

/**
 * processes the selection styled feature items
 * @ignore
 */
export class AlloySelectionStyleProcessor extends AlloyStyleProcessor {
  public onStyleProcess(
    olFeature: OLFeature | OLRenderFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    return new OLStyle({
      image: new OLCircle({
        radius: 5,
        fill: new OLFill({ color: '#0033cc' }),
        stroke: new OLStroke({ color: 'green', width: 2 }),
      }),
    });
  }
}
