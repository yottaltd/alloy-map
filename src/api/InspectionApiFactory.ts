// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ApplicableDodisAddWebRequestModel } from './ApplicableDodisAddWebRequestModel';
import { ApplicableDodisRemoveWebRequestModel } from './ApplicableDodisRemoveWebRequestModel';
import { InspectionCreateWebRequestModel } from './InspectionCreateWebRequestModel';
import { InspectionEditWebRequestModel } from './InspectionEditWebRequestModel';
import { ItemDesignsForFilterWebRequestModel } from './ItemDesignsForFilterWebRequestModel';
import { InspectionApiFp } from './InspectionApiFp';
import { InspectionApi } from './InspectionApi';
/**
 * InspectionApi - factory interface
 * @export
 */
export const InspectionApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Adds applicable dodis to the inspection design filter. After the dodis has been added the inspection design filter will include all the dodis that are part of that filter.
     * @summary Add applicable dodis to inspection design filter
     * @param {string} code The Guc of the inspection design to add applicable dodis to
     * @param {ApplicableDodisAddWebRequestModel} model The model containing the details of the dodis to add
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    inspectionAddApplicableDodis(code: string, model: ApplicableDodisAddWebRequestModel, options?: any) {
      return InspectionApiFp(configuration).inspectionAddApplicableDodis(code, model, options)(fetch, basePath);
    },
    /**
     * Creates an inspection based on the information sent in the model
     * @summary Create an inspection
     * @param {InspectionCreateWebRequestModel} model Model containing the inspection details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    inspectionCreate(model: InspectionCreateWebRequestModel, options?: any) {
      return InspectionApiFp(configuration).inspectionCreate(model, options)(fetch, basePath);
    },
    /**
     * Delete an inspection item and cleans up
     * @summary Deletes an inspection by id
     * @param {string} id The AId of the inspection to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    inspectionDelete(id: string, options?: any) {
      return InspectionApiFp(configuration).inspectionDelete(id, options)(fetch, basePath);
    },
    /**
     * Edits an inspection based on the information sent in the model
     * @summary Edit an inspection
     * @param {string} id The AId of the inspection item to edit
     * @param {InspectionEditWebRequestModel} model Model containing the new inspection item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    inspectionEdit(id: string, model: InspectionEditWebRequestModel, options?: any) {
      return InspectionApiFp(configuration).inspectionEdit(id, model, options)(fetch, basePath);
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
    inspectionGetApplicableInspectableItemDesignCodesForInspectionDesignCode(code: string, page?: number, pageSize?: number, options?: any) {
      return InspectionApiFp(configuration).inspectionGetApplicableInspectableItemDesignCodesForInspectionDesignCode(code, page, pageSize, options)(fetch, basePath);
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
    inspectionListApplicableInspectionDesigns(itemDesignsModel: ItemDesignsForFilterWebRequestModel, page?: number, pageSize?: number, options?: any) {
      return InspectionApiFp(configuration).inspectionListApplicableInspectionDesigns(itemDesignsModel, page, pageSize, options)(fetch, basePath);
    },
    /**
     * Removes applicable dodis from the inspection design filter. After the dodis has been removed the inspection design filter will include all the dodis that are part of that filter. This does not remove the dodis itself from the system or inspection design, just from its filter.
     * @summary Remove applicable dodis from the inspection design filter
     * @param {string} code The Guc of the inspection design to remove applicable dodis from
     * @param {ApplicableDodisRemoveWebRequestModel} model The model containing the details of the dodis to remove
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    inspectionRemoveApplicableDodis(code: string, model: ApplicableDodisRemoveWebRequestModel, options?: any) {
      return InspectionApiFp(configuration).inspectionRemoveApplicableDodis(code, model, options)(fetch, basePath);
    },
  };
};
