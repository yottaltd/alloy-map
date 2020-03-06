import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyLayer } from '../layers/AlloyLayer';

/**
 * handler for the layers feature loading
 */
export type FeatureLoaderEventHandler = (layer: AlloyLayer, features: AlloyFeature[]) => void;
