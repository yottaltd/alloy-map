// tslint:disable
import { Context } from './Context';
import { MetadataWebModel } from './MetadataWebModel';
import { Basemap } from './Basemap';
/**
 * Base Web model for a basemap
 * @export
 * @interface BasemapWebModelBase
 */
export interface BasemapWebModelBase {
  /**
   * The basemap name
   * @type {string}
   * @memberof BasemapWebModelBase
   */
  name: string;
  /**
   * The basemap Context
   * @type {Context}
   * @memberof BasemapWebModelBase
   */
  context: Context;
  /**
   * The unique basemap code
   * @type {string}
   * @memberof BasemapWebModelBase
   */
  code: string;
  /**
   * The metadata to a basemap
   * @type {MetadataWebModel}
   * @memberof BasemapWebModelBase
   */
  metadata: MetadataWebModel;
  /**
   * Optional API key
   * @type {string}
   * @memberof BasemapWebModelBase
   */
  apiKeyValue?: string;
  /**
   * Optional background colour for the layer
   * @type {string}
   * @memberof BasemapWebModelBase
   */
  colour?: string;
  /**
   * Optional watermark, e.g. a URL
   * @type {string}
   * @memberof BasemapWebModelBase
   */
  watermark?: string;
  /**
   * URL for the mapping service
   * @type {string}
   * @memberof BasemapWebModelBase
   */
  url: string;
  /**
   * 
   * @type {string}
   * @memberof BasemapWebModelBase
   */
  discriminator: string;
}
