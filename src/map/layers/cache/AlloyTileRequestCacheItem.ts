import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyTileCoordinate } from '@/map/layers/loaders/AlloyTileCoordinate';

/**
 * a cacheable request item that allows cancellation
 * @ignore
 * @internal
 */
export interface AlloyTileRequestCacheItem<T extends AlloyFeature> {
  /**
   * the tile coordinate requested
   */
  readonly tileCoordinate: AlloyTileCoordinate;

  /**
   * the promisable result of the tile request
   */
  result: Promise<T[]>;

  /**
   * function to cancel the request, should allow being called more than once and short circuit
   * on future calls
   */
  cancel(): void;
}
