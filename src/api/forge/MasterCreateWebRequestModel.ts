import { BackgroundTaskStorageCreateWebRequestModel } from './BackgroundTaskStorageCreateWebRequestModel';
import { ServiceProviderDefinitionBase } from './ServiceProviderDefinitionBase';
/**
 * Region Create request
 * @export
 * @interface MasterCreateWebRequestModel
 */
export interface MasterCreateWebRequestModel {
  /**
   * Id of cluster to create master on
   * @type {string}
   * @memberof MasterCreateWebRequestModel
   */
  clusterId: string;
  /**
   * Name of master
   * @type {string}
   * @memberof MasterCreateWebRequestModel
   */
  name: string;
  /**
   * Service provider to use
   * @type {ServiceProviderDefinitionBase}
   * @memberof MasterCreateWebRequestModel
   */
  serviceProvider: ServiceProviderDefinitionBase;
  /**
   * The information to create the first background task storage
   * @type {BackgroundTaskStorageCreateWebRequestModel}
   * @memberof MasterCreateWebRequestModel
   */
  backgroundTaskStorage: BackgroundTaskStorageCreateWebRequestModel;
}
