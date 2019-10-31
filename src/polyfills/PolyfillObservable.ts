import { unByKey } from 'ol/Observable';
import { EventsKey as OLEventsKey } from 'ol/events';

/**
 * utility class for accessing ol/observable functions due to typing issues.
 * see: https://openlayers.org/en/latest/apidoc/module-ol_Observable.html
 * @ignore
 * @internal
 */
export abstract class PolyfillObservable {
  /**
   * removes an event listener using the key returned by on() or once()
   * @param key the key to remove event listener for
   */
  public static unByKey(key: OLEventsKey | OLEventsKey[]): void {
    return unByKey(key);
  }
}
