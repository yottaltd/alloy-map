// tslint:disable
import { DesignGeometryWebModel } from './DesignGeometryWebModel';
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
   * The default design colour in the format #123456
   * @type {string}
   * @memberof DesignEditWebRequestModel
   */
  colour: string;
  /**
   * The default design icon code
   * @type {string}
   * @memberof DesignEditWebRequestModel
   */
  icon: string;
  /**
   * The optional title template to use to generate the title for an item at runtime. Mustache notation can be used in this template with attribute codes within the curly braces. For example \"Job-{{attributes_jobNumber}}\" will evaluate to \"Job-1232\"
   * @type {string}
   * @memberof DesignEditWebRequestModel
   */
  title: string;
  /**
   * The optional subtitle template to use to generate the subtitle for an item at runtime. Mustache notation can be used in this template with attribute codes within the curly braces. For example \"Light {{attributes_unitNumber}}\" will evaluate to \"Light 007\"
   * @type {string}
   * @memberof DesignEditWebRequestModel
   */
  subtitle: string;
  /**
   * The design geometry details
   * @type {DesignGeometryWebModel}
   * @memberof DesignEditWebRequestModel
   */
  geometry: DesignGeometryWebModel;
  /**
   * The signature is used to ensure that the design being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same design
   * @type {string}
   * @memberof DesignEditWebRequestModel
   */
  signature: string;
}
