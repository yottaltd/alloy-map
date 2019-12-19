// tslint:disable
import { ServiceProviderDefinitionBase } from './ServiceProviderDefinitionBase';
/**
 * Region Edit request
 * @export
 * @interface MasterEditWebRequestModel
 */
export interface MasterEditWebRequestModel {
  /**
   * New service provider
   * @type {ServiceProviderDefinitionBase}
   * @memberof MasterEditWebRequestModel
   */
  serviceProvider?: ServiceProviderDefinitionBase;
}
