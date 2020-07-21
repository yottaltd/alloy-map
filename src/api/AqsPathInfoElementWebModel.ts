import { DodiAttributeWebModel } from './DodiAttributeWebModel';
import { DodiWebModel } from './DodiWebModel';
/**
 * Aqs Path Info Element web model
 * @export
 * @interface AqsPathInfoElementWebModel
 */
export interface AqsPathInfoElementWebModel {
  /**
   * The crawled dodi
   * @type {DodiWebModel}
   * @memberof AqsPathInfoElementWebModel
   */
  dodi: DodiWebModel;
  /**
   * The attribute used to go from this dodi to the next one in the path. Null if this is the last path element
   * @type {DodiAttributeWebModel}
   * @memberof AqsPathInfoElementWebModel
   */
  linkingAttribute?: DodiAttributeWebModel;
}
