// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { FileMoveWebRequestModel } from './FileMoveWebRequestModel';
import { FileApiFp } from './FileApiFp';
import { FileApi } from './FileApi';
/**
 * FileApi - factory interface
 * @export
 */
export const FileApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary Deletes a file
     * @param {string} id The AId of the file to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    fileDelete(id: string, options?: any) {
      return FileApiFp(configuration).fileDelete(id, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Download a file
     * @param {string} id The AId of the file to download
     * @param {boolean} [applyContentDispositionHeader] If true, the content disposition header will be returned and the       download will be seen as a file download by the browser. If false, the header won&#39;t be returned and the image will be displayed as is       If false, the header won&#39;t be returned and the image will be displayed as is
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    fileDownload(id: string, applyContentDispositionHeader?: boolean, options?: any) {
      return FileApiFp(configuration).fileDownload(id, applyContentDispositionHeader, options)(fetch, basePath);
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
    fileDownloadThumbnail(id: string, width: number, height: number, mode: 'Cover' | 'Contain', applyContentDispositionHeader?: boolean, options?: any) {
      return FileApiFp(configuration).fileDownloadThumbnail(id, width, height, mode, applyContentDispositionHeader, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Moves a file to a folder with a given id
     * @param {string} id The AId of the file to move
     * @param {FileMoveWebRequestModel} model The move file model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    fileMove(id: string, model: FileMoveWebRequestModel, options?: any) {
      return FileApiFp(configuration).fileMove(id, model, options)(fetch, basePath);
    },
  };
};
