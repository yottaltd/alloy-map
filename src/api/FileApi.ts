// tslint:disable
import { BaseAPI } from './BaseAPI';
import { FileMoveWebRequestModel } from './FileMoveWebRequestModel';
import { FileApiFp } from './FileApiFp';
/**
 * FileApi - object-oriented interface
 * @export
 * @class FileApi
 * @extends {BaseAPI}
 */
export class FileApi extends BaseAPI {
  /**
   * 
   * @summary Deletes a file
   * @param {string} id The AId of the file to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof FileApi
   */
  public fileDelete(id: string, options?: any) {
    return FileApiFp(this.configuration).fileDelete(id, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Download a file
   * @param {string} id The AId of the file to download
   * @param {boolean} [applyContentDispositionHeader] If true, the content disposition header will be returned and the       download will be seen as a file download by the browser. If false, the header won&#39;t be returned and the image will be displayed as is       If false, the header won&#39;t be returned and the image will be displayed as is
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof FileApi
   */
  public fileDownload(id: string, applyContentDispositionHeader?: boolean, options?: any) {
    return FileApiFp(this.configuration).fileDownload(id, applyContentDispositionHeader, options)(this.fetch, this.basePath);
  }

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
   * @memberof FileApi
   */
  public fileDownloadThumbnail(id: string, width: number, height: number, mode: 'Cover' | 'Contain', applyContentDispositionHeader?: boolean, options?: any) {
    return FileApiFp(this.configuration).fileDownloadThumbnail(id, width, height, mode, applyContentDispositionHeader, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Moves a file to a folder with a given id
   * @param {string} id The AId of the file to move
   * @param {FileMoveWebRequestModel} model The move file model
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof FileApi
   */
  public fileMove(id: string, model: FileMoveWebRequestModel, options?: any) {
    return FileApiFp(this.configuration).fileMove(id, model, options)(this.fetch, this.basePath);
  }

}
