import { assert } from 'chai';
import { AlloyBounds } from '@/map/core/AlloyBounds';
import { AlloyCoordinate } from '@/map/core/AlloyCoordinate';
import { LayersChangeEvent } from '@/map/events/LayersChangeEvent';
import { AlloyClusterLayer } from '@/map/layers/cluster/AlloyClusterLayer';
import { AlloyNetworkLayer } from '@/map/layers/network/AlloyNetworkLayer';
import { AlloyLayerStyle } from '@/map/styles/AlloyLayerStyle';
import MapData from '../MapData';

let mapCentre: AlloyCoordinate;

export default function (mapData: MapData) {
  describe('layers', () => {
    beforeEach(() => (mapCentre = mapData.map.centre));

    it('should add cluster layer', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(mapCentre.lon, mapCentre.lat),
        new AlloyCoordinate(mapCentre.lon + 2, mapCentre.lat + 2),
      );
      const layerCode = 'myFakeLayer';
      const styles: AlloyLayerStyle[] = [
        new AlloyLayerStyle('myFakeStyleId', '#cc3300', 'icon-stl'),
      ];
      const id = 'testLayer';
      const layer = new AlloyClusterLayer({
        id,
        bounds,
        layerCode,
        map: mapData.map,
        styles,
      });
      let event: LayersChangeEvent = new LayersChangeEvent(new Map(), new Map());

      // listen to change event
      mapData.map.addLayersChangeListener((e) => {
        event = e;
      });

      // add the layer
      mapData.map.addLayer(layer);

      // check the property is updated
      assert.isTrue(mapData.map.layers.has(layer.id));
      assert.isTrue(event.layers.has(layer.id));
    });

    it('should add network layer', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(mapCentre.lon, mapCentre.lat),
        new AlloyCoordinate(mapCentre.lon + 2, mapCentre.lat + 2),
      );
      const layerCode = 'myFakeLayer';
      const styles: AlloyLayerStyle[] = [
        new AlloyLayerStyle('myFakeStyleId', '#cc3300', 'icon-stl'),
      ];
      const id = 'testLayer';
      const layer = new AlloyNetworkLayer({
        id,
        bounds,
        layerCode,
        map: mapData.map,
        styles,
      });
      let event: LayersChangeEvent = new LayersChangeEvent(new Map(), new Map());

      // listen to change event
      mapData.map.addLayersChangeListener((e) => {
        event = e;
      });

      // add the layer
      mapData.map.addLayer(layer);

      // check the property is updated
      assert.isTrue(mapData.map.layers.has(layer.id));
      assert.isTrue(event.layers.has(layer.id));
    });

    it('should remove layer', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(mapCentre.lon, mapCentre.lat),
        new AlloyCoordinate(mapCentre.lon + 2, mapCentre.lat + 2),
      );
      const layerCode = 'myFakeLayer';
      const styles: AlloyLayerStyle[] = [
        new AlloyLayerStyle('myFakeStyleId', '#cc3300', 'icon-stl'),
      ];
      const id = 'testLayer';
      const layer = new AlloyClusterLayer({
        id,
        bounds,
        layerCode,
        map: mapData.map,
        styles,
      });
      let event: LayersChangeEvent = new LayersChangeEvent(new Map(), new Map());

      // listen to change event
      mapData.map.addLayersChangeListener((e) => {
        event = e;
      });

      // add the layer
      mapData.map.addLayer(layer);

      // check the property is updated
      assert.isTrue(mapData.map.layers.has(layer.id));
      assert.isTrue(event.layers.has(layer.id));

      // remove the layer
      mapData.map.removeLayer(layer);

      // check the property is updated
      assert.isFalse(mapData.map.layers.has(layer.id));
      assert.isFalse(event.layers.has(layer.id));
    });

    it('should not allow layer with same id to be added twice', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(mapCentre.lon, mapCentre.lat),
        new AlloyCoordinate(mapCentre.lon + 2, mapCentre.lat + 2),
      );
      const id = 'layerId';
      const layerCode = 'myFakeLayer';
      const styles: AlloyLayerStyle[] = [
        new AlloyLayerStyle('myFakeStyleId', '#cc3300', 'icon-stl'),
      ];
      const layer = new AlloyClusterLayer({
        id,
        bounds,
        layerCode,
        map: mapData.map,
        styles,
      });
      const layerWithSameCode = new AlloyClusterLayer({
        id,
        bounds,
        layerCode,
        map: mapData.map,
        styles,
      });

      // add the layer
      mapData.map.addLayer(layer);

      // check the property is updated
      assert.isTrue(mapData.map.layers.has(layer.id));

      // try to add a second layer
      assert.throws(() => mapData.map.addLayer(layerWithSameCode));
    });

    it('should not allow layer not in map to be removed', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(mapCentre.lon, mapCentre.lat),
        new AlloyCoordinate(mapCentre.lon + 2, mapCentre.lat + 2),
      );
      const layerCode = 'myFakeLayer';
      const layerCodeOther = 'myOtherFakeLayer';
      const styles: AlloyLayerStyle[] = [
        new AlloyLayerStyle('myFakeStyleId', '#cc3300', 'icon-stl'),
      ];
      const id = 'testLayer';
      const idOther = 'testLayerOther';
      const layer = new AlloyClusterLayer({
        id,
        bounds,
        layerCode,
        map: mapData.map,
        styles,
      });
      const otherLayer = new AlloyClusterLayer({
        id: idOther,
        bounds,
        layerCode: layerCodeOther,
        map: mapData.map,
        styles,
      });

      // add the layer
      mapData.map.addLayer(layer);

      // check the property is updated
      assert.isTrue(mapData.map.layers.has(layer.id));

      assert.throws(() => mapData.map.removeLayer(otherLayer));
    });
  });
}
