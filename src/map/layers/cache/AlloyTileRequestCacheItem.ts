import { AlloyFeature } from '../../features/AlloyFeature';

/**
 * a cacheable request item that allows cancellation
 * @ignore
 * @internal
 */
export interface AlloyTileRequestCacheItem<T extends AlloyFeature> {
  /**
   * the tile coordinate in `z, x, y` format
   */
  readonly tileCoordinate: [number, number, number];

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
