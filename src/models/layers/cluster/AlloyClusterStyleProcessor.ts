import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { AlloyStyleProcessor } from '../AlloyStyleProcessor';
import { FeatureUtils } from '../../../utils/FeatureUtils';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';

/**
 * processes the cluster styled feature items
 * @ignore
 */
export class AlloyClusterStyleProcessor extends AlloyStyleProcessor {
  public onStyleProcess(
    olFeature: OLFeature | OLRenderFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    if (olFeature instanceof OLRenderFeature) {
      return null;
    }

    const feature = this.layer.getFeatureById(FeatureUtils.getFeatureIdFromOlFeature(olFeature));
    if (!feature) {
      return null;
    }

    if (feature instanceof AlloyClusterFeature) {
      return this.processClusterFeature(feature);
    } else if (feature instanceof AlloyItemFeature) {
      return this.processItemFeature(feature);
    } else {
      return null;
    }
  }

  private processClusterFeature(feature: AlloyClusterFeature): OLStyle | OLStyle[] | null {
    return new OLStyle({
      image: new OLCircle({
        radius: 10,
        fill: new OLFill({ color: 'red' }),
        //stroke: new OLStroke({ color: 'red', width: 1 }),
      }),
    });
  }

  private processItemFeature(feature: AlloyItemFeature): OLStyle | OLStyle[] | null {
    return new OLStyle({
      image: new OLCircle({
        radius: 25,
        fill: new OLFill({ color: feature.properties.colour }),
      }),
    });
  }
}
