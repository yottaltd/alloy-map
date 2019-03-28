// tslint:disable
import { JObject } from './JObject';
/**
 * The web request model used to edit a mesh
 * @export
 * @interface MeshEditWebRequestModel
 */
export interface MeshEditWebRequestModel {
  /**
   * The mesh name
   * @type {string}
   * @memberof MeshEditWebRequestModel
   */
  name: string;
  /**
   * Whether the mesh is enabled or not
   * @type {boolean}
   * @memberof MeshEditWebRequestModel
   */
  enabled: boolean;
  /**
   * The settings for the mesh
   * @type {JObject}
   * @memberof MeshEditWebRequestModel
   */
  settings: JObject;
  /**
   * The signature is used to ensure that the card being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same card
   * @type {string}
   * @memberof MeshEditWebRequestModel
   */
  signature: string;
}
