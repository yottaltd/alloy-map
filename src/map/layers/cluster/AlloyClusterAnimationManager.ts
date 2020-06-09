import { Coordinate as OLCoordinate } from 'ol/coordinate';
import OLLineString from 'ol/geom/LineString';
import OLCanvasImmediateRenderer from 'ol/render/canvas/Immediate';
import { PolyfillExtent } from '../../../polyfills/PolyfillExtent';
import { AlloySingleAnimationManager } from '../../animations/AlloySingleAnimationManager';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';

/**
 * animation manager for cluster layer zoom animations
 * @ignore
 * @internal
 */
export class AlloyClusterAnimationManager extends AlloySingleAnimationManager {
  /**
   * syle processor used for styling features
   */
  private styleProcessor: AlloyStyleProcessor;

  public constructor(map: AlloyMap, styleProcessor: AlloyStyleProcessor) {
    super(map);
    this.styleProcessor = styleProcessor;
  }

  /**
   * @implements
   */
  public stopAnimation(feature: AlloyFeature) {
    feature.setVisible(true);
    super.stopAnimation(feature);
  }

  /**
   * @implements
   */
  public startAnimation(
    feature: AlloyItemFeature | AlloyClusterFeature,
    path: OLLineString,
    isForward: boolean,
    customPostrender?: () => void,
  ) {
    const styles = this.styleProcessor.onStyleProcessWithAlloyFeature(
      feature,
      this.map.olView.getResolution(),
      AlloyStyleBuilderBuildState.Default,
    );

    feature.setVisible(false);

    const startCoordinate = isForward ? path.getFirstCoordinate() : path.getLastCoordinate();

    this.startFeatureAnimation(
      feature,
      path,
      (renderer: OLCanvasImmediateRenderer, coordinate: OLCoordinate) => {
        // don't draw if coordinates are not in the view extent
        const viewExtent = this.map.viewport.toMapExtent();
        if (!PolyfillExtent.containsCoordinate(viewExtent, coordinate)) {
          return;
        }

        // const currentPoint = new OLPoint(coordinate);
        const cloneGeometry = feature.olFeature.getGeometry().clone();
        cloneGeometry.translate(
          coordinate[0] - startCoordinate[0],
          coordinate[1] - startCoordinate[1],
        );

        // set render style and draw geometry
        for (const style of Array.isArray(styles) ? styles : [styles]) {
          renderer.setStyle(style);
          renderer.drawGeometry(cloneGeometry);
        }
      },
      () => {
        this.stopAnimation(feature);
        if (customPostrender) {
          customPostrender();
        }
        feature.setVisible(true);
      },
    );
  }
}
