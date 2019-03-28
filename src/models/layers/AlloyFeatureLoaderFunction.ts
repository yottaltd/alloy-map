import OLProjection from 'ol/proj/Projection';

export interface AlloyFeatureLoaderFunction {
  func(
    extent: [number, number, number, number],
    resolution: number,
    projection: OLProjection,
  ): Promise<void>;
}
