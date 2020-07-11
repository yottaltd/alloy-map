import { ServiceProviderDefinitionBase } from './ServiceProviderDefinitionBase';
/**
 * 
 * @export
 * @interface AwsServiceProvider
 */
export interface AwsServiceProvider extends ServiceProviderDefinitionBase {
  /**
   * File provider region
   * @type {string}
   * @memberof AwsServiceProvider
   */
  fileRegion: string;
  /**
   * File provider access key
   * @type {string}
   * @memberof AwsServiceProvider
   */
  fileAccessKey: string;
  /**
   * File provider secret key
   * @type {string}
   * @memberof AwsServiceProvider
   */
  fileSecretKey: string;
  /**
   * File provider bucket
   * @type {string}
   * @memberof AwsServiceProvider
   */
  fileBucket: string;
  /**
   * File provider public bucket for sharing files externally
   * @type {string}
   * @memberof AwsServiceProvider
   */
  filePublicBucket: string;
  /**
   * Email provider region
   * @type {string}
   * @memberof AwsServiceProvider
   */
  emailRegion: string;
  /**
   * Email provider access key
   * @type {string}
   * @memberof AwsServiceProvider
   */
  emailAccessKey: string;
  /**
   * Email provider sender name
   * @type {string}
   * @memberof AwsServiceProvider
   */
  emailSender: string;
  /**
   * Queue provider region
   * @type {string}
   * @memberof AwsServiceProvider
   */
  queueRegion: string;
  /**
   * Queue provider access key
   * @type {string}
   * @memberof AwsServiceProvider
   */
  queueAccessKey: string;
  /**
   * Queue provider secret key
   * @type {string}
   * @memberof AwsServiceProvider
   */
  queueSecretKey: string;
  /**
   * Cache provider host
   * @type {string}
   * @memberof AwsServiceProvider
   */
  cacheHost: string;
  /**
   * Cache provider port
   * @type {number}
   * @memberof AwsServiceProvider
   */
  cachePort: number;
  /**
   * Twilio sid
   * @type {string}
   * @memberof AwsServiceProvider
   */
  twilioAccountSid: string;
  /**
   * Twilio auth
   * @type {string}
   * @memberof AwsServiceProvider
   */
  twilioAuthToken: string;
  /**
   * Twilio sms from
   * @type {string}
   * @memberof AwsServiceProvider
   */
  smsFrom: string;
  /**
   * Lambda region
   * @type {string}
   * @memberof AwsServiceProvider
   */
  lambdaRegion: string;
  /**
   * Lambda access key
   * @type {string}
   * @memberof AwsServiceProvider
   */
  lambdaAccessKey: string;
  /**
   * Lambda secret key
   * @type {string}
   * @memberof AwsServiceProvider
   */
  lambdaSecretKey: string;
  /**
   * Lambda suffix
   * @type {string}
   * @memberof AwsServiceProvider
   */
  lambdaSuffix: string;
}
