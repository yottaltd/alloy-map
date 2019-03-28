// tslint:disable
import { DodiWebModel } from './DodiWebModel';
import { DesignInterfaceWebModel } from './DesignInterfaceWebModel';
import { DesignWebModel } from './DesignWebModel';
/**
 * Design and design interface wrapper for filtering purposes used to get/set applicable designs and interfaces for inspection type
 * @export
 * @interface DodiWebModelContainer
 */
export interface DodiWebModelContainer {
  /**
   * Design or null if this container is for design interface. When set it either comes from filter itself or is derived due to interface (see IsInFilter flag).
   * @type {DesignWebModel}
   * @memberof DodiWebModelContainer
   */
  design?: DesignWebModel;
  /**
   * Filter design interface or null if this container is for design.
   * @type {DesignInterfaceWebModel}
   * @memberof DodiWebModelContainer
   */
  designInterface?: DesignInterfaceWebModel;
  /**
   * Flag indicating whether the design is set in the filter or derived due to implementing interface that is set in the filter.
   * @type {boolean}
   * @memberof DodiWebModelContainer
   */
  isInFilter: boolean;
}
