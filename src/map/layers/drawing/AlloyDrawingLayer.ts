import * as uuid from 'uuid';
import { AlloyCoordinate } from '../../core/AlloyCoordinate';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyDrawingFeature } from '../../features/AlloyDrawingFeature';
import { AlloyDrawingFeatureFactory } from '../../features/AlloyDrawingFeatureFactory';
import { AlloyDrawingFeatureProperties } from '../../features/AlloyDrawingFeatureProperties';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyLayerWithFeatures } from '../AlloyLayerWithFeatures';
import { AlloyDrawingLayerOptions } from './AlloyDrawingLayerOptions';
import { AlloyDrawingStyleProcessor } from './AlloyDrawingStyleProcessor';

/**
 * an alloy drawing layer for rendering features provided externally on the map
 */
export class AlloyDrawingLayer extends AlloyLayerWithFeatures<AlloyDrawingFeature> {
  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyDrawingLayerOptions) {
    super(AlloyDrawingLayer.name + ':' + uuid.v1(), options.map, AlloyLayerZIndex.Drawing);

    // initialised here because style processor need some of the above internal properties
    this.setStyleProcessor(new AlloyDrawingStyleProcessor(this));
  }

  /**
   * creates and adds a drawn feature to the layer
   * @param properties the properties of the feature
   * @param coordinate the coordinate of the geometry
   */
  public addPointFeature(
    properties: AlloyDrawingFeatureProperties,
    coordinate: AlloyCoordinate,
  ): AlloyDrawingFeature {
    const feature = AlloyDrawingFeatureFactory.createPoint(
      uuid.v1(),
      properties,
      this.id,
      coordinate,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a drawn feature to the layer
   * @param properties the properties of the feature
   * @param coordinates the coordinates of the geometry
   */
  public addMultiPointFeature(
    properties: AlloyDrawingFeatureProperties,
    coordinates: AlloyCoordinate[],
  ): AlloyDrawingFeature {
    const feature = AlloyDrawingFeatureFactory.createMultiPoint(
      uuid.v1(),
      properties,
      this.id,
      coordinates,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a drawn feature to the layer
   * @param properties the properties of the feature
   * @param coordinates the coordinates of the geometry
   */
  public addLineStringFeature(
    properties: AlloyDrawingFeatureProperties,
    coordinates: AlloyCoordinate[],
  ): AlloyDrawingFeature {
    const feature = AlloyDrawingFeatureFactory.createLineString(
      uuid.v1(),
      properties,
      this.id,
      coordinates,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a drawn feature to the layer
   * @param properties the properties of the feature
   * @param coordinates the coordinates of the geometry
   */
  public addMultiLineStringFeature(
    properties: AlloyDrawingFeatureProperties,
    coordinates: AlloyCoordinate[][],
  ): AlloyDrawingFeature {
    const feature = AlloyDrawingFeatureFactory.createMultiLineString(
      uuid.v1(),
      properties,
      this.id,
      coordinates,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a drawn feature to the layer
   * @param properties the properties of the feature
   * @param coordinates the coordinates of the geometry
   */
  public addPolygonFeature(
    properties: AlloyDrawingFeatureProperties,
    coordinates: AlloyCoordinate[][],
  ): AlloyDrawingFeature {
    const feature = AlloyDrawingFeatureFactory.createPolygon(
      uuid.v1(),
      properties,
      this.id,
      coordinates,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a drawn feature to the layer
   * @param properties the properties of the feature
   * @param coordinates the coordinates of the geometry
   */
  public addMultiPolygonFeature(
    properties: AlloyDrawingFeatureProperties,
    coordinates: AlloyCoordinate[][][],
  ): AlloyDrawingFeature {
    const feature = AlloyDrawingFeatureFactory.createMultiPolygon(
      uuid.v1(),
      properties,
      this.id,
      coordinates,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a drawn feature to the layer from a geo json object
   * @param properties the properties of the feature
   * @param geoJson the geo json string or object to create a feature from
   */
  public addFeatureFromGeoJson(
    properties: AlloyDrawingFeatureProperties,
    geoJson: string | any,
  ): AlloyDrawingFeature {
    const feature = AlloyDrawingFeatureFactory.createFromGeoJson(
      uuid.v1(),
      properties,
      this.id,
      geoJson,
    );
    this.addFeature(feature);
    return feature;
  }

  /**
   * creates and adds a drawn feature to the layer from an existing feature
   * @param properties the properties of the feature
   * @param feature the feature to create a drawn feature from
   */
  public addFeatureFromFeature(
    properties: AlloyDrawingFeatureProperties,
    feature: AlloyFeature,
  ): AlloyDrawingFeature {
    const newFeature = AlloyDrawingFeatureFactory.createFromFeature(
      uuid.v1(),
      properties,
      this.id,
      feature,
    );
    this.addFeature(newFeature);
    return newFeature;
  }
}
