// tslint:disable
import { BaseAPI } from './BaseAPI';
import { LayerCreateWebRequestModel } from './LayerCreateWebRequestModel';
import { LayerEditWebRequestModel } from './LayerEditWebRequestModel';
import { LayerPermissionsEditWebRequestModel } from './LayerPermissionsEditWebRequestModel';
import { LayerReorderStylesWebRequestModel } from './LayerReorderStylesWebRequestModel';
import { LayerStyleCreateRequestWebModel } from './LayerStyleCreateRequestWebModel';
import { LayerStyleDeleteWebRequestModel } from './LayerStyleDeleteWebRequestModel';
import { LayerStyleEditRequestWebModel } from './LayerStyleEditRequestWebModel';
import { LayerApiFp } from './LayerApiFp';
/**
 * LayerApi - object-oriented interface
 * @export
 * @class LayerApi
 * @extends {BaseAPI}
 */
export class LayerApi extends BaseAPI {
  /**
   * Creates a layer based on the information sent in the model
   * @summary Create a layer
   * @param {LayerCreateWebRequestModel} model Model containing the new layer details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerCreate(model: LayerCreateWebRequestModel, options?: any) {
    return LayerApiFp(this.configuration).layerCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Adds a style to the specified layer. A layer accepts both a style of type Aqs or Wfs.
   * @summary Add a style to a layer
   * @param {string} code The Guc of the layer to add a style to
   * @param {LayerStyleCreateRequestWebModel} model Model containing the information of the style to be added
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerCreateStyle(code: string, model: LayerStyleCreateRequestWebModel, options?: any) {
    return LayerApiFp(this.configuration).layerCreateStyle(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Deletes a layer based on the information sent in the model
   * @summary Delete a layer
   * @param {string} code The Guc of the layer to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerDelete(code: string, options?: any) {
    return LayerApiFp(this.configuration).layerDelete(code, options)(this.fetch, this.basePath);
  }

  /**
   * Removes a style to the specified layer
   * @summary Remove a style from a layer
   * @param {string} code The Guc of the layer to remove a style from
   * @param {string} id The AId of the style to remove
   * @param {LayerStyleDeleteWebRequestModel} model The model containing the signature necessary to delete a style from the layer
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerDeleteStyle(code: string, id: string, model: LayerStyleDeleteWebRequestModel, options?: any) {
    return LayerApiFp(this.configuration).layerDeleteStyle(code, id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a card based on the information sent in the model
   * @summary Edit a layer
   * @param {string} code The Guc of the layer to edit
   * @param {LayerEditWebRequestModel} model Model containing the new layer details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerEdit(code: string, model: LayerEditWebRequestModel, options?: any) {
    return LayerApiFp(this.configuration).layerEdit(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edit the permissions on the layer with the specified code
   * @summary Edit permissions for a layer
   * @param {string} code The Guc of the layer to edit the permissions of
   * @param {LayerPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerEditPermissions(code: string, model: LayerPermissionsEditWebRequestModel, options?: any) {
    return LayerApiFp(this.configuration).layerEditPermissions(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a style on the specified layer. A layer style type cannot be changed.
   * @summary Edit a style on a layer
   * @param {string} code The Guc of the layer to add edit a style on
   * @param {string} id The AId of the style to edit
   * @param {LayerStyleEditRequestWebModel} model Model containing the information of the style to be edited
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerEditStyle(code: string, id: string, model: LayerStyleEditRequestWebModel, options?: any) {
    return LayerApiFp(this.configuration).layerEditStyle(code, id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a layer by its globally unique code (GUC).
   * @summary Get a layer by its code
   * @param {string} code The Guc for the layer being requested
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerGet(code: string, options?: any) {
    return LayerApiFp(this.configuration).layerGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * This endpoint allows to query a layer returning information in a clustered format to be displayed on the map. The tiles returned are GeoJson features containing two types of properties. If the tile contains more than one item, then the following properties are returned:   * type: A string whose value is \"Cluster\"   * styleId: The id of the style that originated this feature   * count: The number of items in this cluster/feature   * bbox: The bounding box containing the items in this cluster If the tile contains one item, then the following properties are returned:   * type: A string whose value is \"Item\"   * styleId: The id of the style that originated this feature   * designCode: The code of the design the item belongs to   * itemId: The item id   * colour: The item colour   * icon: The item icon code
   * @summary Get a cluster tile for a layer
   * @param {string} code The code of the layer to query for
   * @param {number} x The x google tile coordinate
   * @param {number} y The y google tile coordinate
   * @param {number} z The z google tile coordinate (zoom)
   * @param {Array<string>} [styleIds] The list of style ids to query for. An item will only be returned in one style. The order of the styles specified is thus important since an item belonging to both the first and the last style in the list, will only appear for the first one. A non specified value or an empty list means that all the styles belonging to the layer have to be taken into account
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerGetClusterLayerTile(code: string, x: number, y: number, z: number, styleIds?: Array<string>, options?: any) {
    return LayerApiFp(this.configuration).layerGetClusterLayerTile(code, x, y, z, styleIds, options)(this.fetch, this.basePath);
  }

  /**
   * This endpoint allows to query a layer returning information in a clustered format to be displayed on the map. The tiles returned are GeoJson features containing two types of properties. If the tile contains more than one item, then the following properties are returned:   * type: A string whose value is \"SimplifiedGeometry\"   * styleId: The id of the style that originated this feature If the tile contains one item, then the following properties are returned:   * type: A string whose value is \"Item\"   * styleId: The id of the style that originated this feature   * designCode: The code of the design the item belongs to   * itemId: The item id   * colour: The item colour   * icon: The item icon code
   * @summary Get a network tile for a layer
   * @param {string} code The code of the layer to query for
   * @param {number} x The x google tile coordinate
   * @param {number} y The y google tile coordinate
   * @param {number} z The z google tile coordinate (zoom)
   * @param {Array<string>} [styleIds] The list of style ids to query for. An item will only be returned in one style. The order of the styles specified is thus important since an item belonging to both the first and the last style in the list, will only appear for the first one. A non specified value or an empty list means that all the styles belonging to the layer have to be taken into account
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerGetNetworkLayerTile(code: string, x: number, y: number, z: number, styleIds?: Array<string>, options?: any) {
    return LayerApiFp(this.configuration).layerGetNetworkLayerTile(code, x, y, z, styleIds, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches the permissions of a layer by its Guc
   * @summary Get the permissions of a layer by its code
   * @param {string} code The Guc for the layer whose permissions are being requested
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerGetPermissions(code: string, options?: any) {
    return LayerApiFp(this.configuration).layerGetPermissions(code, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of layers optionally specifying page and the number of results to return per page.
   * @summary Get a list of layers allowing to filter by some optional query parameters
   * @param {string} [name] The optional layer name (full or partial) to filter on
   * @param {'Core' | 'Module' | 'Customer'} [context] The optional layer context to filter on
   * @param {Array<string>} [andTags] If this parameter is passed, only the layers with ALL of the specified tags will be returned It is possible to use this in conjunction with the other tags conditions
   * @param {Array<string>} [orTags] If this parameter is passed, only the layers with AT LEAST one of the specified tags will be returned It is possible to use this in conjunction with the other tags conditions
   * @param {Array<string>} [notTags] If this parameter is passed, only the layers with NONE of the specified tags will be returned It is possible to use this in conjunction with the other tags conditions
   * @param {string} [userGroup] Optional Guc to filter layers by. If specified, only the layers that have this user group code within their permissions are returned
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerList(name?: string, context?: 'Core' | 'Module' | 'Customer', andTags?: Array<string>, orTags?: Array<string>, notTags?: Array<string>, userGroup?: string, page?: number, pageSize?: number, options?: any) {
    return LayerApiFp(this.configuration).layerList(name, context, andTags, orTags, notTags, userGroup, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches all of the layer tags in the system
   * @summary Get the list of the layer tags in the system
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerListTags(options?: any) {
    return LayerApiFp(this.configuration).layerListTags(options)(this.fetch, this.basePath);
  }

  /**
   * This endpoint reorders the styles on a layer taking a list of the style ids in the new order. All the style ids currently in the layer have to be present in the request
   * @summary Reorder styles on a layer
   * @param {string} code The Guc of the layer whose styles need to be reordered
   * @param {LayerReorderStylesWebRequestModel} model The model containing the info necessary to the styles reorder operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LayerApi
   */
  public layerReorderStyle(code: string, model: LayerReorderStylesWebRequestModel, options?: any) {
    return LayerApiFp(this.configuration).layerReorderStyle(code, model, options)(this.fetch, this.basePath);
  }

}
