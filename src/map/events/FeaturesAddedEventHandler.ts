import { FeaturesAddedEvent } from '@/map/events/FeaturesAddedEvent';

/**
 * handler for the layers features added
 */
export type FeaturesAddedEventHandler = (event: FeaturesAddedEvent) => void;
