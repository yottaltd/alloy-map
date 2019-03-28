// tslint:disable
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
import { ItemDesignsForFilterWebRequestModel } from './ItemDesignsForFilterWebRequestModel';
import { ApplicableDodiContainerListWebResponseModel } from './ApplicableDodiContainerListWebResponseModel';
import { ListApplicableDefectsResponse } from './ListApplicableDefectsResponse';
import { DefectApiFetchParamCreator } from './DefectApiFetchParamCreator';
import { DefectApi } from './DefectApi';
/**
 * DefectApi - functional programming interface
 * @export
 */
export const DefectApiFp = function(configuration?: Configuration) {
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
      const localVarFetchArgs = DefectApiFetchParamCreator(configuration).defectAddApplicableDodis(code, model, options);
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
     * Create a defect based on the information sent in the model
     * @summary Create a defect
     * @param {DefectCreateWebRequestModel} model Model containing the defect details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectCreate(model: DefectCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DefectCreateWebResponseModel> {
      const localVarFetchArgs = DefectApiFetchParamCreator(configuration).defectCreate(model, options);
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
     * Delete a defect item and cleans up
     * @summary Deletes a defect by id
     * @param {string} id The AId of the defect to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectDelete(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = DefectApiFetchParamCreator(configuration).defectDelete(id, options);
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
     * Edits a defect based on the information sent in the model
     * @summary Edit a defect
     * @param {string} id The AId of the defect item to edit
     * @param {DefectEditWebRequestModel} model Model containing the new defect item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectEdit(id: string, model: DefectEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DefectEditWebResponseModel> {
      const localVarFetchArgs = DefectApiFetchParamCreator(configuration).defectEdit(id, model, options);
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
     * Lists defect designs for this defective (asset) design
     * @summary List applicable defect designs for given defective (asset) design
     * @param {ItemDesignsForFilterWebRequestModel} itemDesignsModel The model containing the item design Guc info
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectListApplicableDefectDesigns(itemDesignsModel: ItemDesignsForFilterWebRequestModel, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ListApplicableDefectsResponse> {
      const localVarFetchArgs = DefectApiFetchParamCreator(configuration).defectListApplicableDefectDesigns(itemDesignsModel, page, pageSize, options);
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
     * Lists defectable dodis for this defect design, usually assets e.g. Broken Lamp defect applies to lamps but not bollards
     * @summary List applicable defectable dodis for this defect type
     * @param {string} code The defect design Guc to fetch applicable defective item designs for
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectListApplicableDefectiveItemDesignCodesForDefectDesignCode(code: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApplicableDodiContainerListWebResponseModel> {
      const localVarFetchArgs = DefectApiFetchParamCreator(configuration).defectListApplicableDefectiveItemDesignCodesForDefectDesignCode(code, page, pageSize, options);
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
     * Removes applicable dodis from the defect design filter. After the dodis has been removed the defect design filter will include all the dodis that are part of that filter. This does not remove the dodis itself from the system or defect design, just from its filter.
     * @summary Remove applicable dodis from the defect design filter
     * @param {string} code The Guc of the defect design to remove applicable dodis from
     * @param {ApplicableDodisRemoveWebRequestModel} model The model containing the details of the dodis to remove
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    defectRemoveApplicableDodis(code: string, model: ApplicableDodisRemoveWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = DefectApiFetchParamCreator(configuration).defectRemoveApplicableDodis(code, model, options);
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
