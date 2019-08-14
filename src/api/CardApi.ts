// tslint:disable
import { BaseAPI } from './BaseAPI';
import { CardCreateWebRequestModel } from './CardCreateWebRequestModel';
import { CardEditWebRequestModel } from './CardEditWebRequestModel';
import { CardPermissionsEditWebRequestModel } from './CardPermissionsEditWebRequestModel';
import { CardQueryCreateWebModel } from './CardQueryCreateWebModel';
import { CardQueryDeleteWebRequestModel } from './CardQueryDeleteWebRequestModel';
import { CardApiFp } from './CardApiFp';
/**
 * CardApi - object-oriented interface
 * @export
 * @class CardApi
 * @extends {BaseAPI}
 */
export class CardApi extends BaseAPI {
  /**
   * Creates a card based on the information sent in the model
   * @summary Create a card
   * @param {CardCreateWebRequestModel} model Model containing the new card details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardApi
   */
  public cardCreate(model: CardCreateWebRequestModel, options?: any) {
    return CardApiFp(this.configuration).cardCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Adds a query to the specified card. A card accepts Aqs Query and MathAggregation. If it is a MathAggregation, the result of the query is used, if it is an Aqs Query, the total numbers of matched items is used instead
   * @summary Add a query to a card
   * @param {string} code The Guc of the card to add a query to
   * @param {CardQueryCreateWebModel} model Model containing the information of the query to be added
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardApi
   */
  public cardCreateQuery(code: string, model: CardQueryCreateWebModel, options?: any) {
    return CardApiFp(this.configuration).cardCreateQuery(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Deletes a card based on the information sent in the model
   * @summary Delete a card
   * @param {string} code The Guc of the card to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardApi
   */
  public cardDelete(code: string, options?: any) {
    return CardApiFp(this.configuration).cardDelete(code, options)(this.fetch, this.basePath);
  }

  /**
   * Removes a query to the specified card
   * @summary Remove a query from a card
   * @param {string} code The Guc of the card to remove a query from
   * @param {string} id The AId of the query to remove
   * @param {CardQueryDeleteWebRequestModel} model The model containing the signature necessary to delete a query from the card
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardApi
   */
  public cardDeleteQuery(code: string, id: string, model: CardQueryDeleteWebRequestModel, options?: any) {
    return CardApiFp(this.configuration).cardDeleteQuery(code, id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a card based on the information sent in the model
   * @summary Edit a card
   * @param {string} code The Guc of the card to edit
   * @param {CardEditWebRequestModel} model Model containing the new card details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardApi
   */
  public cardEdit(code: string, model: CardEditWebRequestModel, options?: any) {
    return CardApiFp(this.configuration).cardEdit(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edit the permissions on the card with the specified code
   * @summary Edit permissions for a card
   * @param {string} code The Guc of the card to edit the permissions of
   * @param {CardPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardApi
   */
  public cardEditPermissions(code: string, model: CardPermissionsEditWebRequestModel, options?: any) {
    return CardApiFp(this.configuration).cardEditPermissions(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a card by its globally unique code (Guc).
   * @summary Get a card by its code
   * @param {string} code The Guc for the card being requested
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardApi
   */
  public cardGet(code: string, options?: any) {
    return CardApiFp(this.configuration).cardGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * Computes the result of the queries in the card matching the specified code and returns them in the response
   * @summary Get a computed card
   * @param {string} code The Guc of the card to process
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardApi
   */
  public cardGetComputedCard(code: string, options?: any) {
    return CardApiFp(this.configuration).cardGetComputedCard(code, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches the permissions of a card by its Guc
   * @summary Get a card permissions by its code
   * @param {string} code The Guc for the card whose permissions are being requested
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardApi
   */
  public cardGetPermissions(code: string, options?: any) {
    return CardApiFp(this.configuration).cardGetPermissions(code, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of cards optionally specifying page and the number of results to return per page.
   * @summary Get a list of cards
   * @param {string} [query] Optional query to filter the cards by
   * @param {string} [userGroup] Optional Guc to filter cards by. If specified, only the cards that have this user group code within their permissions are returned
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CardApi
   */
  public cardList(query?: string, userGroup?: string, page?: number, pageSize?: number, options?: any) {
    return CardApiFp(this.configuration).cardList(query, userGroup, page, pageSize, options)(this.fetch, this.basePath);
  }

}
