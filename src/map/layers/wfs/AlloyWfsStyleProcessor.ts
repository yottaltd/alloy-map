import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyWfsFeature } from '@/map/features/AlloyWfsFeature';
import { AlloyWfsLayer } from '@/map/layers/wfs/AlloyWfsLayer';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '@/map/styles/AlloyStyleProcessor';
import { AlloyWfsStyleBuilder } from '@/map/styles/builders/AlloyWfsStyleBuilder';
import OLStyle from 'ol/style/Style';

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
  ): OLStyle | OLStyle[] {
    if (feature instanceof AlloyWfsFeature) {
      return this.wfsStyleBuilder.build(feature, resolution, state);
    } else {
      return [];
    }
  }

  /**
   * @override
   */
  public clear(parts?: Record<string, any>): void {
    this.wfsStyleBuilder.clear(parts);
  }
}
