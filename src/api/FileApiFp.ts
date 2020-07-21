import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { FileMoveWebRequestModel } from './FileMoveWebRequestModel';
import { FileMoveWebResponseModel } from './FileMoveWebResponseModel';
import { FileApiFetchParamCreator } from './FileApiFetchParamCreator';
import { FileApi } from './FileApi';
/**
 * FileApi - functional programming interface
 * @export
 */
export const FileApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Deletes a file
     * @param {string} id The AId of the file to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    fileDelete(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = FileApiFetchParamCreator(configuration).fileDelete(id, options);
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
     * 
     * @summary Download a file
     * @param {string} id The AId of the file to download
     * @param {boolean} [applyContentDispositionHeader] If true, the content disposition header will be returned and the       download will be seen as a file download by the browser. If false, the header won&#39;t be returned and the image will be displayed as is       If false, the header won&#39;t be returned and the image will be displayed as is
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    fileDownload(id: string, applyContentDispositionHeader?: boolean, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
      const localVarFetchArgs = FileApiFetchParamCreator(configuration).fileDownload(id, applyContentDispositionHeader, options);
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
     * 
     * @summary Download a file thumbnail
     * @param {string} id The AId of the file to download a thumbnail of
     * @param {number} [width] The height of the thumbnail
     * @param {number} [height] The height of the thumbnail
     * @param {'Cover' | 'Contain'} [mode] The mode to use to resize the image
     * @param {boolean} [applyContentDispositionHeader] If true, the content disposition header will be returned, triggering a file download from the browser. If false, the header won&#39;t be returned and the image will be displayed as is
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    fileDownloadThumbnail(id: string, width?: number, height?: number, mode?: 'Cover' | 'Contain', applyContentDispositionHeader?: boolean, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
      const localVarFetchArgs = FileApiFetchParamCreator(configuration).fileDownloadThumbnail(id, width, height, mode, applyContentDispositionHeader, options);
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
     * 
     * @summary Moves a file to a folder with a given id
     * @param {string} id The AId of the file to move
     * @param {FileMoveWebRequestModel} model The move file model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    fileMove(id: string, model: FileMoveWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<FileMoveWebResponseModel> {
      const localVarFetchArgs = FileApiFetchParamCreator(configuration).fileMove(id, model, options);
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
  }
};
