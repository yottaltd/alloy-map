import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ApplicableDodisAddWebRequestModel } from './ApplicableDodisAddWebRequestModel';
import { ApplicableDodisRemoveWebRequestModel } from './ApplicableDodisRemoveWebRequestModel';
import { DefectCreateWebRequestModel } from './DefectCreateWebRequestModel';
import { DefectCreateWebResponseModel } from './DefectCreateWebResponseModel';
import { DefectEditWebRequestModel } from './DefectEditWebRequestModel';
import { DefectEditWebResponseModel } from './DefectEditWebResponseModel';
import { ExtendedCloneWebRequestModel } from './ExtendedCloneWebRequestModel';
import { ExtendedCloneWebResponseModel } from './ExtendedCloneWebResponseModel';
import { ItemDesignsForFilterWebRequestModel } from './ItemDesignsForFilterWebRequestModel';
import { ApplicableDodiContainerListWebResponseModel } from './ApplicableDodiContainerListWebResponseModel';
import { ListApplicableDefectsResponse } from './ListApplicableDefectsResponse';
import { ExtendedDefectApiFetchParamCreator } from './ExtendedDefectApiFetchParamCreator';
import { ExtendedDefectApi } from './ExtendedDefectApi';
/**
 * ExtendedDefectApi - functional programming interface
 * @export
 */
export const ExtendedDefectApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Adds applicable dodis to the defect design filter. After the dodis has been added the defect design filter will include all the dodis that are part of that filter.
     * @summary Add applicable dodis to defect design filter
     * @param {string} code The Guc of the defect design to add applicable dodis to
     * @param {ApplicableDodisAddWebRequestModel} model The model containing the details of the dodis to add
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectAddApplicableDodis(code: string, model: ApplicableDodisAddWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ExtendedDefectApiFetchParamCreator(configuration).defectAddApplicableDodis(code, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
      };
    },
    /**
     * Clones a defect based on the information sent in the model
     * @summary Clone a defect
     * @param {string} id The AId of the defect item to clone
     * @param {ExtendedCloneWebRequestModel} model Model containing the new defect item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectClone(id: string, model: ExtendedCloneWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ExtendedCloneWebResponseModel> {
      const localVarFetchArgs = ExtendedDefectApiFetchParamCreator(configuration).defectClone(id, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Create a defect based on the information sent in the model
     * @summary Create a defect
     * @param {DefectCreateWebRequestModel} model Model containing the defect details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectCreate(model: DefectCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DefectCreateWebResponseModel> {
      const localVarFetchArgs = ExtendedDefectApiFetchParamCreator(configuration).defectCreate(model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Delete a defect item and cleans up
     * @summary Deletes a defect by id
     * @param {string} id The AId of the defect to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectDelete(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ExtendedDefectApiFetchParamCreator(configuration).defectDelete(id, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
      };
    },
    /**
     * Edits a defect based on the information sent in the model
     * @summary Edit a defect
     * @param {string} id The AId of the defect item to edit
     * @param {DefectEditWebRequestModel} model Model containing the new defect item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectEdit(id: string, model: DefectEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DefectEditWebResponseModel> {
      const localVarFetchArgs = ExtendedDefectApiFetchParamCreator(configuration).defectEdit(id, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Lists defect designs applicable to ALL input job, defect, inspection or asset designs
     * @summary List applicable defect designs for ALL given job, defect, inspection or asset designs
     * @param {ItemDesignsForFilterWebRequestModel} itemDesignsModel The model containing the item design Guc info
     * @param {string} [query] Optional query to filter the applicable dodi containers or work items by. Make sure to use 3+ characters for work item queries otherwise it will try to match the query to the full item title.
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectListApplicableDefectDesigns(itemDesignsModel: ItemDesignsForFilterWebRequestModel, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ListApplicableDefectsResponse> {
      const localVarFetchArgs = ExtendedDefectApiFetchParamCreator(configuration).defectListApplicableDefectDesigns(itemDesignsModel, query, page, pageSize, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Lists defectable dodis for this defect design, usually assets e.g. Broken Lamp defect applies to lamps but not bollards
     * @summary List applicable defectable dodis for this defect type
     * @param {string} code The defect design Guc to fetch applicable defective item designs for
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectListApplicableDefectiveItemDesignCodesForDefectDesignCode(code: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApplicableDodiContainerListWebResponseModel> {
      const localVarFetchArgs = ExtendedDefectApiFetchParamCreator(configuration).defectListApplicableDefectiveItemDesignCodesForDefectDesignCode(code, page, pageSize, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Removes applicable dodis from the defect design filter. After the dodis has been removed the defect design filter will include all the dodis that are part of that filter. This does not remove the dodis itself from the system or defect design, just from its filter.
     * @summary Remove applicable dodis from the defect design filter
     * @param {string} code The Guc of the defect design to remove applicable dodis from
     * @param {ApplicableDodisRemoveWebRequestModel} model The model containing the details of the dodis to remove
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectRemoveApplicableDodis(code: string, model: ApplicableDodisRemoveWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ExtendedDefectApiFetchParamCreator(configuration).defectRemoveApplicableDodis(code, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
      };
    },
  }
};
