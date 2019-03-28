// tslint:disable
import { ImportSettingsAttributeWebModel } from './ImportSettingsAttributeWebModel';
import { ImportSettingsGeometryWebModel } from './ImportSettingsGeometryWebModel';
import { ImportSettingsNetworkReferenceWebModel } from './ImportSettingsNetworkReferenceWebModel';
import { ImportSettingsParentWebModel } from './ImportSettingsParentWebModel';
import { ImportType } from './ImportType';
/**
 * Web model for data import settings
 * @export
 * @interface ImportSettingsDataWebModel
 */
export interface ImportSettingsDataWebModel {
  /**
   * Import type helps us know how to deserialise the input settings class via Discriminator
   * @type {ImportType}
   * @memberof ImportSettingsDataWebModel
   */
  type: ImportType;
  /**
   * The attribute mapping between import and destination design
   * @type {Array<ImportSettingsAttributeWebModel>}
   * @memberof ImportSettingsDataWebModel
   */
  attributes: Array<ImportSettingsAttributeWebModel>;
  /**
   * Optional geometry setting for imported items, if null we assume that imported have no geometry
   * @type {ImportSettingsGeometryWebModel}
   * @memberof ImportSettingsDataWebModel
   */
  geometry?: ImportSettingsGeometryWebModel;
  /**
   * The network reference settings defining how to create new network references when importing items. If empty we assume that imported items have no network references.
   * @type {Array<ImportSettingsNetworkReferenceWebModel>}
   * @memberof ImportSettingsDataWebModel
   */
  networkReferences: Array<ImportSettingsNetworkReferenceWebModel>;
  /**
   * The parent settings defining how to link imported items to parents when importing. If empty we assume that imported items have no parent links.
   * @type {Array<ImportSettingsParentWebModel>}
   * @memberof ImportSettingsDataWebModel
   */
  parents: Array<ImportSettingsParentWebModel>;
  /**
   * Optional item id header, allows user to import items with specific item id
   * @type {string}
   * @memberof ImportSettingsDataWebModel
   */
  itemIdHeader?: string;
}
