import { AlloyWfsFeatureType } from './AlloyWfsFeatureType';

/**
 * Wrapper for parsed WFS Capabilties response
 */
export interface AlloyWfsCapabilities {
  /**
   * Title of WFS service
   */
  title: string;
  /**
   * Base URL for WFS service requests
   */
  url: string;
  /**
   * WFS service version
   */
  version: string;
  /**
   * Collection of feature types available on WFS service
   */
  featureTypes: AlloyWfsFeatureType[];

  /**
   * Supported output formats of WFS service
   */
  outputFormats: string[];
}
