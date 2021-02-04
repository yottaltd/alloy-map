import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyCacheDependency } from './AlloyCacheDependency';

export abstract class AlloyFeatureCacheDependency<
  T extends AlloyFeature
> extends AlloyCacheDependency {
  public readonly feature: T;

  public constructor(feature: T) {
    super();
    this.feature = feature;
  }

  abstract dispose(): void;
}
