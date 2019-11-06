import { assert } from 'chai';
import { AlloyBounds } from '../../../src/map/core/AlloyBounds';
import { AlloyCoordinate } from '../../../src/map/core/AlloyCoordinate';
import { LayersChangeEvent } from '../../../src/map/events/LayersChangeEvent';
import { AlloyClusterLayer } from '../../../src/map/layers/cluster/AlloyClusterLayer';
import { AlloyNetworkLayer } from '../../../src/map/layers/network/AlloyNetworkLayer';
import { AlloyLayerStyle } from '../../../src/map/styles/AlloyLayerStyle';
import MapData from '../MapData';

const jsonData = '@data';
const fixture = 'cypress/specs/all/_defaults.json';

export default function(mapData: MapData) {
  describe('layers', () => {
    beforeEach(() => cy.readFile(fixture).as(jsonData.substring(1)));

    it('should add cluster layer', () => {
      cy.get(jsonData).then((data: any) => {
        // test data
        const bounds = new AlloyBounds(
          new AlloyCoordinate(data.ukLon, data.ukLat),
          new AlloyCoordinate(data.ukLon + 2, data.ukLat + 2),
        );
        const layerCode = 'myFakeLayer';
        const styles: AlloyLayerStyle[] = [
          {
            colour: '#cc3300',
            icon: 'icon-stl',
            styleId: 'myFakeStyleId',
          },
        ];
        const layer = new AlloyClusterLayer({
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
    });

    it('should add network layer', () => {
      cy.get(jsonData).then((data: any) => {
        // test data
        const bounds = new AlloyBounds(
          new AlloyCoordinate(data.ukLon, data.ukLat),
          new AlloyCoordinate(data.ukLon + 2, data.ukLat + 2),
        );
        const layerCode = 'myFakeLayer';
        const styles: AlloyLayerStyle[] = [
          {
            colour: '#cc3300',
            icon: 'icon-stl',
            styleId: 'myFakeStyleId',
          },
        ];
        const layer = new AlloyNetworkLayer({
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
    });

    it('should remove layer', () => {
      cy.get(jsonData).then((data: any) => {
        // test data
        const bounds = new AlloyBounds(
          new AlloyCoordinate(data.ukLon, data.ukLat),
          new AlloyCoordinate(data.ukLon + 2, data.ukLat + 2),
        );
        const layerCode = 'myFakeLayer';
        const styles: AlloyLayerStyle[] = [
          {
            colour: '#cc3300',
            icon: 'icon-stl',
            styleId: 'myFakeStyleId',
          },
        ];
        const layer = new AlloyClusterLayer({
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
    });

    it('should not allow layer with same id to be added twice', () => {
      cy.get(jsonData).then((data: any) => {
        // test data
        const bounds = new AlloyBounds(
          new AlloyCoordinate(data.ukLon, data.ukLat),
          new AlloyCoordinate(data.ukLon + 2, data.ukLat + 2),
        );
        const layerCode = 'myFakeLayer';
        const styles: AlloyLayerStyle[] = [
          {
            colour: '#cc3300',
            icon: 'icon-stl',
            styleId: 'myFakeStyleId',
          },
        ];
        const layer = new AlloyClusterLayer({
          bounds,
          layerCode,
          map: mapData.map,
          styles,
        });
        const layerWithSameCode = new AlloyClusterLayer({
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
    });

    it('should not allow layer not in map to be removed', () => {
      cy.get(jsonData).then((data: any) => {
        // test data
        const bounds = new AlloyBounds(
          new AlloyCoordinate(data.ukLon, data.ukLat),
          new AlloyCoordinate(data.ukLon + 2, data.ukLat + 2),
        );
        const layerCode = 'myFakeLayer';
        const layerCodeOther = 'myOtherFakeLayer';
        const styles: AlloyLayerStyle[] = [
          {
            colour: '#cc3300',
            icon: 'icon-stl',
            styleId: 'myFakeStyleId',
          },
        ];
        const layer = new AlloyClusterLayer({
          bounds,
          layerCode,
          map: mapData.map,
          styles,
        });
        const otherLayer = new AlloyClusterLayer({
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
  });
}
