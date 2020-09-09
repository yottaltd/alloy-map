
/**
 * 
 * @export
 * @enum {string}
 */
export enum BackgroundTaskType {
  Bulk = 'Bulk',
  RunWorkflow = 'RunWorkflow',
  ImportInitialise = 'ImportInitialise',
  ImportValidate = 'ImportValidate',
  ImportCommit = 'ImportCommit',
  ReportRunner = 'ReportRunner',
  ConfigChanger = 'ConfigChanger',
  Export = 'Export',
  CardCacher = 'CardCacher',
  CustomerBoundingBoxBuilder = 'CustomerBoundingBoxBuilder',
  ItemChangesProcessor = 'ItemChangesProcessor',
  Janitor = 'Janitor',
  MasterJanitor = 'MasterJanitor',
  LayerBuildMonitor = 'LayerBuildMonitor',
  LayerClusterBuilder = 'LayerClusterBuilder',
  LayerBasicBuilder = 'LayerBasicBuilder',
  LayerNetworkBuilder = 'LayerNetworkBuilder',
  Scheduler = 'Scheduler'
}
