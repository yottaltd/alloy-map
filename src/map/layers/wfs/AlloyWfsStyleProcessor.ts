import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyWfsFeature } from '../../features/AlloyWfsFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyWfsStyleBuilder } from '../../styles/builders/AlloyWfsStyleBuilder';
import { AlloyWfsLayer } from './AlloyWfsLayer';

/**
 * processes the wfs styled feature items
 * @ignore
 * @internal
 */
export class AlloyWfsStyleProcessor extends AlloyStyleProcessor {
  /**
   * wfs feature style builder
   */
  private readonly wfsStyleBuilder: AlloyWfsStyleBuilder;

  /**
   * creates a new instance
   * @param layer the wfs layer to style
   */
  constructor(layer: AlloyWfsLayer) {
    super(layer);

    this.wfsStyleBuilder = new AlloyWfsStyleBuilder(layer.map, layer.styles);
  }

  /**
   * @override
   */
  public onStyleProcessWithAlloyFeature(
    feature: AlloyFeature,
    resolution: number,
    state: AlloyStyleBuilderBuildState,
  ) {
    if (feature instanceof AlloyWfsFeature) {
      return this.wfsStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }
}
