import OLCollection from 'ol/Collection';
import OLFeature from 'ol/Feature';
import OLGeoJSON from 'ol/format/GeoJSON';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import OLStyle from 'ol/style/Style';
import { AlloyLayerZIndex } from '../map/core/AlloyLayerZIndex';
import { PolyfillLoadingStrategy } from '../polyfills/PolyfillLoadingStrategy';
import { PolyfillProj } from '../polyfills/PolyfillProj';
import { ProjectionUtils } from '../utils/ProjectionUtils';

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
    styleFunction?: (feature: OLFeature, resolution: number) => OLStyle | OLStyle[],
    featureSetter?: (feature: OLFeature[]) => void,
  ): OLVectorLayer {
    const epsgCode = 'EPSG:' + epsg;
    if (epsgCode !== ProjectionUtils.MAP_PROJECTION.getCode()) {
      ProjectionUtils.register(epsg);
    }

    const getFeatureUrl = new URL(url);
    getFeatureUrl.searchParams.set('service', 'WFS');
    getFeatureUrl.searchParams.set('version', version);
    getFeatureUrl.searchParams.set('request', 'GetFeature');
    getFeatureUrl.searchParams.set('typename', name);
    getFeatureUrl.searchParams.set((version.startsWith('1') ? 's' : 'c') + 'rsname', epsgCode);
    getFeatureUrl.searchParams.set('outputFormat', 'json');

    const format = new OLGeoJSON();
    const vectorSource = new OLVectorSource({
      format,
      loader: (extent, resolution, projection) => {
        const extentUrl = new URL(getFeatureUrl.href);
        extentUrl.searchParams.set(
          'bbox',
          `${extent.join(',')},${ProjectionUtils.MAP_PROJECTION.getCode()}`,
        );

        const onError = (e: any) =>
          // tslint:disable-next-line:no-console
          console.error('failed to fetch WFS features for extent', extent, e);
        fetch(extentUrl.href)
          .then((response) => {
            if (response.status === 200) {
              response
                .text()
                .then((text) => {
                  const features = format.readFeatures(text, {
                    dataProjection: PolyfillProj.get(epsgCode) || ProjectionUtils.API_PROJECTION,
                    featureProjection: ProjectionUtils.MAP_PROJECTION,
                  });
                  if (features && features.length > 0) {
                    if (featureSetter) {
                      featureSetter(features);
                    }
                    vectorSource.addFeatures(features);
                  }
                })
                .catch((e) => {
                  onError(`failed to get wfs tile response text`);
                });
            } else {
              onError(`failed, status code: ${response.status}, message: ${response.statusText}`);
            }
          })
          .catch((e) => onError(e.toString()));
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
