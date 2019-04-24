import * as uuid from 'uuid';
import { AlloyCoordinate } from '../../core/AlloyCoordinate';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyCustomFeature } from '../../features/AlloyCustomFeature';
import { AlloyCustomFeatureFactory } from '../../features/AlloyCustomFeatureFactory';
import { AlloyCustomFeatureProperties } from '../../features/AlloyCustomFeatureProperties';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyLayerWithFeatures } from '../AlloyLayerWithFeatures';
import { AlloyCustomLayerOptions } from './AlloyCustomLayerOptions';
import { AlloyCustomStyleProcessor } from './AlloyCustomStyleProcessor';

/**
 * an alloy custom layer for rendering custom features provided externally on the map, use this to
 * add custom features onto the map and manage them manually
 */
export class AlloyCustomLayer extends AlloyLayerWithFeatures<AlloyCustomFeature> {
  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyCustomLayerOptions) {
    super(AlloyCustomLayer.name + ':' + uuid.v1(), options.map, AlloyLayerZIndex.Drawing);

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
}
