import { AlloyCoordinate } from '@/map/core/AlloyCoordinate';
import { AlloyLayerZIndex } from '@/map/core/AlloyLayerZIndex';
import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyCustomFeature } from '@/map/features/AlloyCustomFeature';
import { AlloyCustomFeatureBase } from '@/map/features/AlloyCustomFeatureBase';
import { AlloyCustomFeatureFactory } from '@/map/features/AlloyCustomFeatureFactory';
import { AlloyCustomFeatureProperties } from '@/map/features/AlloyCustomFeatureProperties';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyLayerWithFeatures } from '@/map/layers/AlloyLayerWithFeatures';
import { AlloyCustomLayerOptions } from '@/map/layers/custom/AlloyCustomLayerOptions';
import { AlloyCustomStyleProcessor } from '@/map/layers/custom/AlloyCustomStyleProcessor';
import * as uuid from 'uuid';

/**
 * an alloy custom layer for rendering custom features provided externally on the map, use this to
 * add custom features onto the map and manage them manually
 */
export class AlloyCustomLayer extends AlloyLayerWithFeatures<AlloyCustomFeatureBase> {
  /**
   * Initialisation options for this layer.
   */
  private readonly options: AlloyCustomLayerOptions;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyCustomLayerOptions) {
    super(options.id, options.map, AlloyLayerZIndex.Drawing);
    this.options = options;

    // initialised here because style processor need some of the above internal properties
    this.setStyleProcessor(new AlloyCustomStyleProcessor(this));
  }

  /**
   * creates and adds a custom feature to the layer
   * @param properties the properties of the feature
   * @param coordinate the coordinate of the geometry
   */
  public addPointFeature(
    properties: AlloyCustomFeatureProperties,
    coordinate: AlloyCoordinate,
  ): AlloyCustomFeature {
    const feature = AlloyCustomFeatureFactory.createPoint(
      uuid.v1(),
      properties,
      this.id,
      coordinate,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a custom feature to the layer
   * @param properties the properties of the feature
   * @param coordinates the coordinates of the geometry
   */
  public addMultiPointFeature(
    properties: AlloyCustomFeatureProperties,
    coordinates: AlloyCoordinate[],
  ): AlloyCustomFeature {
    const feature = AlloyCustomFeatureFactory.createMultiPoint(
      uuid.v1(),
      properties,
      this.id,
      coordinates,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a custom feature to the layer
   * @param properties the properties of the feature
   * @param coordinates the coordinates of the geometry
   */
  public addLineStringFeature(
    properties: AlloyCustomFeatureProperties,
    coordinates: AlloyCoordinate[],
  ): AlloyCustomFeature {
    const feature = AlloyCustomFeatureFactory.createLineString(
      uuid.v1(),
      properties,
      this.id,
      coordinates,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a custom feature to the layer
   * @param properties the properties of the feature
   * @param coordinates the coordinates of the geometry
   */
  public addMultiLineStringFeature(
    properties: AlloyCustomFeatureProperties,
    coordinates: AlloyCoordinate[][],
  ): AlloyCustomFeature {
    const feature = AlloyCustomFeatureFactory.createMultiLineString(
      uuid.v1(),
      properties,
      this.id,
      coordinates,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a custom feature to the layer
   * @param properties the properties of the feature
   * @param coordinates the coordinates of the geometry
   */
  public addPolygonFeature(
    properties: AlloyCustomFeatureProperties,
    coordinates: AlloyCoordinate[][],
  ): AlloyCustomFeature {
    const feature = AlloyCustomFeatureFactory.createPolygon(
      uuid.v1(),
      properties,
      this.id,
      coordinates,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a custom feature to the layer
   * @param properties the properties of the feature
   * @param coordinates the coordinates of the geometry
   */
  public addMultiPolygonFeature(
    properties: AlloyCustomFeatureProperties,
    coordinates: AlloyCoordinate[][][],
  ): AlloyCustomFeature {
    const feature = AlloyCustomFeatureFactory.createMultiPolygon(
      uuid.v1(),
      properties,
      this.id,
      coordinates,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a custom feature to the layer from a geo json object
   * @param properties the properties of the feature
   * @param geoJson the geo json string or object to create a feature from
   */
  public addFeatureFromGeoJson(
    properties: AlloyCustomFeatureProperties,
    geoJson: string | any,
  ): AlloyCustomFeature {
    const feature = AlloyCustomFeatureFactory.createFromGeoJson(
      uuid.v1(),
      properties,
      this.id,
      geoJson,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a custom feature to the layer from an existing feature
   * @param properties the properties of the feature
   * @param feature the feature to create a custom feature from
   */
  public addFeatureFromFeature(
    properties: AlloyCustomFeatureProperties,
    feature: AlloyFeature,
  ): AlloyCustomFeature {
    const newFeature = AlloyCustomFeatureFactory.createFromFeature(
      uuid.v1(),
      properties,
      this.id,
      feature,
    );
    this.addFeature(newFeature);
    return newFeature;
  }

  /**
   * @implements
   */
  public dispose() {
    // nothing to clean up
  }

  /**
   * @implements
   */
  public clone(map: AlloyMap): AlloyCustomLayer {
    const newOptions = Object.assign({}, this.options, { map });
    return new AlloyCustomLayer(newOptions);
  }
}
