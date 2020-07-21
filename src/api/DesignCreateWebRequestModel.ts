import { CollectionCode } from './CollectionCode';
import { DesignGeometryWebModel } from './DesignGeometryWebModel';
import { DodiStencilCreateWebModel } from './DodiStencilCreateWebModel';
/**
 * Web request model for a design create operation
 * @export
 * @interface DesignCreateWebRequestModel
 */
export interface DesignCreateWebRequestModel {
  /**
   * The design name
   * @type {string}
   * @memberof DesignCreateWebRequestModel
   */
  name: string;
  /**
   * The default design colour in the format #123456
   * @type {string}
   * @memberof DesignCreateWebRequestModel
   */
  colour: string;
  /**
   * The default design icon code
   * @type {string}
   * @memberof DesignCreateWebRequestModel
   */
  icon: string;
  /**
   * If true, the items of this design will have versioning enabled. This is needed for the timelord to work. A versioned item has one to many item versions and each of them represents the item in a specific temporal interval which is denoted by its start and end date. Only enable this feature if you are interest in the state of an item at a certain point in time, e.g. how the street light was 2 years ago. Delete items for this kind of designs will actually be endated instead of being deleted, so that it will be possible to find them when going back in time
   * @type {boolean}
   * @memberof DesignCreateWebRequestModel
   */
  versioned: boolean;
  /**
   * The optional title template to use to generate the title for an item at runtime. Mustache notation can be used in this template with attribute codes within the curly braces. For example \"Job-{{attributes_jobNumber}}\" will evaluate to \"Job-1232\"
   * @type {string}
   * @memberof DesignCreateWebRequestModel
   */
  title?: string;
  /**
   * The optional subtitle template to use to generate the subtitle for an item at runtime. Mustache notation can be used in this template with attribute codes within the curly braces. For example \"Light {{attributes_unitNumber}}\" will evaluate to \"Light 007\"
   * @type {string}
   * @memberof DesignCreateWebRequestModel
   */
  subtitle?: string;
  /**
   * The design geometry details
   * @type {DesignGeometryWebModel}
   * @memberof DesignCreateWebRequestModel
   */
  geometry: DesignGeometryWebModel;
  /**
   * The collections for the design that items will be allowed to be created in. Null will mean no collections.
   * @type {Array<CollectionCode>}
   * @memberof DesignCreateWebRequestModel
   */
  collections: Array<CollectionCode>;
  /**
   * The optional stencil configuration to use for layout of the item forms generated for this design.
   * @type {DodiStencilCreateWebModel}
   * @memberof DesignCreateWebRequestModel
   */
  stencil?: DodiStencilCreateWebModel;
}
