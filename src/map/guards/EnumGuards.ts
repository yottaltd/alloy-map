import OLGeometryType from 'ol/geom/GeometryType';
import OLOverlayPositioning from 'ol/OverlayPositioning';
import { AlloyDrawInteractionGeometryType } from '../interactions/AlloyDrawInteractionGeometryType';
import { AlloyOverlayPositioning } from '../overlays/AlloyOverlayPositioning';
import { GeoJSONObjectType } from '../../api';

/**
 * Internal guards for casting enums
 * @internal
 * @ignore
 */
export abstract class EnumGuards {
  /**
   * Converts `AlloyOverlayPositioning` to openlayers overlay positioning
   * @param alloyPositioning alloy overlay positioning
   */
  public static alloyToOpenlayersOverlayPositioning(
    alloyPositioning: AlloyOverlayPositioning,
  ): OLOverlayPositioning | undefined {
    const member = Object.keys(OLOverlayPositioning).find(
      (key) => OLOverlayPositioning[key] === String(alloyPositioning),
    );
    return member ? OLOverlayPositioning[member] : undefined;
  }

  /**
   * Converts `AlloyDrawInteractionGeometryType` to openlayers geometry type
   * @param geometryType alloy draw geometry type
   */
  public static alloyDrawGeometryToOpenlayersGeometryType(
    geometryType: AlloyDrawInteractionGeometryType,
  ): OLGeometryType | undefined {
    const member = Object.keys(OLGeometryType).find(
      (key) => OLGeometryType[key] === String(geometryType),
    );
    return member ? OLGeometryType[member] : undefined;
  }

  /**
   * Converts openlayers geometry type to `GeoJSONObjectType`
   * @param geometryType openlayers geometry type
   */
  public static openlayersGeometryToGeoJSONGeometryType(
    geometryType: OLGeometryType,
  ): GeoJSONObjectType | undefined {
    const member = Object.keys(GeoJSONObjectType).find(
      (key) => GeoJSONObjectType[key] === String(geometryType),
    );
    return member ? GeoJSONObjectType[member] : undefined;
  }
}
