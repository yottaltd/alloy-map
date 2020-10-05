import { AlloyBounds } from '@/map/core/AlloyBounds';
import { AlloyCoordinate } from '@/map/core/AlloyCoordinate';
import { AlloyCustomFeature } from '@/map/features/AlloyCustomFeature';
import { AlloyCustomFeatureFactory } from '@/map/features/AlloyCustomFeatureFactory';
import { FeatureUtils, OL_FEATURE_TO_FEATURE_ID } from '@/utils/FeatureUtils';
import { assert } from 'chai';
import OLFeature from 'ol/Feature';
import OLGeoJSON from 'ol/format/GeoJSON';
import OLGeometry from 'ol/geom/Geometry';
import OLLineString from 'ol/geom/LineString';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';

describe(FeatureUtils.name, () => {
  describe(FeatureUtils.createFeatureId.name, () => {
    it('should create feature id', () => {
      const layerCode = 'layers_someCode';
      const id = '5f48c11594257d0ce9218830';
      const expectedFeatureId = `${layerCode}:${id}`;

      const geometry = new OLPoint([1, 1]);
      const feature = createFeature(geometry, id);

      const createdFeatureId = FeatureUtils.createFeatureId(layerCode, feature);

      assert.equal(createdFeatureId, expectedFeatureId);
    });
  });
  describe(FeatureUtils.calculateFeaturesBounds.name, () => {
    it('should calculate feature bounds for a Point', () => {
      const feature = createAlloyFeature(new OLPoint([1, 1]));
      const expectedBounds = createBounds(1, 1, 1, 1);

      const bounds = FeatureUtils.calculateFeaturesBounds([feature]);

      assert.equal(bounds.sw.lon, expectedBounds.sw.lon);
      assert.equal(bounds.sw.lat, expectedBounds.sw.lat);
      assert.equal(bounds.ne.lon, expectedBounds.ne.lon);
      assert.equal(bounds.ne.lat, expectedBounds.ne.lat);
    });
    it('should calculate feature bounds for a LineString', () => {
      const feature = createAlloyFeature(
        new OLLineString([
          [1, 1],
          [2, 2],
        ]),
      );
      const expectedBounds = createBounds(1, 1, 2, 2);

      const bounds = FeatureUtils.calculateFeaturesBounds([feature]);

      assert.equal(bounds.sw.lon, expectedBounds.sw.lon);
      assert.equal(bounds.sw.lat, expectedBounds.sw.lat);
      assert.equal(bounds.ne.lon, expectedBounds.ne.lon);
      assert.equal(bounds.ne.lat, expectedBounds.ne.lat);
    });
    it('should calculate feature bounds for a Polygon', () => {
      const feature = createAlloyFeature(
        new OLPolygon([
          [
            [1, 1],
            [2, 0],
            [3, 1],
            [2, 2],
            [1, 1],
          ],
        ]),
      );
      const expectedBounds = createBounds(1, 0, 3, 2);

      const bounds = FeatureUtils.calculateFeaturesBounds([feature]);

      assert.equal(bounds.sw.lon, expectedBounds.sw.lon);
      assert.equal(bounds.sw.lat, expectedBounds.sw.lat);
      assert.equal(bounds.ne.lon, expectedBounds.ne.lon);
      assert.equal(bounds.ne.lat, expectedBounds.ne.lat);
    });
    it('should calculate feature bounds for multiple geometries', () => {
      const feature1 = createAlloyFeature(new OLPoint([1, 1]));
      const feature2 = createAlloyFeature(new OLPoint([3, -2]));
      const feature3 = createAlloyFeature(new OLPoint([2, 4]));

      const expectedBounds = createBounds(1, -2, 3, 4);

      const bounds = FeatureUtils.calculateFeaturesBounds([feature1, feature2, feature3]);

      assert.equal(bounds.sw.lon.toFixed(2), expectedBounds.sw.lon.toFixed(2));
      assert.equal(bounds.sw.lat.toFixed(2), expectedBounds.sw.lat.toFixed(2));
      assert.equal(bounds.ne.lon.toFixed(2), expectedBounds.ne.lon.toFixed(2));
      assert.equal(bounds.ne.lat.toFixed(2), expectedBounds.ne.lat.toFixed(2));
    });
    it('should calculate feature bounds with buffer', () => {
      const bufferPercent = 10;
      const feature = createAlloyFeature(
        new OLLineString([
          [1, 1],
          [2, 2],
        ]),
      );
      const expectedBounds = createBounds(0.9, 0.9, 2.1, 2.1);

      const bounds = FeatureUtils.calculateFeaturesBounds([feature], bufferPercent);

      assert.equal(bounds.sw.lon.toFixed(2), expectedBounds.sw.lon.toFixed(2));
      assert.equal(bounds.sw.lat.toFixed(2), expectedBounds.sw.lat.toFixed(2));
      assert.equal(bounds.ne.lon.toFixed(2), expectedBounds.ne.lon.toFixed(2));
      assert.equal(bounds.ne.lat.toFixed(2), expectedBounds.ne.lat.toFixed(2));
    });
  });
  describe(FeatureUtils.setFeatureIdForOlFeature.name, () => {
    it('should set alloyId on openlayers feature', () => {
      const feature = createFeature(new OLPoint([1, 1]));
      const id = '5f48c8a894257d0ce9218836';

      FeatureUtils.setFeatureIdForOlFeature(feature, id);

      assert.equal(feature.get(OL_FEATURE_TO_FEATURE_ID), id);
    });
  });
  describe(FeatureUtils.getFeatureIdFromOlFeature.name, () => {
    it('should get alloyId from openlayers feature', () => {
      const feature = createFeature(new OLPoint([1, 1]));
      const id = '5f48c8d594257d0ce9218837';
      feature.set(OL_FEATURE_TO_FEATURE_ID, id);

      const gotId = FeatureUtils.getFeatureIdFromOlFeature(feature);

      assert.equal(id, gotId);
    });
    it('should throw an error when alloyId is not of string type', () => {
      const feature = createFeature(new OLPoint([1, 1]));
      const id = 32167;
      feature.set(OL_FEATURE_TO_FEATURE_ID, id);

      assert.throws(() => FeatureUtils.getFeatureIdFromOlFeature(feature));
    });
  });

  function createFeature(geometry: OLGeometry, id?: string): OLFeature {
    const feature = new OLFeature(geometry);
    if (id) {
      feature.setId(id);
    }

    return feature;
  }

  function createAlloyFeature(geometry: OLGeometry, layerId?: string): AlloyCustomFeature {
    return AlloyCustomFeatureFactory.createFromGeoJson(
      '5f48c24694257d0ce9218833',
      {
        colour: '#32167a',
        title: 'feature_title',
        subtitle: 'feature_subtitle',
      },
      layerId ?? 'layers_someLayer',
      new OLGeoJSON().writeGeometry(geometry),
    );
  }

  function createBounds(swLon: number, swLat: number, neLon: number, neLat: number): AlloyBounds {
    return new AlloyBounds(new AlloyCoordinate(swLon, swLat), new AlloyCoordinate(neLon, neLat));
  }
});
