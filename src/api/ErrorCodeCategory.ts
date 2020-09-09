import { Configuration } from './configuration';
import { DodiAttributeType } from './DodiAttributeType';
/**
 * 
 * @export
 * @enum {string}
 */
export enum ErrorCodeCategory {
  InternalError = 'InternalError',
  SystemUnderMaintenance = 'SystemUnderMaintenance',
  CircularDependency = 'CircularDependency',
  IncorrectConfiguration = 'IncorrectConfiguration',
  MissingRequestHeader = 'MissingRequestHeader',
  MissingRequestParameter = 'MissingRequestParameter',
  BadRequest = 'BadRequest',
  MultipleErrors = 'MultipleErrors',
  RateLimited = 'RateLimited',
  ResourceLimited = 'ResourceLimited',
  EngineNotInitialized = 'EngineNotInitialized',
  DodiAttributeNotFound = 'DodiAttributeNotFound',
  DodiAttributeWriteForbidden = 'DodiAttributeWriteForbidden',
  DodiAttributeCodeUniqueViolated = 'DodiAttributeCodeUniqueViolated',
  DodiAttributeReadonlyViolated = 'DodiAttributeReadonlyViolated',
  DodiAttributeRequiredViolated = 'DodiAttributeRequiredViolated',
  DodiAttributeTypeViolated = 'DodiAttributeTypeViolated',
  DodiAttributeUniqueViolated = 'DodiAttributeUniqueViolated',
  DodiAttributeOptionConstraintViolated = 'DodiAttributeOptionConstraintViolated',
  DodiAttributeReadForbidden = 'DodiAttributeReadForbidden',
  DodiAttributeOptionsMalformed = 'DodiAttributeOptionsMalformed',
  DodiAttributeCreateForbidden = 'DodiAttributeCreateForbidden',
  DodiAttributeEditForbidden = 'DodiAttributeEditForbidden',
  DodiAttributeDeleteForbidden = 'DodiAttributeDeleteForbidden',
  DodiAttributeOptionInvalid = 'DodiAttributeOptionInvalid',
  DodiAttributeNotInDesign = 'DodiAttributeNotInDesign',
  DodiAttributePermissionAlreadyPresent = 'DodiAttributePermissionAlreadyPresent',
  DodiAttributeLinkItemNotFound = 'DodiAttributeLinkItemNotFound',
  DodiAttributeInUse = 'DodiAttributeInUse',
  CustomerNotFound = 'CustomerNotFound',
  CustomerNotEnabled = 'CustomerNotEnabled',
  CustomerCreateForbidden = 'CustomerCreateForbidden',
  CustomerReadForbidden = 'CustomerReadForbidden',
  CustomerEditForbidden = 'CustomerEditForbidden',
  CustomerUserAlreadyExists = 'CustomerUserAlreadyExists',
  CustomerSignatureMismatch = 'CustomerSignatureMismatch',
  CustomerUserNotFound = 'CustomerUserNotFound',
  CustomerDeleteForbidden = 'CustomerDeleteForbidden',
  FileGenericError = 'FileGenericError',
  FileNotFound = 'FileNotFound',
  FileDownloadFailed = 'FileDownloadFailed',
  FileUploadFailed = 'FileUploadFailed',
  FileDeletionFailed = 'FileDeletionFailed',
  FileListFailed = 'FileListFailed',
  FileFormatNotSupported = 'FileFormatNotSupported',
  FolderCopyFailed = 'FolderCopyFailed',
  FolderListFailed = 'FolderListFailed',
  FolderDeletionFailed = 'FolderDeletionFailed',
  BulkActionNotFound = 'BulkActionNotFound',
  BulkOperationNotSupported = 'BulkOperationNotSupported',
  BulkTransactionAborted = 'BulkTransactionAborted',
  BulkActionDeleteForbidden = 'BulkActionDeleteForbidden',
  ItemCreateForbidden = 'ItemCreateForbidden',
  ItemEditForbidden = 'ItemEditForbidden',
  ItemDeleteForbidden = 'ItemDeleteForbidden',
  ItemReadForbidden = 'ItemReadForbidden',
  ItemSignatureMismatch = 'ItemSignatureMismatch',
  ItemVersionNotFound = 'ItemVersionNotFound',
  ItemGeometryConstraintViolated = 'ItemGeometryConstraintViolated',
  ItemParentsConstraintViolated = 'ItemParentsConstraintViolated',
  ItemSyncForbidden = 'ItemSyncForbidden',
  ItemInvalidCommitOrder = 'ItemInvalidCommitOrder',
  ItemAlreadyExists = 'ItemAlreadyExists',
  ItemCollectionConstraintViolated = 'ItemCollectionConstraintViolated',
  UserUnauthorized = 'UserUnauthorized',
  UserForbidden = 'UserForbidden',
  UserNotFound = 'UserNotFound',
  UserBotNotFound = 'UserBotNotFound',
  UserBadPassword = 'UserBadPassword',
  UserCreateForbidden = 'UserCreateForbidden',
  UserEditForbidden = 'UserEditForbidden',
  UserDeleteForbidden = 'UserDeleteForbidden',
  UserDisableForbidden = 'UserDisableForbidden',
  UserReadForbidden = 'UserReadForbidden',
  UserBotCreateForbidden = 'UserBotCreateForbidden',
  UserPasswordResetForbidden = 'UserPasswordResetForbidden',
  DefaultUserAlreadyExists = 'DefaultUserAlreadyExists',
  UserSignatureMismatch = 'UserSignatureMismatch',
  UserInvalidResetToken = 'UserInvalidResetToken',
  ReadonlyUserNotFound = 'ReadonlyUserNotFound',
  UserAccountLocked = 'UserAccountLocked',
  MasterUserAlreadyExists = 'MasterUserAlreadyExists',
  WebhookGeneric = 'WebhookGeneric',
  HttpRequestFailed = 'HttpRequestFailed',
  AqsInvalidQuery = 'AqsInvalidQuery',
  AqsInternalFailure = 'AqsInternalFailure',
  CacheStoreFailed = 'CacheStoreFailed',
  CacheGetFailed = 'CacheGetFailed',
  JsonDeserializationFailed = 'JsonDeserializationFailed',
  JsonSerializationFailed = 'JsonSerializationFailed',
  ReportInternalError = 'ReportInternalError',
  ReportWrongDesign = 'ReportWrongDesign',
  ReportSignatureMismatch = 'ReportSignatureMismatch',
  ReportReadForbidden = 'ReportReadForbidden',
  ReportCreateForbidden = 'ReportCreateForbidden',
  ReportEditForbidden = 'ReportEditForbidden',
  ReportDeleteForbidden = 'ReportDeleteForbidden',
  ReportParametersError = 'ReportParametersError',
  WorkflowMalformed = 'WorkflowMalformed',
  WorkflowNotFound = 'WorkflowNotFound',
  WorkflowSignatureMismatch = 'WorkflowSignatureMismatch',
  WorkflowReadForbidden = 'WorkflowReadForbidden',
  WorkflowCreateForbidden = 'WorkflowCreateForbidden',
  WorkflowEditForbidden = 'WorkflowEditForbidden',
  WorkflowDeleteForbidden = 'WorkflowDeleteForbidden',
  WorkflowPermissionAlreadyPresent = 'WorkflowPermissionAlreadyPresent',
  WorkflowActionNotFound = 'WorkflowActionNotFound',
  WorkflowActionFailed = 'WorkflowActionFailed',
  WorkflowActionRateLimited = 'WorkflowActionRateLimited',
  WorkflowCloneForbidden = 'WorkflowCloneForbidden',
  WorkflowOffsetLimitReached = 'WorkflowOffsetLimitReached',
  MasterSettingNotFound = 'MasterSettingNotFound',
  DatabaseNotFound = 'DatabaseNotFound',
  DatabaseUniqueConstraint = 'DatabaseUniqueConstraint',
  DatabaseConnection = 'DatabaseConnection',
  DatabaseDocumentUniqueConstraint = 'DatabaseDocumentUniqueConstraint',
  DatabaseTransientError = 'DatabaseTransientError',
  DatabaseParameterInvalid = 'DatabaseParameterInvalid',
  DatabaseNestedError = 'DatabaseNestedError',
  DatabaseTransactionTooLarge = 'DatabaseTransactionTooLarge',
  ModelValidationFailed = 'ModelValidationFailed',
  DodiNotFound = 'DodiNotFound',
  DodiConstraint = 'DodiConstraint',
  DodiIncompatible = 'DodiIncompatible',
  DodiInvalidGeometry = 'DodiInvalidGeometry',
  BlueprintValidation = 'BlueprintValidation',
  ForgeException = 'ForgeException',
  ForgeAccessForbidden = 'ForgeAccessForbidden',
  ForgeModuleNotFound = 'ForgeModuleNotFound',
  ForgeReferenceNotFound = 'ForgeReferenceNotFound',
  ForgeTaskNotFound = 'ForgeTaskNotFound',
  DesignNotFound = 'DesignNotFound',
  DesignCreateForbidden = 'DesignCreateForbidden',
  DesignEditForbidden = 'DesignEditForbidden',
  DesignDeleteForbidden = 'DesignDeleteForbidden',
  DesignSignatureMismatch = 'DesignSignatureMismatch',
  DesignPermissionAlreadyPresent = 'DesignPermissionAlreadyPresent',
  DesignEditForbiddenExistingItems = 'DesignEditForbiddenExistingItems',
  DesignDeleteErrorExistingItems = 'DesignDeleteErrorExistingItems',
  DesignInterfaceNotFound = 'DesignInterfaceNotFound',
  DesignInterfaceSignatureMismatch = 'DesignInterfaceSignatureMismatch',
  DesignInterfaceCreateForbidden = 'DesignInterfaceCreateForbidden',
  DesignInterfaceEditForbidden = 'DesignInterfaceEditForbidden',
  DesignInterfaceDeleteForbidden = 'DesignInterfaceDeleteForbidden',
  DesignInterfaceNotOnDodi = 'DesignInterfaceNotOnDodi',
  UserGroupNotFound = 'UserGroupNotFound',
  UserGroupSignatureMismatch = 'UserGroupSignatureMismatch',
  UserGroupCreateForbidden = 'UserGroupCreateForbidden',
  UserGroupEditForbidden = 'UserGroupEditForbidden',
  UserGroupDeleteForbidden = 'UserGroupDeleteForbidden',
  UserGroupListForbidden = 'UserGroupListForbidden',
  UserGroupReadForbidden = 'UserGroupReadForbidden',
  GucInvalid = 'GucInvalid',
  ImportNotFound = 'ImportNotFound',
  ImportWrongState = 'ImportWrongState',
  ImportFileNotSupported = 'ImportFileNotSupported',
  ImportFileBadFormat = 'ImportFileBadFormat',
  ImportConstraintViolated = 'ImportConstraintViolated',
  ImportConversion = 'ImportConversion',
  ImportRecordNotFound = 'ImportRecordNotFound',
  ImportSignatureMismatch = 'ImportSignatureMismatch',
  ImportCreateForbidden = 'ImportCreateForbidden',
  ImportDeleteForbidden = 'ImportDeleteForbidden',
  ImportNotYetSupported = 'ImportNotYetSupported',
  ImportInternalError = 'ImportInternalError',
  ImportInvalidSetting = 'ImportInvalidSetting',
  ImportEditForbidden = 'ImportEditForbidden',
  ImportReadForbidden = 'ImportReadForbidden',
  DocumentEditFailed = 'DocumentEditFailed',
  DocumentDeleteFailed = 'DocumentDeleteFailed',
  BsonDeserializationFailed = 'BsonDeserializationFailed',
  BsonSerializationFailed = 'BsonSerializationFailed',
  CustomerSettingNotFound = 'CustomerSettingNotFound',
  CardNotFound = 'CardNotFound',
  CardCreateForbidden = 'CardCreateForbidden',
  CardDeleteForbidden = 'CardDeleteForbidden',
  CardEditForbidden = 'CardEditForbidden',
  CardQueryInvalid = 'CardQueryInvalid',
  CardSignatureMismatch = 'CardSignatureMismatch',
  CardReadForbidden = 'CardReadForbidden',
  CardPermissionAlreadyPresent = 'CardPermissionAlreadyPresent',
  ItemLogNotFound = 'ItemLogNotFound',
  LayerNotFound = 'LayerNotFound',
  LayerSignatureMismatch = 'LayerSignatureMismatch',
  LayerReadForbidden = 'LayerReadForbidden',
  LayerCreateForbidden = 'LayerCreateForbidden',
  LayerEditForbidden = 'LayerEditForbidden',
  LayerDeleteForbidden = 'LayerDeleteForbidden',
  LayerStyleNotFound = 'LayerStyleNotFound',
  LayerStyleMalformed = 'LayerStyleMalformed',
  LayerTileRequestMalformed = 'LayerTileRequestMalformed',
  LayerPermissionAlreadyPresent = 'LayerPermissionAlreadyPresent',
  LayerBuildBadRequest = 'LayerBuildBadRequest',
  LogNotFound = 'LogNotFound',
  MeshNotFound = 'MeshNotFound',
  MeshSignatureMismatch = 'MeshSignatureMismatch',
  MeshReadForbidden = 'MeshReadForbidden',
  MeshCreateForbidden = 'MeshCreateForbidden',
  MeshEditForbidden = 'MeshEditForbidden',
  MeshDeleteForbidden = 'MeshDeleteForbidden',
  MeshPermissionAlreadyPresent = 'MeshPermissionAlreadyPresent',
  MeshCallFailed = 'MeshCallFailed',
  MongoBackupFailed = 'MongoBackupFailed',
  MongoRestoreFailed = 'MongoRestoreFailed',
  UserSessionInvalid = 'UserSessionInvalid',
  UserSessionOAuthFailure = 'UserSessionOAuthFailure',
  CardQueryNotFound = 'CardQueryNotFound',
  AuthLogNotFound = 'AuthLogNotFound',
  AIdInvalid = 'AIdInvalid',
  ModuleNotFound = 'ModuleNotFound',
  ModuleCreateForbidden = 'ModuleCreateForbidden',
  ModuleEditForbidden = 'ModuleEditForbidden',
  ModuleDeleteForbidden = 'ModuleDeleteForbidden',
  UpgradeInternalError = 'UpgradeInternalError',
  SystemLogNotFound = 'SystemLogNotFound',
  SystemLogDeleteForbidden = 'SystemLogDeleteForbidden',
  RouteNotFound = 'RouteNotFound',
  RouteOsrmException = 'RouteOsrmException',
  RouteItemGeometry = 'RouteItemGeometry',
  RouteCouldNotBeGenerated = 'RouteCouldNotBeGenerated',
  WorkflowLogNotFound = 'WorkflowLogNotFound',
  ExportFormatNotSupported = 'ExportFormatNotSupported',
  ExportTaskFileNotFound = 'ExportTaskFileNotFound',
  GeometryInvalid = 'GeometryInvalid',
  PowerBiAccessForbidden = 'PowerBiAccessForbidden',
  SmsError = 'SmsError',
  ExtendedApiInvalidType = 'ExtendedApiInvalidType',
  AccessPolicyNotFound = 'AccessPolicyNotFound',
  AccessPolicySignatureMismatch = 'AccessPolicySignatureMismatch',
  AccessPolicyRuleNotFound = 'AccessPolicyRuleNotFound',
  AccessPolicyReadForbidden = 'AccessPolicyReadForbidden',
  AccessPolicyCreateForbidden = 'AccessPolicyCreateForbidden',
  AccessPolicyEditForbidden = 'AccessPolicyEditForbidden',
  AccessPolicyDeleteForbidden = 'AccessPolicyDeleteForbidden',
  AccessPolicyInvalidRuleNotFound = 'AccessPolicyInvalidRuleNotFound',
  ProfileDataCreateForbidden = 'ProfileDataCreateForbidden',
  ProfileDataDeleteForbidden = 'ProfileDataDeleteForbidden',
  ProfileDataSetInvalid = 'ProfileDataSetInvalid',
  ProfileDataNotFound = 'ProfileDataNotFound',
  SyncConnectionClosed = 'SyncConnectionClosed',
  WorkflowActionGroupNotFound = 'WorkflowActionGroupNotFound',
  WorkflowActionGroupSignatureMismatch = 'WorkflowActionGroupSignatureMismatch',
  WorkflowActionGroupReadForbidden = 'WorkflowActionGroupReadForbidden',
  WorkflowActionGroupCreateForbidden = 'WorkflowActionGroupCreateForbidden',
  WorkflowActionGroupEditForbidden = 'WorkflowActionGroupEditForbidden',
  WorkflowActionGroupDeleteForbidden = 'WorkflowActionGroupDeleteForbidden',
  WorkflowActionGroupPermissionAlreadyPresent = 'WorkflowActionGroupPermissionAlreadyPresent',
  WorkflowActionGroupMalformed = 'WorkflowActionGroupMalformed',
  WorkflowActionGroupActionNotFound = 'WorkflowActionGroupActionNotFound',
  CustomReportNotFound = 'CustomReportNotFound',
  CustomReportSignatureMismatch = 'CustomReportSignatureMismatch',
  CustomReportGenerationFailed = 'CustomReportGenerationFailed',
  CustomReportBadFormat = 'CustomReportBadFormat',
  CustomReportDataSourceMalformed = 'CustomReportDataSourceMalformed',
  CustomReportDocumentDefinitionAlreadyExists = 'CustomReportDocumentDefinitionAlreadyExists',
  CustomReportDocumentDefinitionNotFound = 'CustomReportDocumentDefinitionNotFound',
  BasemapNotFound = 'BasemapNotFound',
  BasemapCreateForbidden = 'BasemapCreateForbidden',
  BasemapDeleteForbidden = 'BasemapDeleteForbidden',
  BasemapEditForbidden = 'BasemapEditForbidden',
  BasemapSignatureMismatch = 'BasemapSignatureMismatch',
  BasemapReadForbidden = 'BasemapReadForbidden',
  BasemapPermissionAlreadyPresent = 'BasemapPermissionAlreadyPresent',
  RoleListForbidden = 'RoleListForbidden',
  RoleDeleteForbidden = 'RoleDeleteForbidden',
  RoleEditForbidden = 'RoleEditForbidden',
  RoleCreateForbidden = 'RoleCreateForbidden',
  RoleNotFound = 'RoleNotFound',
  RoleSignatureMismatch = 'RoleSignatureMismatch',
  RoleReadForbidden = 'RoleReadForbidden',
  BackgroundTaskInfoNotFound = 'BackgroundTaskInfoNotFound',
  BackgroundTaskInfoSignatureMismatch = 'BackgroundTaskInfoSignatureMismatch',
  BackgroundTaskInfoPreviousTaskNotFinished = 'BackgroundTaskInfoPreviousTaskNotFinished',
  BackgroundTaskNotFound = 'BackgroundTaskNotFound',
  BackgroundTaskInvalid = 'BackgroundTaskInvalid',
  BackgroundTaskStorageNotFound = 'BackgroundTaskStorageNotFound',
  BackgroundTaskStorageSignatureMismatch = 'BackgroundTaskStorageSignatureMismatch',
  BackgroundTaskStorageUniqueConstraintViolated = 'BackgroundTaskStorageUniqueConstraintViolated',
  EngineScriptNotFound = 'EngineScriptNotFound',
  EngineScriptCreateForbidden = 'EngineScriptCreateForbidden',
  EngineScriptReadForbidden = 'EngineScriptReadForbidden',
  EngineScriptDeleteForbidden = 'EngineScriptDeleteForbidden',
  EngineScriptEditForbidden = 'EngineScriptEditForbidden',
  EngineScriptValidationFailed = 'EngineScriptValidationFailed',
  EngineScriptSignatureMismatch = 'EngineScriptSignatureMismatch'
}
