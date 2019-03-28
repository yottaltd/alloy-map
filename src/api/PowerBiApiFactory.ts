// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { PowerBiApiFp } from './PowerBiApiFp';
import { PowerBiApi } from './PowerBiApi';
/**
 * PowerBiApi - factory interface
 * @export
 */
export const PowerBiApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary Delete a power bi report
     * @param {string} reportKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiDeleteReport(reportKey: string, options?: any) {
      return PowerBiApiFp(configuration).powerBiDeleteReport(reportKey, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get the embed token to create a power bi report
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiGetEmbedTokenReportCreate(options?: any) {
      return PowerBiApiFp(configuration).powerBiGetEmbedTokenReportCreate(options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get the embed token to edit a power bi report
     * @param {string} reportKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiGetEmbedTokenReportEdit(reportKey: string, options?: any) {
      return PowerBiApiFp(configuration).powerBiGetEmbedTokenReportEdit(reportKey, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get the embed token to view a power bi report
     * @param {string} reportKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiGetEmbedTokenReportView(reportKey: string, options?: any) {
      return PowerBiApiFp(configuration).powerBiGetEmbedTokenReportView(reportKey, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List the power bi reports
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiListReports(options?: any) {
      return PowerBiApiFp(configuration).powerBiListReports(options)(fetch, basePath);
    },
  };
};
