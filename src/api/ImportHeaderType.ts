import { HeaderType } from './HeaderType';
import { ImportHeader } from './ImportHeader';
/**
 * 
 * @export
 * @enum {string}
 */
export enum ImportHeaderType {
  String = 'String',
  Number = 'Number',
  DateTime = 'DateTime',
  Boolean = 'Boolean',
  Geometry = 'Geometry',
  Unknown = 'Unknown'
}
