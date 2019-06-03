import OLCollection from 'ol/Collection';
import OLFeature from 'ol/Feature';
import OLGeoJSON from 'ol/format/GeoJSON';
import OLVectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import { PolyfillLoadingStrategy } from '../polyfills/PolyfillLoadingStrategy';
import { PolyfillProj } from '../polyfills/PolyfillProj';
import { ProjectionUtils } from '../utils/ProjectionUtils';
import { AlloyLayerZIndex } from '../../types/map/core/AlloyLayerZIndex';

/**
 * Internal class to create OLVectorLayer with WFS feature loader
 * @ignore
 * @internal
 */
export abstract class WfsLayerUtils {
  /**
   * Creates an `OLVectorLayer` with WFS feature loader
   * @param url url of WFS service
   * @param name WFS Feature type name
   * @param version WFS version
   * @param epsg epsg code used for features requests
   * @param zIndex layer z-index
   * @param styleFunction style function for styling WFS features
   * @param featureSetter custom function to process features
   * @ignore
   * @internal
   */
  public static createWfsVectorLayer(
    url: string,
    name: string,
    version: string,
    epsg: number,
    zIndex: AlloyLayerZIndex,
    styleFunction?: (feature: OLFeature, resolution: number) => Style[],
    featureSetter?: (feature: OLFeature[]) => void,
  ): OLVectorLayer {
    const epsgCode = 'EPSG:' + epsg;
    if (epsgCode !== ProjectionUtils.MAP_PROJECTION.getCode()) {
      ProjectionUtils.register(epsg);
    }

    const getFeatureUrl =
      url +
      '?service=WFS' +
      '&version=' +
      version +
      '&request=GetFeature' +
      '&typename=' +
      name +
      '&' +
      (version.startsWith('1') ? 's' : 'c') +
      'rsname=' +
      epsgCode +
      '&outputFormat=json';
    const format = new OLGeoJSON();
    const vectorSource = new VectorSource({
      format,
      loader: (extent, resolution, projection) => {
        const extentUrl =
          getFeatureUrl +
          '&bbox=' +
          extent.join(',') +
          ',' +
          ProjectionUtils.MAP_PROJECTION.getCode();
        const xhr = new XMLHttpRequest();
        xhr.open('GET', extentUrl);
        // tslint:disable-next-line:no-console
        const onError = (e) => console.error('failed to fetch WFS features for extent', extent, e);
        xhr.onerror = onError;
        xhr.onload = () => {
          if (xhr.status === 200) {
            const features = format.readFeatures(xhr.responseText, {
              dataProjection: PolyfillProj.get(epsgCode) || ProjectionUtils.API_PROJECTION,
              featureProjection: ProjectionUtils.MAP_PROJECTION,
            });
            if (features && features.length > 0) {
              if (featureSetter) {
                featureSetter(features);
              }
              vectorSource.addFeatures(features);
            }
          } else {
            onError(`failed, status code: ${xhr.status}, message: ${xhr.statusText}`);
          }
        };
        xhr.send();
      },
      strategy: PolyfillLoadingStrategy.bbox(),
      features: new OLCollection(),
    });

    const vectorLayer = new OLVectorLayer({
      source: vectorSource,
      zIndex,
      visible: true,
      opacity: 1,
      renderMode: 'vector',
      style: styleFunction as ol.StyleFunction,
    });
    return vectorLayer;
  }
}
