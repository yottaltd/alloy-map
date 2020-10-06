import { MapChangeZoomEvent } from '@/map/events/MapChangeZoomEvent';

/**
 * handler for the map change zoom event
 */
export type MapChangeZoomEventHandler = (event: MapChangeZoomEvent) => void;
