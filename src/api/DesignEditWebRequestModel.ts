import { CollectionCode } from './CollectionCode';
import { DesignGeometryWebModel } from './DesignGeometryWebModel';
import { DodiStencilEditWebModel } from './DodiStencilEditWebModel';
import { GeoJSONObject } from './GeoJSONObject';
import { GeoJSONObjectType } from './GeoJSONObjectType';
/**
 * Web request model for a design edit operation
 * @export
 * @interface DesignEditWebRequestModel
 */
export interface DesignEditWebRequestModel {
  /**
   * The design name
   * @type {string}
   * @memberof DesignEditWebRequestModel
   */
  name: string;
  /**
   * The optional design colour in the format #123456 to set on this design. When null value is deduced from implements or defaulted to \"#3d8fbd\".
   * @type {string}
   * @memberof DesignEditWebRequestModel
   */
  colour?: string;
  /**
   * The optional icon code to set for this design. When null value is deduced from implements or defaulted to \"icon-shape-circle\".
   * @type {string}
   * @memberof DesignEditWebRequestModel
   */
  icon?: string;
  /**
   * The optional title template to use to generate the title for an item at runtime. Mustache notation can be used in this template with attribute codes within the curly braces. For example \"Job-{{attributes_jobNumber}}\" will evaluate to \"Job-1232\". If null value will be deduced from the implements or when missing item id is used as default.
   * @type {string}
   * @memberof DesignEditWebRequestModel
   */
  title?: string;
  /**
   * The optional subtitle template to use to generate the subtitle for an item at runtime. Mustache notation can be used in this template with attribute codes within the curly braces. For example \"Light {{attributes_unitNumber}}\" will evaluate to \"Light 007\". If null value will be deduced from the implements or when missing item id is used as default.
   * @type {string}
   * @memberof DesignEditWebRequestModel
   */
  subtitle?: string;
  /**
   * Use GeometryRequired and GeometryAllows properties instead
   * @type {DesignGeometryWebModel}
   * @memberof DesignEditWebRequestModel
   */
  geometry?: DesignGeometryWebModel;
  /**
   * The optional geometry required information to set for this design. If null value is deduced from implements or defaulted to false.
   * @type {boolean}
   * @memberof DesignEditWebRequestModel
   */
  geometryRequired?: boolean;
  /**
   * The optional geometry allows information to set for this design. If null value is deduced from implements or defaulted to all geometry types.
   * @type {Array<GeoJSONObjectType>}
   * @memberof DesignEditWebRequestModel
   */
  geometryAllows?: Array<GeoJSONObjectType>;
  /**
   * The signature is used to ensure that the design being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same design
   * @type {string}
   * @memberof DesignEditWebRequestModel
   */
  signature: string;
  /**
   * The optional collections for the design that items will be allowed to be created in. Null means no collections set on this dodi and if missing on both this dodi and all of its implements it will be defaulted to 'Live'.
   * @type {Array<CollectionCode>}
   * @memberof DesignEditWebRequestModel
   */
  collections?: Array<CollectionCode>;
  /**
   * The stencil used to render the item form
   * @type {DodiStencilEditWebModel}
   * @memberof DesignEditWebRequestModel
   */
  stencil?: DodiStencilEditWebModel;
  /**
   * The optional versioned flag to set for this design. If true, the items of this design will have versioning enabled. When not set on the design or any of its implements defaults to false.
   * @type {boolean}
   * @memberof DesignEditWebRequestModel
   */
  versioned?: boolean;
}
