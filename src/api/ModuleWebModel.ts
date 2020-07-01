import { MetadataWebModel } from './MetadataWebModel';
/**
 * Web model for an alloy module
 * @export
 * @interface ModuleWebModel
 */
export interface ModuleWebModel {
  /**
   * The date time at which the module was installed
   * @type {string}
   * @memberof ModuleWebModel
   */
  installed: string;
  /**
   * The module name
   * @type {string}
   * @memberof ModuleWebModel
   */
  name: string;
  /**
   * The unique module code
   * @type {string}
   * @memberof ModuleWebModel
   */
  code: string;
  /**
   * The metadata to a card
   * @type {MetadataWebModel}
   * @memberof ModuleWebModel
   */
  metadata: MetadataWebModel;
}
