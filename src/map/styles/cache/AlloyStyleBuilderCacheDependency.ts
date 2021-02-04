import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyStyleBuilder } from '@/map/styles/AlloyStyleBuilder';
import { AlloyFeatureCacheDependency } from './AlloyFeatureCacheDependency';

export class AlloyStyleBuilderCacheDependency<
  F extends AlloyFeature,
  T extends AlloyStyleBuilder<F>
> extends AlloyFeatureCacheDependency<F> {
  public readonly key: string;
  private readonly builder: T;

  public constructor(feature: F, key: string, builder: T) {
    super(feature);
    this.key = key;
    this.builder = builder;
  }

  public dispose(): void {
    this.builder.clearCache(this.key);
  }
}
