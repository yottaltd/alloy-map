// tslint:disable
import { Context } from './Context';
import { JObject } from './JObject';
import { MeshType } from './MeshType';
import { MetadataWebModel } from './MetadataWebModel';
/**
 * Web model for a mesh
 * @export
 * @interface MeshWebModel
 */
export interface MeshWebModel {
  /**
   * The mesh name
   * @type {string}
   * @memberof MeshWebModel
   */
  name: string;
  /**
   * The mesh Context
   * @type {Context}
   * @memberof MeshWebModel
   */
  context: Context;
  /**
   * The mesh type
   * @type {MeshType}
   * @memberof MeshWebModel
   */
  type: MeshType;
  /**
   * The unique mesh Guc
   * @type {string}
   * @memberof MeshWebModel
   */
  code: string;
  /**
   * True if the mesh is enabled, false otherwise
   * @type {boolean}
   * @memberof MeshWebModel
   */
  enabled: boolean;
  /**
   * The settings specific to each single mesh
   * @type {JObject}
   * @memberof MeshWebModel
   */
  settings: JObject;
  /**
   * The metadata to a mesh
   * @type {MetadataWebModel}
   * @memberof MeshWebModel
   */
  metadata: MetadataWebModel;
}
