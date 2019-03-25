import { AlloyMap } from '@/models/AlloyMap';
import { AlloyMapImpl } from '@/models/impl/AlloyMapImpl';

export abstract class AlloyMapFactory {
  public static create(): AlloyMap {
    return new AlloyMapImpl(null as any);
  }
}
