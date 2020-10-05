import { GeoJSONObjectType } from '@/api/GeoJSONObjectType';
// eslint-disable-next-line max-len
import { AlloyDrawInteractionGeometryType } from '@/map/interactions/AlloyDrawInteractionGeometryType';
import { AlloyOverlayPositioning } from '@/map/overlays/AlloyOverlayPositioning';
import { EnumUtils } from '@/utils/EnumUtils';
import { assert } from 'chai';
import OLGeometryType from 'ol/geom/GeometryType';
import OLOverlayPositioning from 'ol/OverlayPositioning';

describe(EnumUtils.name, () => {
  describe(EnumUtils.alloyDrawGeometryToOpenlayersGeometryType.name, () => {
    it('should convert LineString value', () => {
      const drawGeometryType = AlloyDrawInteractionGeometryType.LineString;
      const convertedGeometryType:
        | OLGeometryType
        | undefined = EnumUtils.alloyDrawGeometryToOpenlayersGeometryType(drawGeometryType);

      assert.equal(convertedGeometryType, OLGeometryType.LINE_STRING);
    });
    it('should convert Point value', () => {
      const drawGeometryType = AlloyDrawInteractionGeometryType.Point;
      const convertedGeometryType:
        | OLGeometryType
        | undefined = EnumUtils.alloyDrawGeometryToOpenlayersGeometryType(drawGeometryType);

      assert.equal(convertedGeometryType, OLGeometryType.POINT);
    });
    it('should convert Polygon value', () => {
      const drawGeometryType = AlloyDrawInteractionGeometryType.Polygon;
      const convertedGeometryType:
        | OLGeometryType
        | undefined = EnumUtils.alloyDrawGeometryToOpenlayersGeometryType(drawGeometryType);

      assert.equal(convertedGeometryType, OLGeometryType.POLYGON);
    });
    it('should convert Box value', () => {
      const drawGeometryType = AlloyDrawInteractionGeometryType.Box;
      const convertedGeometryType:
        | OLGeometryType
        | undefined = EnumUtils.alloyDrawGeometryToOpenlayersGeometryType(drawGeometryType);

      assert.equal(convertedGeometryType, OLGeometryType.CIRCLE);
    });
    it('should not convert incorrect value', () => {
      const convertedGeometryType:
        | OLGeometryType
        | undefined = EnumUtils.alloyDrawGeometryToOpenlayersGeometryType('fake_value' as any);

      assert.isUndefined(convertedGeometryType);
    });
  });
  describe(EnumUtils.alloyToOpenlayersOverlayPositioning.name, () => {
    it('should convert alloy overlay positioning to openlayers overlay positioning', () => {
      const alloyOverlayPositioning = AlloyOverlayPositioning.BottomLeft;
      const overlayPositioning:
        | OLOverlayPositioning
        | undefined = EnumUtils.alloyToOpenlayersOverlayPositioning(alloyOverlayPositioning);

      assert.equal(overlayPositioning, OLOverlayPositioning.BOTTOM_LEFT);
    });
    it('should not convert incorrect value', () => {
      const overlayPositioning:
        | OLOverlayPositioning
        | undefined = EnumUtils.alloyToOpenlayersOverlayPositioning('fake_value' as any);

      assert.isUndefined(overlayPositioning);
    });
  });
  describe(EnumUtils.openlayersGeometryToGeoJSONGeometryType.name, () => {
    it('should convert openlayers geometry type to GeoJSON geometry type', () => {
      const geometryType = OLGeometryType.MULTI_LINE_STRING;
      const geoJsonObjectType:
        | GeoJSONObjectType
        | undefined = EnumUtils.openlayersGeometryToGeoJSONGeometryType(geometryType);

      assert.equal(geoJsonObjectType, GeoJSONObjectType.MultiLineString);
    });
    it('should not convert incorrect value', () => {
      const geoJsonObjectType:
        | GeoJSONObjectType
        | undefined = EnumUtils.openlayersGeometryToGeoJSONGeometryType('fake_value' as any);

      assert.isUndefined(geoJsonObjectType);
    });
  });
});
