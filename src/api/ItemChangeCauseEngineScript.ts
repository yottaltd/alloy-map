import { Guc } from './Guc';
import { ItemChangeCauseBase } from './ItemChangeCauseBase';
/**
 * 
 * @export
 * @interface ItemChangeCauseEngineScript
 */
export interface ItemChangeCauseEngineScript extends ItemChangeCauseBase {
  /**
   * 
   * @type {Guc}
   * @memberof ItemChangeCauseEngineScript
   */
  engineScriptCode: Guc;
}
