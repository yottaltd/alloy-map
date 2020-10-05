import { LayersChangeEvent } from '@/map/events/LayersChangeEvent';

/**
 * handler for the layers change event
 */
export type LayersChangeEventHandler = (event: LayersChangeEvent) => void;
