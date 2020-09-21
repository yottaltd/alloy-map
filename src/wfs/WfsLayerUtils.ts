import OLCollection from 'ol/Collection';
import OLFeature from 'ol/Feature';
import OLEsriJSON from 'ol/format/EsriJSON';
import OLFormat from 'ol/format/Feature';
import OLGeoJSON from 'ol/format/GeoJSON';
import OLGML2 from 'ol/format/GML2';
import OLGML3 from 'ol/format/GML3';
import OLKML from 'ol/format/KML';
import OLWFS from 'ol/format/WFS';
import OLGeometry from 'ol/geom/Geometry';
import OLHeatmapLayer from 'ol/layer/Heatmap';
import OLVectorLayer from 'ol/layer/Vector';
import OLProjection from 'ol/proj/Projection';
import OLRenderFeature from 'ol/render/Feature';
import OLVectorSource from 'ol/source/Vector';
import OLStyle from 'ol/style/Style';
import { AlloyLayerZIndex } from '../map/core/AlloyLayerZIndex';
import { PolyfillLoadingStrategy } from '../polyfills/PolyfillLoadingStrategy';
import { PolyfillProj } from '../polyfills/PolyfillProj';
import { ProjectionUtils } from '../utils/ProjectionUtils';
import { AlloyWfsFormat } from './AlloyWfsFormat';
import { WfsUtils } from './WfsUtils';

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
   * @param loadAll whether to load all features in one go
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
    loadAll?: boolean,
    outputFormat?: string,
    styleFunction?: (
      feature: OLFeature | OLRenderFeature,
      resolution: number,
    ) => OLStyle | OLStyle[],
    featureSetter?: (feature: OLFeature[]) => void,
  ): OLVectorLayer {
    const epsgCode = 'EPSG:' + epsg;

    const getFeatureUrl = new URL(url);
    getFeatureUrl.searchParams.set('service', 'WFS');
    getFeatureUrl.searchParams.set('version', version);
    getFeatureUrl.searchParams.set('request', 'GetFeature');
    getFeatureUrl.searchParams.set('typename', name);
    getFeatureUrl.searchParams.set((version.startsWith('1') ? 's' : 'c') + 'rsname', epsgCode);
    getFeatureUrl.searchParams.set('outputFormat', outputFormat ?? 'json');

    const wfsFormat = outputFormat ? WfsUtils.getAlloyWfsFormatForValue(outputFormat) : undefined;
    const vectorSource = WfsLayerUtils.createWfsVectorSource(
      getFeatureUrl,
      epsg,
      loadAll,
      wfsFormat,
      featureSetter,
    );

    return new OLVectorLayer({
      source: vectorSource,
      zIndex,
      visible: true,
      opacity: 1,
      style: styleFunction,
    });
  }
  /**
   * Creates an `OLHeatmapLayer` with WFS feature loader
   * @param url url of WFS service
   * @param name WFS Feature type name
   * @param version WFS version
   * @param epsg epsg code used for features requests
   * @param zIndex layer z-index
   * @param loadAll whether to load all features in one go
   * @param featureSetter custom function to process features
   * @ignore
   * @internal
   */
  public static createWfsHeatmapLayer(
    url: string,
    name: string,
    version: string,
    epsg: number,
    zIndex: AlloyLayerZIndex,
    weightProperty: string,
    gradient?: string[],
    blur?: number,
    radius?: number,
    loadAll?: boolean,
    outputFormat?: string,
    featureSetter?: (feature: OLFeature[]) => void,
  ): OLHeatmapLayer {
    const epsgCode = 'EPSG:' + epsg;

    const getFeatureUrl = new URL(url);
    getFeatureUrl.searchParams.set('service', 'WFS');
    getFeatureUrl.searchParams.set('version', version);
    getFeatureUrl.searchParams.set('request', 'GetFeature');
    getFeatureUrl.searchParams.set('typename', name);
    getFeatureUrl.searchParams.set((version.startsWith('1') ? 's' : 'c') + 'rsname', epsgCode);
    getFeatureUrl.searchParams.set('outputFormat', outputFormat ?? 'json');

    const wfsFormat = outputFormat ? WfsUtils.getAlloyWfsFormatForValue(outputFormat) : undefined;
    const vectorSource = WfsLayerUtils.createWfsVectorSource(
      getFeatureUrl,
      epsg,
      loadAll,
      wfsFormat,
      featureSetter,
    );

    return new OLHeatmapLayer({
      source: vectorSource,
      zIndex,
      visible: true,
      opacity: 1,
      weight: (feature) => {
        const weight = feature.get(weightProperty);
        let multiplier = 1;
        if (weightProperty === 'postmile') {
          multiplier = 0.01;
        }
        return !!weight && typeof weight === 'number' ? weight * multiplier : 1;
      },
      gradient,
      blur,
      radius,
    });
  }

  private static createWfsVectorSource(
    getFeatureUrl: URL,
    epsg: number,
    loadAll?: boolean,
    wfsFormat?: AlloyWfsFormat | undefined,
    featureSetter?: (feature: OLFeature[]) => void,
    featureConverter?: (feature: OLFeature) => void,
  ): OLVectorSource {
    const epsgCode = 'EPSG:' + epsg;
    const format = WfsLayerUtils.getFormat(wfsFormat);
    const vectorSource = new OLVectorSource({
      format,
      loader: (extent, resolution, projection) => {
        const extentUrl = new URL(getFeatureUrl.href);
        if (!loadAll) {
          extentUrl.searchParams.set(
            'bbox',
            `${extent.join(',')},${ProjectionUtils.MAP_PROJECTION.getCode()}`,
          );
        }

        const onError = (e: any) =>
          // eslint-disable-next-line no-console
          console.error('failed to fetch WFS features for extent', extent, e);
        const fetchPromise = async () => {
          try {
            const response = await fetch(extentUrl.href);
            if (response.status === 200) {
              const text = await response.text();

              let readFeaturesOptions:
                | { dataProjection: OLProjection; featureProjection: OLProjection }
                | undefined;
              if (wfsFormat === AlloyWfsFormat.KML) {
                readFeaturesOptions = {
                  dataProjection: ProjectionUtils.API_PROJECTION,
                  featureProjection: ProjectionUtils.MAP_PROJECTION,
                };
              } else if (epsg === 3857) {
                readFeaturesOptions = undefined;
              } else {
                readFeaturesOptions = {
                  dataProjection: PolyfillProj.get(epsgCode) || ProjectionUtils.API_PROJECTION,
                  featureProjection: ProjectionUtils.MAP_PROJECTION,
                };
              }

              const features = format
                .readFeatures(text, readFeaturesOptions)
                .filter(
                  (feature): feature is OLFeature<OLGeometry> => feature instanceof OLFeature,
                );
              if (features && features.length > 0) {
                if (featureSetter) {
                  featureSetter(features);
                }
                const newFeatures = features.filter(
                  (feature) => vectorSource.getFeatureById(feature.getId()) === null,
                );
                if (featureConverter) {
                  newFeatures.forEach((feature) => {
                    featureConverter(feature);
                  });
                }
                vectorSource.addFeatures(newFeatures);
              }
            } else {
              onError(`failed, status code: ${response.status}, message: ${response.statusText}`);
            }
          } catch (e) {
            onError(e.toString());
          }
        };

        if (epsgCode !== ProjectionUtils.MAP_PROJECTION.getCode()) {
          ProjectionUtils.register(epsg).then(fetchPromise);
        } else {
          fetchPromise();
        }
      },
      strategy: loadAll ? PolyfillLoadingStrategy.all() : PolyfillLoadingStrategy.bbox(),
      features: new OLCollection(),
    });

    return vectorSource;
  }

  /**
   * Gets appropriate openlayers format to read features for outputFormat value
   * @param outputFormat AlloyWfsFormat value to get openlayers format for
   * @returns openlayers format to use to read features from responses
   */
  private static getFormat(outputFormat?: AlloyWfsFormat): OLFormat {
    switch (outputFormat) {
      case AlloyWfsFormat.KML:
        return new OLKML({
          extractStyles: false,
          writeStyles: false,
          showPointNames: false,
        });
      case AlloyWfsFormat.GML2:
        return new OLWFS({
          gmlFormat: new OLGML2(),
        });
      case AlloyWfsFormat.GML3:
        return new OLWFS({
          gmlFormat: new OLGML3(),
        });
      case AlloyWfsFormat.ESRIJSON:
        return new OLEsriJSON();
      case AlloyWfsFormat.JSON:
      default:
        return new OLGeoJSON({ extractGeometryName: true });
    }
  }
}
