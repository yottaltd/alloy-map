
/**
 * Web model for a dodi attribute operations summary
 * @export
 * @interface DodiAttributeOperationsSummaryWebModel
 */
export interface DodiAttributeOperationsSummaryWebModel {
  /**
   * The code of the attribute to which this operations summary belongs to
   * @type {string}
   * @memberof DodiAttributeOperationsSummaryWebModel
   */
  attributeCode: string;
  /**
   * If true, the user has permissions to edit the correspondent dodi attribute, that is the attribute on the dodi which holds the attribute config, and not the item attribute, which is the attribute on an item and the one holding the actual value
   * @type {boolean}
   * @memberof DodiAttributeOperationsSummaryWebModel
   */
  canWriteDodiAttribute: boolean;
  /**
   * If true, the user has permissions to delete the correspondent dodi attribute, that is the attribute on the dodi which holds the attribute config, and not the item attribute, which is the attribute on an item and the one holding the actual value
   * @type {boolean}
   * @memberof DodiAttributeOperationsSummaryWebModel
   */
  canDeleteDodiAttribute: boolean;
  /**
   * If true, the user has permissions to edit or delete the correspondent item attribute, that is the attribute on the item which holds the actual value, and not the dodi attribute, which is the attribute on the dodi which holds the attribute config
   * @type {boolean}
   * @memberof DodiAttributeOperationsSummaryWebModel
   */
  canWriteItemAttribute: boolean;
}
