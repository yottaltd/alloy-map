export interface AlloyWMSCapabilitiesLayer {
  /**
   * Title of the layer (displayed to user)
   */
  title: string;
  /**
   * Available child layers
   */
  layers: AlloyWMSCapabilitiesLayer[];
  /**
   * Whether layer is provided as opaque
   */
  opaque: boolean;
  /**
   * Name for layer request, if WMS parent layer acts as a wrapper then it's undefined
   */
  name?: string;
}
