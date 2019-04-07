// tslint:disable
import { BaseAPI } from './BaseAPI';
import { PowerBiApiFp } from './PowerBiApiFp';
/**
 * PowerBiApi - object-oriented interface
 * @export
 * @class PowerBiApi
 * @extends {BaseAPI}
 */
export class PowerBiApi extends BaseAPI {
  /**
   * 
   * @summary Delete a power bi report
   * @param {string} reportKey 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PowerBiApi
   */
  public powerBiDeleteReport(reportKey: string, options?: any) {
    return PowerBiApiFp(this.configuration).powerBiDeleteReport(reportKey, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get the embed token to create a power bi report
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PowerBiApi
   */
  public powerBiGetEmbedTokenReportCreate(options?: any) {
    return PowerBiApiFp(this.configuration).powerBiGetEmbedTokenReportCreate(options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get the embed token to edit a power bi report
   * @param {string} reportKey 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PowerBiApi
   */
  public powerBiGetEmbedTokenReportEdit(reportKey: string, options?: any) {
    return PowerBiApiFp(this.configuration).powerBiGetEmbedTokenReportEdit(reportKey, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get the embed token to view a power bi report
   * @param {string} reportKey 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PowerBiApi
   */
  public powerBiGetEmbedTokenReportView(reportKey: string, options?: any) {
    return PowerBiApiFp(this.configuration).powerBiGetEmbedTokenReportView(reportKey, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List the power bi reports
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PowerBiApi
   */
  public powerBiListReports(options?: any) {
    return PowerBiApiFp(this.configuration).powerBiListReports(options)(this.fetch, this.basePath);
  }

}
