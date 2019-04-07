// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ApplicableDodisAddWebRequestModel } from './ApplicableDodisAddWebRequestModel';
import { ApplicableDodisRemoveWebRequestModel } from './ApplicableDodisRemoveWebRequestModel';
import { InspectionCreateWebRequestModel } from './InspectionCreateWebRequestModel';
import { InspectionCreateWebResponseModel } from './InspectionCreateWebResponseModel';
import { InspectionEditWebRequestModel } from './InspectionEditWebRequestModel';
import { InspectionEditWebResponseModel } from './InspectionEditWebResponseModel';
import { ItemDesignsForFilterWebRequestModel } from './ItemDesignsForFilterWebRequestModel';
import { ApplicableDodiContainerListWebResponseModel } from './ApplicableDodiContainerListWebResponseModel';
import { ListApplicableInspectionsResponse } from './ListApplicableInspectionsResponse';
import { InspectionApiFetchParamCreator } from './InspectionApiFetchParamCreator';
import { InspectionApi } from './InspectionApi';
/**
 * InspectionApi - functional programming interface
 * @export
 */
export const InspectionApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Adds applicable dodis to the inspection design filter. After the dodis has been added the inspection design filter will include all the dodis that are part of that filter.
     * @summary Add applicable dodis to inspection design filter
     * @param {string} code The Guc of the inspection design to add applicable dodis to
     * @param {ApplicableDodisAddWebRequestModel} model The model containing the details of the dodis to add
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    inspectionAddApplicableDodis(code: string, model: ApplicableDodisAddWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = InspectionApiFetchParamCreator(configuration).inspectionAddApplicableDodis(code, model, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Creates an inspection based on the information sent in the model
     * @summary Create an inspection
     * @param {InspectionCreateWebRequestModel} model Model containing the inspection details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    inspectionCreate(model: InspectionCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<InspectionCreateWebResponseModel> {
      const localVarFetchArgs = InspectionApiFetchParamCreator(configuration).inspectionCreate(model, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Delete an inspection item and cleans up
     * @summary Deletes an inspection by id
     * @param {string} id The AId of the inspection to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    inspectionDelete(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = InspectionApiFetchParamCreator(configuration).inspectionDelete(id, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Edits an inspection based on the information sent in the model
     * @summary Edit an inspection
     * @param {string} id The AId of the inspection item to edit
     * @param {InspectionEditWebRequestModel} model Model containing the new inspection item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    inspectionEdit(id: string, model: InspectionEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<InspectionEditWebResponseModel> {
      const localVarFetchArgs = InspectionApiFetchParamCreator(configuration).inspectionEdit(id, model, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * List inspectable dodis for this inspection design code, usually assets e.g. Lamp inspection for street lights not benches.
     * @summary List applicable inspectable dodis for this inspection type
     * @param {string} code The inspection design Guc to fetch applicable inspectable item designs for
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    inspectionGetApplicableInspectableItemDesignCodesForInspectionDesignCode(code: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApplicableDodiContainerListWebResponseModel> {
      const localVarFetchArgs = InspectionApiFetchParamCreator(configuration).inspectionGetApplicableInspectableItemDesignCodesForInspectionDesignCode(code, page, pageSize, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Lists inspection designs for this inspectable (asset) design
     * @summary List applicable inspection designs for given inspectable (asset) design
     * @param {ItemDesignsForFilterWebRequestModel} itemDesignsModel The model containing the item design Guc info
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    inspectionListApplicableInspectionDesigns(itemDesignsModel: ItemDesignsForFilterWebRequestModel, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ListApplicableInspectionsResponse> {
      const localVarFetchArgs = InspectionApiFetchParamCreator(configuration).inspectionListApplicableInspectionDesigns(itemDesignsModel, page, pageSize, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Removes applicable dodis from the inspection design filter. After the dodis has been removed the inspection design filter will include all the dodis that are part of that filter. This does not remove the dodis itself from the system or inspection design, just from its filter.
     * @summary Remove applicable dodis from the inspection design filter
     * @param {string} code The Guc of the inspection design to remove applicable dodis from
     * @param {ApplicableDodisRemoveWebRequestModel} model The model containing the details of the dodis to remove
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    inspectionRemoveApplicableDodis(code: string, model: ApplicableDodisRemoveWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = InspectionApiFetchParamCreator(configuration).inspectionRemoveApplicableDodis(code, model, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            throw response;
          }
        });
      };
    },
  }
};
