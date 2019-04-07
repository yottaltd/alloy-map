// tslint:disable
import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { FileApi } from './FileApi';
/**
 * FileApi - fetch parameter creator
 * @export
 */
export const FileApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Deletes a file
     * @param {string} id The AId of the file to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    fileDelete(id: string, options: any = {}): FetchArgs {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id','Required parameter id was null or undefined when calling fileDelete.');
      }
      const localVarPath = `/api/file/{id}`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
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
    fileDownload(id: string, applyContentDispositionHeader?: boolean, options: any = {}): FetchArgs {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id','Required parameter id was null or undefined when calling fileDownload.');
      }
      const localVarPath = `/api/file/{id}`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      if (applyContentDispositionHeader !== undefined) {
        localVarQueryParameter['applyContentDispositionHeader'] = applyContentDispositionHeader;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * 
     * @summary Download a file thumbnail
     * @param {string} id The AId of the file to download a thumbnail of
     * @param {number} width The height of the thumbnail
     * @param {number} height The height of the thumbnail
     * @param {'Cover' | 'Contain'} mode The mode to use to resize the image
     * @param {boolean} [applyContentDispositionHeader] If true, the content disposition header will be returned, triggering a file download from the browser. If false, the header won&#39;t be returned and the image will be displayed as is
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    fileDownloadThumbnail(id: string, width: number, height: number, mode: 'Cover' | 'Contain', applyContentDispositionHeader?: boolean, options: any = {}): FetchArgs {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id','Required parameter id was null or undefined when calling fileDownloadThumbnail.');
      }
      // verify required parameter 'width' is not null or undefined
      if (width === null || width === undefined) {
        throw new RequiredError('width','Required parameter width was null or undefined when calling fileDownloadThumbnail.');
      }
      // verify required parameter 'height' is not null or undefined
      if (height === null || height === undefined) {
        throw new RequiredError('height','Required parameter height was null or undefined when calling fileDownloadThumbnail.');
      }
      // verify required parameter 'mode' is not null or undefined
      if (mode === null || mode === undefined) {
        throw new RequiredError('mode','Required parameter mode was null or undefined when calling fileDownloadThumbnail.');
      }
      const localVarPath = `/api/file/{id}/thumbnail`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      if (width !== undefined) {
        localVarQueryParameter['width'] = width;
      }

      if (height !== undefined) {
        localVarQueryParameter['height'] = height;
      }

      if (mode !== undefined) {
        localVarQueryParameter['mode'] = mode;
      }

      if (applyContentDispositionHeader !== undefined) {
        localVarQueryParameter['applyContentDispositionHeader'] = applyContentDispositionHeader;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};
