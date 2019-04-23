import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';

/**
 * processes the drawing styled feature items
 * @ignore
 */
export class AlloyDrawingStyleProcessor extends AlloyStyleProcessor {
  public onStyleProcess(
    olFeature: OLFeature | OLRenderFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ): OLStyle | OLStyle[] {
    return new OLStyle({
      image: new OLCircle({
        radius: 3,
        fill: new OLFill({ color: '#cc3300' }),
        stroke: new OLStroke({ color: 'red', width: 1 }),
      }),
    });
  }
}
