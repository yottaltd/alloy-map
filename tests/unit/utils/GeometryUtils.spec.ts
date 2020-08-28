import { AlloyCustomFeatureFactory } from '@/map/features/AlloyCustomFeatureFactory';
import { GeometryUtils } from '@/utils/GeometryUtils';
import { assert } from 'chai';
import {
  Geometry,
  Point,
  MultiPoint,
  LineString,
  MultiLineString,
  Polygon,
  MultiPolygon,
  GeometryCollection,
} from 'geojson';
import OLGeometry from 'ol/geom/Geometry';
import OLPoint from 'ol/geom/Point';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLPolygon from 'ol/geom/Polygon';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLGeoJSON from 'ol/format/GeoJSON';

describe(GeometryUtils.name, () => {
  describe(GeometryUtils.getGeometryBounds.name, () => {
    it('should get geometry bounds for geometry', () => {
      const geometry: Geometry = {
        type: 'LineString',
        coordinates: [
          [1, 1],
          [2, 2],
          [3, 1],
        ],
      };

      const bounds = GeometryUtils.getGeometryBounds(geometry);

      assert.equal(bounds.sw.lon, 1);
      assert.equal(bounds.sw.lat, 1);
      assert.equal(bounds.ne.lon, 3);
      assert.equal(bounds.ne.lat, 2);
    });
  });
  describe(GeometryUtils.getGeometryBoundsForFeature.name, () => {
    it('should get geometry bounds for feature', () => {
      const geometry: Geometry = {
        type: 'LineString',
        coordinates: [
          [1, 1],
          [2, 2],
          [3, 1],
        ],
      };

      const feature = AlloyCustomFeatureFactory.createFromGeoJson(
        '5f48dff494257d0ce9218838',
        {
          colour: '#32167a',
          title: 'feature_title',
          subtitle: 'feature_subtitle',
        },
        'layers_someLayer',
        geometry,
      );

      const bounds = GeometryUtils.getGeometryBoundsForFeature(feature);

      assert.equal(bounds.sw.lon, 1);
      assert.equal(bounds.sw.lat, 1);
      assert.equal(bounds.ne.lon, 3);
      assert.equal(bounds.ne.lat, 2);
    });
  });
  describe(GeometryUtils.isCoordinateEqual.name, () => {
    it('should check that coordinates equal', () => {
      const coordinate1 = [32.67676712, 12.34225346];
      const coordinate2 = [32.67676723, 12.34225378];

      const result = GeometryUtils.isCoordinateEqual(coordinate1, coordinate2);
      assert.isTrue(result);
    });
    it('should check that coordinates do not equal when longitude does not match', () => {
      const coordinate1 = [32.67676712, 12.34225246];
      const coordinate2 = [32.67676823, 12.34225246];

      const result = GeometryUtils.isCoordinateEqual(coordinate1, coordinate2);
      assert.isFalse(result);
    });
    it('should check that coordinates do not equal when latitude does not match', () => {
      const coordinate1 = [32.67676712, 12.34225246];
      const coordinate2 = [32.67676712, 12.34225378];

      const result = GeometryUtils.isCoordinateEqual(coordinate1, coordinate2);
      assert.isFalse(result);
    });
  });
  describe(GeometryUtils.removeCoordinate.name, () => {
    describe('Point geometry', () => {
      it('should remove coordinate from Point geometry', () => {
        const coordinate = [1, 1];
        const geometry: Point = {
          type: 'Point',
          coordinates: coordinate.slice(),
        };
        const olGeometry = geometryToOLGeometry<OLPoint>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isTrue(result);
        assert.isEmpty(olGeometry.getCoordinates());
      });
      it('should not remove coordinate from Point geometry', () => {
        const coordinate = [1, 1];
        const geometry: Point = {
          type: 'Point',
          coordinates: [0, 0],
        };
        const olGeometry = geometryToOLGeometry<OLPoint>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isFalse(result);
        assert.deepEqual(olGeometry.getCoordinates(), geometry.coordinates);
      });
    });
    describe('MultiPoint geometry', () => {
      it('should remove coordinate from MultiPoint geometry', () => {
        const coordinate1 = [1, 1];
        const coordinate2 = [2, 2];
        const geometry: MultiPoint = {
          type: 'MultiPoint',
          coordinates: [coordinate1, coordinate2],
        };
        const olGeometry = geometryToOLGeometry<OLMultiPoint>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate1);
        assert.isTrue(result);

        const olGeometryCoordinates = olGeometry.getCoordinates();
        assert.equal(olGeometryCoordinates.length, 1);
        assert.deepEqual(olGeometryCoordinates[0], coordinate2);
      });
      it('should not remove coordinate from MultiPoint geometry', () => {
        const coordinate = [3, 3];
        const geometry: MultiPoint = {
          type: 'MultiPoint',
          coordinates: [
            [1, 1],
            [2, 2],
          ],
        };
        const olGeometry = geometryToOLGeometry<OLMultiPoint>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isFalse(result);
        assert.deepEqual(olGeometry.getCoordinates(), geometry.coordinates);
      });
    });
    describe('LineString geometry', () => {
      it('should remove coordinate from LineString geometry', () => {
        const coordinate1 = [1, 1];
        const coordinate2 = [2, 2];
        const coordinate3 = [3, 3];
        const geometry: LineString = {
          type: 'LineString',
          coordinates: [coordinate1, coordinate2, coordinate3],
        };
        const olGeometry = geometryToOLGeometry<OLLineString>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate1);
        assert.isTrue(result);

        const olGeometryCoordinates = olGeometry.getCoordinates();
        assert.equal(olGeometryCoordinates.length, 2);
        assert.deepEqual(olGeometryCoordinates, [coordinate2, coordinate3]);
      });
      it('should not remove coordinate from LineString geometry', () => {
        const coordinate = [3, 3];
        const geometry: LineString = {
          type: 'LineString',
          coordinates: [
            [1, 1],
            [2, 2],
          ],
        };
        const olGeometry = geometryToOLGeometry<OLLineString>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isFalse(result);
        assert.deepEqual(olGeometry.getCoordinates(), geometry.coordinates);
      });
    });
    describe('MultiLineString geometry', () => {
      it('should remove coordinate from MultiLineString geometry', () => {
        const coordinate = [1, 1];
        const expectedCoordinates = [
          [
            [2, 2],
            [3, 3],
          ],
          [
            [0, 2],
            [4, 4],
            [6, 0],
          ],
        ];
        const geometry: MultiLineString = {
          type: 'MultiLineString',
          coordinates: [
            [
              [1, 1],
              [2, 2],
              [3, 3],
            ],
            [
              [0, 2],
              [4, 4],
              [6, 0],
            ],
          ],
        };
        const olGeometry = geometryToOLGeometry<OLMultiLineString>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isTrue(result);
        assert.deepEqual(olGeometry.getCoordinates(), expectedCoordinates);
      });
      it('should not remove coordinate from MultiLineString geometry', () => {
        const coordinate = [10, 10];
        const geometry: MultiLineString = {
          type: 'MultiLineString',
          coordinates: [
            [
              [1, 1],
              [2, 2],
              [3, 3],
            ],
            [
              [0, 2],
              [4, 4],
              [6, 0],
            ],
          ],
        };
        const olGeometry = geometryToOLGeometry<OLMultiLineString>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isFalse(result);
        assert.deepEqual(olGeometry.getCoordinates(), geometry.coordinates);
      });
      it('should remove LineString when less than 2 coordinates left after removal', () => {
        const coordinate = [1, 1];
        const expectedCoordinates = [
          [
            [0, 2],
            [4, 4],
            [6, 0],
          ],
        ];
        const geometry: MultiLineString = {
          type: 'MultiLineString',
          coordinates: [
            [
              [1, 1],
              [2, 2],
            ],
            [
              [0, 2],
              [4, 4],
              [6, 0],
            ],
          ],
        };
        const olGeometry = geometryToOLGeometry<OLMultiLineString>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isTrue(result);
        assert.deepEqual(olGeometry.getCoordinates(), expectedCoordinates);
      });
    });
    describe('Polygon geometry', () => {
      it('should remove coordinate from Polygon geometry', () => {
        const coordinate = [0, 0];
        const expectedCoordinates = [
          [
            [1, 0],
            [1, 1],
            [0, 1],
            [1, 0],
          ],
        ];
        const geometry: Polygon = {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              [0, 0],
            ],
          ],
        };
        const olGeometry = geometryToOLGeometry<OLPolygon>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isTrue(result);
        assert.deepEqual(olGeometry.getCoordinates(), expectedCoordinates);
      });
      it('should not remove coordinate from Polygon geometry', () => {
        const coordinate = [2, 2];
        const geometry: Polygon = {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              [0, 0],
            ],
          ],
        };
        const olGeometry = geometryToOLGeometry<OLPolygon>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isFalse(result);
        assert.deepEqual(olGeometry.getCoordinates(), geometry.coordinates);
      });
    });
    describe('MultiPolygon geometry', () => {
      it('should remove coordinate from MultiPolygon geometry', () => {
        const coordinate = [0, 0];
        const expectedCoordinates = [
          [
            [
              [1, 0],
              [1, 1],
              [0, 1],
              [1, 0],
            ],
          ],
          [
            [
              [2, 2],
              [3, 2],
              [3, 3],
              [2, 3],
              [2, 2],
            ],
          ],
        ];
        const geometry: MultiPolygon = {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
                [0, 0],
              ],
            ],
            [
              [
                [2, 2],
                [3, 2],
                [3, 3],
                [2, 3],
                [2, 2],
              ],
            ],
          ],
        };
        const olGeometry = geometryToOLGeometry<OLMultiPolygon>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isTrue(result);
        assert.deepEqual(olGeometry.getCoordinates(), expectedCoordinates);
      });
      it('should not remove coordinate from MultiPolygon geometry', () => {
        const coordinate = [5, 5];
        const geometry: MultiPolygon = {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
                [0, 0],
              ],
            ],
            [
              [
                [2, 2],
                [3, 2],
                [3, 3],
                [2, 3],
                [2, 2],
              ],
            ],
          ],
        };
        const olGeometry = geometryToOLGeometry<OLMultiPolygon>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isFalse(result);
        assert.deepEqual(olGeometry.getCoordinates(), geometry.coordinates);
      });
      it('should remove Polygon when less than 3 coordinates left after removal', () => {
        const coordinate = [0, 0];
        const expectedCoordinates = [
          [
            [
              [2, 2],
              [3, 2],
              [3, 3],
              [2, 3],
              [2, 2],
            ],
          ],
        ];
        const geometry: MultiPolygon = {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 0],
              ],
            ],
            [
              [
                [2, 2],
                [3, 2],
                [3, 3],
                [2, 3],
                [2, 2],
              ],
            ],
          ],
        };
        const olGeometry = geometryToOLGeometry<OLMultiPolygon>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isTrue(result);
        assert.deepEqual(olGeometry.getCoordinates(), expectedCoordinates);
      });
    });
    describe('GeometryCollection geometry', () => {
      it('should remove Point from geometry collection', () => {
        const coordinate = [0, 0];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'Point',
              coordinates: coordinate.slice(),
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isTrue(result);
        assert.isEmpty(olGeometry.getGeometries());
      });
      it('should remove Point from MultiPoint in geometry collection', () => {
        const coordinate1 = [0, 0];
        const coordinate2 = [1, 1];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'MultiPoint',
              coordinates: [coordinate1, coordinate2],
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate1);
        assert.isTrue(result);

        const geometries = olGeometry.getGeometries();
        assert.equal(geometries.length, 1);

        const multiPoint = geometries[0] as OLMultiPoint;
        const multiPointCoordinates = multiPoint.getCoordinates();
        assert.equal(multiPointCoordinates.length, 1);
        assert.deepEqual(multiPointCoordinates[0], coordinate2);
      });
      it('should remove MultiPoint from geometry collection', () => {
        const coordinate = [0, 0];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'MultiPoint',
              coordinates: [coordinate.slice()],
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isTrue(result);
        assert.isEmpty(olGeometry.getGeometries());
      });
      it('should remove coordinate from LineString in geometry collection', () => {
        const coordinate1 = [0, 0];
        const coordinate2 = [1, 1];
        const coordinate3 = [2, 2];
        const expectedCoordinate = [coordinate2, coordinate3];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'LineString',
              coordinates: [coordinate1, coordinate2, coordinate3],
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate1);
        assert.isTrue(result);

        const geometries = olGeometry.getGeometries();
        assert.equal(geometries.length, 1);

        const lineStringGeometry = geometries[0] as OLLineString;
        assert.deepEqual(lineStringGeometry.getCoordinates(), expectedCoordinate);
      });
      it('should remove LineString from geometry collection', () => {
        const coordinate1 = [0, 0];
        const coordinate2 = [1, 1];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'LineString',
              coordinates: [coordinate1, coordinate2],
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate1);
        assert.isTrue(result);
        assert.isEmpty(olGeometry.getGeometries());
      });
      it('should remove coordinate from MultiLineString in geometry collection', () => {
        const coordinate1 = [0, 0];
        const coordinate2 = [1, 1];
        const coordinate3 = [2, 2];
        const expectedCoordinates = [[coordinate2, coordinate3]];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'MultiLineString',
              coordinates: [[coordinate1, coordinate2, coordinate3]],
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate1);
        assert.isTrue(result);

        const geometries = olGeometry.getGeometries();
        assert.equal(geometries.length, 1);

        const multiLineString = geometries[0] as OLMultiLineString;
        assert.deepEqual(multiLineString.getCoordinates(), expectedCoordinates);
      });
      it('should remove LineString from MultiLineString in geometry collection', () => {
        const coordinate1 = [0, 0];
        const coordinate2 = [1, 1];
        const firstLine = [coordinate1, coordinate2];
        const secondLine = [
          [3, 3],
          [4, 4],
          [5, 5],
        ];
        const expectedCoordinates = [secondLine];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'MultiLineString',
              coordinates: [firstLine, secondLine],
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate1);
        assert.isTrue(result);

        const geometries = olGeometry.getGeometries();
        assert.equal(geometries.length, 1);

        const multiLineString = geometries[0] as OLMultiLineString;
        assert.deepEqual(multiLineString.getCoordinates(), expectedCoordinates);
      });
      it('should remove MultiLineString from geometry collection', () => {
        const coordinate1 = [0, 0];
        const coordinate2 = [1, 1];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'MultiLineString',
              coordinates: [[coordinate1, coordinate2]],
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate1);
        assert.isTrue(result);
        assert.isEmpty(olGeometry.getGeometries());
      });
      it('should remove coordinate from Polygon in geometry collection', () => {
        const coordinate1 = [0, 0];
        const coordinate2 = [1, 0];
        const coordinate3 = [1, 1];
        const coordinate4 = [0, 1];
        const expectedCoordinates = [[coordinate2, coordinate3, coordinate4, coordinate2]];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'Polygon',
              coordinates: [[coordinate1, coordinate2, coordinate3, coordinate4, coordinate1]],
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate1);
        assert.isTrue(result);

        const geometries = olGeometry.getGeometries();
        assert.equal(geometries.length, 1);

        const multiLineString = geometries[0] as OLPolygon;
        assert.deepEqual(multiLineString.getCoordinates(), expectedCoordinates);
      });
      it('should remove Polygon from geometry collection', () => {
        const coordinate1 = [0, 0];
        const coordinate2 = [1, 0];
        const coordinate3 = [1, 1];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'Polygon',
              coordinates: [[coordinate1, coordinate2, coordinate3, coordinate1]],
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate1);
        assert.isTrue(result);
        assert.isEmpty(olGeometry.getGeometries());
      });
      it('should remove coordinate from MultiPolygon in geometry collection', () => {
        const coordinate1 = [0, 0];
        const coordinate2 = [1, 0];
        const coordinate3 = [1, 1];
        const coordinate4 = [0, 1];
        const expectedCoordinates = [[[coordinate2, coordinate3, coordinate4, coordinate2]]];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'MultiPolygon',
              coordinates: [[[coordinate1, coordinate2, coordinate3, coordinate4, coordinate1]]],
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate1);
        assert.isTrue(result);

        const geometries = olGeometry.getGeometries();
        assert.equal(geometries.length, 1);

        const multiLineString = geometries[0] as OLMultiPolygon;
        assert.deepEqual(multiLineString.getCoordinates(), expectedCoordinates);
      });
      it('should remove Polygon from MultiPolygon in geometry collection', () => {
        const coordinate1 = [0, 0];
        const coordinate2 = [1, 0];
        const coordinate3 = [1, 1];
        const poly1 = [[coordinate1, coordinate2, coordinate3, coordinate1]];
        const poly2 = [
          [
            [2, 2],
            [2, 3],
            [3, 2],
            [2, 2],
          ],
        ];
        const expectedCoordinates = [poly2];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'MultiPolygon',
              coordinates: [poly1, poly2],
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate1);
        assert.isTrue(result);

        const geometries = olGeometry.getGeometries();
        assert.equal(geometries.length, 1);

        const multiLineString = geometries[0] as OLMultiPolygon;
        assert.deepEqual(multiLineString.getCoordinates(), expectedCoordinates);
      });
      it('should remove MultiPolygon from geometry collection', () => {
        const coordinate1 = [0, 0];
        const coordinate2 = [1, 0];
        const coordinate3 = [1, 1];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'MultiPolygon',
              coordinates: [[[coordinate1, coordinate2, coordinate3, coordinate1]]],
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate1);
        assert.isTrue(result);
        assert.isEmpty(olGeometry.getGeometries());
      });
      it('should not remove coordinate from geometry collection', () => {
        const coordinate = [0, 0];
        const geometry: GeometryCollection = {
          type: 'GeometryCollection',
          geometries: [
            {
              type: 'Point',
              coordinates: [1, 1],
            },
            {
              type: 'LineString',
              coordinates: [
                [2, 2],
                [4, 4],
              ],
            },
            {
              type: 'Polygon',
              coordinates: [
                [
                  [5, 5],
                  [6, 5],
                  [6, 6],
                  [5, 6],
                  [5, 5],
                ],
              ],
            },
          ],
        };
        const olGeometry = geometryToOLGeometry<OLGeometryCollection>(geometry);

        const result = GeometryUtils.removeCoordinate(olGeometry, coordinate);
        assert.isFalse(result);
      });
    });
  });
  describe(GeometryUtils.rotateCoordinate.name, () => {
    const anchor = [0, 0];
    const angle = Math.PI;

    it('should rotate coordinate', () => {
      const coordinate = [1, 1];
      const expectedCoordinate = [-1, -1];

      const rotated = GeometryUtils.rotateCoordinate(coordinate, angle, anchor);

      assert.deepEqual(
        rotated.map((coordinate) => Math.round(coordinate * 1000) / 1000),
        expectedCoordinate,
      );
    });
    it('should not rotate coordinate when it equals to anchor', () => {
      const coordinate = [1, 1];

      const rotated = GeometryUtils.rotateCoordinate(coordinate, angle, coordinate);

      assert.deepEqual(rotated, coordinate);
    });
  });
  describe(GeometryUtils.roundCoordinates.name, () => {
    it('should round geometry coordinates', () => {
      const geometry: Geometry = {
        type: 'LineString',
        coordinates: [
          [1.1225152, 1.3657457423],
          [2.3473434234, 2.436236326],
          [3.23663463, 1.3753423546],
        ],
      };
      const expectedCoordinates = [
        [1.122515, 1.365746],
        [2.347343, 2.436236],
        [3.236635, 1.375342],
      ];

      GeometryUtils.roundCoordinates(geometry);
      assert.deepEqual(geometry.coordinates, expectedCoordinates);
    });
    it('should not round geometry coordinates when they have less than 6dp', () => {
      const coordinates = [
        [1, 1.124],
        [2.2643, 3.325],
        [4.2363, 10.3477],
        [2.213, 12.52356],
      ];
      const geometry: Geometry = {
        type: 'LineString',
        coordinates: coordinates.slice(),
      };

      GeometryUtils.roundCoordinates(geometry);
      assert.deepEqual(geometry.coordinates, coordinates);
    });
  });

  function geometryToOLGeometry<T extends OLGeometry>(geometry: Geometry): T {
    return new OLGeoJSON().readGeometry(geometry) as T;
  }
});
