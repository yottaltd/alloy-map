import { AlloyMap } from '../models/core/AlloyMap';
import { AlloyMapOL } from '../models/openlayers/AlloyMapOL';
import { AlloyCoordinate } from '../models/core/AlloyCoordinate';

export abstract class AlloyMapFactory {
  public static create(options: {
    element: Element;
    centre?: AlloyCoordinate;
    zoom?: number;
  }): AlloyMap {
    return new AlloyMapOL(options);
  }
}
