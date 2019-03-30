import { AlloyBasemapFactory } from '../../src/models/basemaps/AlloyBasemapFactory';
import { AlloyBounds } from '../../src/models/core/AlloyBounds';
import { AlloyCoordinate } from '../../src/models/core/AlloyCoordinate';
import { AlloyMap } from '../../src/models/core/AlloyMap';
import { MapChangeCentreEvent } from '../../src/models/events/MapChangeCentreEvent';
import { MapChangeZoomEvent } from '../../src/models/events/MapChangeZoomEvent';
import { AlloyClusterLayer } from '../../src/models/layers/cluster/AlloyClusterLayer';
import { AlloyClusterLayerStyle } from '../../src/models/layers/cluster/AlloyClusterLayerStyle';
import { AlloyNetworkLayer } from '../../src/models/layers/network/AlloyNetworkLayer';
import { AlloyNetworkLayerStyle } from '../../src/models/layers/network/AlloyNetworkLayerStyle';

describe('map', () => {
  const UK_LON = -2;
  const UK_LAT = 52;
  const MAP_ZOOM = 10;
  const MAP_CENTRE = new AlloyCoordinate(UK_LON, UK_LAT);
  const API_URL = 'https://api.labs.alloyapp.io';
  const API_TOKEN = 'XYZ';
  let map: AlloyMap;

  beforeEach(() => {
    cy.visit('/www/index.html');
    cy.get('#map').then((el) => {
      map = new AlloyMap({
        api: API_URL,
        token: API_TOKEN,
        element: el[0],
        centre: MAP_CENTRE,
        zoom: MAP_ZOOM,
      });
    });
  });

  describe('navigation', () => {
    it('should set centre and trigger centre event', () => {
      // test data
      const coordinate = new AlloyCoordinate(UK_LON - 1, UK_LAT + 1);
      const expected = new AlloyCoordinate(UK_LON - 1, UK_LAT + 1);
      let event = new MapChangeCentreEvent(new AlloyCoordinate(0, 0), 0, [0, 0, 0, 0]);

      // listen to change event
      map.addMapChangeCentreListener((e) => {
        event = e;
      });

      // update the centre
      map.setCentre(coordinate);

      // events exposed via the map instance are debounced
      cy.wait(500).then(() => {
        // check the event and property is updated
        assert.isTrue(event.centre.equals(expected));
        assert.isTrue(map.centre.equals(expected));
      });
    });

    it('should set zoom and trigger zoom event', () => {
      // test data
      const zoom = MAP_ZOOM + 2;
      const expected = MAP_ZOOM + 2;
      let event = new MapChangeZoomEvent(0, 0);

      // listen to change event
      map.addMapChangeZoomListener((e) => {
        event = e;
      });

      // update the zoom
      map.setZoom(zoom);

      // events exposed via the map instance are debounced
      cy.wait(500).then(() => {
        // check the event and property is updated
        assert.notEqual(event.zoom, MAP_ZOOM);
        assert.equal(event.zoom, expected);
        assert.equal(map.zoom, expected);
      });
    });

    it('should set viewport and trigger centre/zoom event', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(UK_LON, UK_LAT),
        new AlloyCoordinate(UK_LON + 2, UK_LAT + 2),
      );
      let centreEvent = new MapChangeCentreEvent(new AlloyCoordinate(0, 0), 0, [0, 0, 0, 0]);
      let zoomEvent = new MapChangeZoomEvent(0, 0);

      // listen to change event
      map.addMapChangeCentreListener((e) => {
        centreEvent = e;
      });
      map.addMapChangeZoomListener((e) => {
        zoomEvent = e;
      });

      // update the viewport
      map.setViewport(bounds);

      // events exposed via the map instance are debounced
      cy.wait(500).then(() => {
        // check the event and property is updated
        assert.isNotTrue(centreEvent.centre.equals(MAP_CENTRE));
        assert.isNotTrue(map.centre.equals(MAP_CENTRE));
        assert.notEqual(zoomEvent.zoom, MAP_ZOOM);
        assert.notEqual(map.zoom, MAP_ZOOM);
      });
    });
  });

  describe('basemaps', () => {
    it('should set skyward basemap', () => {
      // test data
      const basemap = AlloyBasemapFactory.createSkyward();

      // set a basemap
      map.setBasemap(basemap);

      // check the property is updated
      assert.equal(map.basemap, basemap);

      // screenshot the map for debugging
      cy.wait(500).screenshot({
        capture: 'runner',
      });
    });

    it('should set nightscape basemap', () => {
      // test data
      const basemap = AlloyBasemapFactory.createNightscape();

      // set a basemap
      map.setBasemap(basemap);

      // check the property is updated
      assert.equal(map.basemap, basemap);

      // screenshot the map for debugging
      cy.wait(500).screenshot({
        capture: 'runner',
      });
    });

    it('should set open streetmap basemap', () => {
      // test data
      const basemap = AlloyBasemapFactory.createOpenStreetmap();

      // set a basemap
      map.setBasemap(basemap);

      // check the property is updated
      assert.equal(map.basemap, basemap);

      // screenshot the map for debugging
      cy.wait(500).screenshot({
        capture: 'runner',
      });
    });

    it('should set ordnance survey basemap', () => {
      // test data
      const basemap = AlloyBasemapFactory.createOrdnanceSurvey();

      // set a basemap
      map.setBasemap(basemap);

      // check the property is updated
      assert.equal(map.basemap, basemap);

      // screenshot the map for debugging
      cy.wait(500).screenshot({
        capture: 'runner',
      });
    });

    it('should set satellite basemap', () => {
      // test data
      const basemap = AlloyBasemapFactory.createSatellite();

      // set a basemap
      map.setBasemap(basemap);

      // check the property is updated
      assert.equal(map.basemap, basemap);

      // screenshot the map for debugging
      cy.wait(500).screenshot({
        capture: 'runner',
      });
    });

    it('should change basemap', () => {
      // test data
      const basemap1 = AlloyBasemapFactory.createSkyward();
      const basemap2 = AlloyBasemapFactory.createNightscape();

      // set a basemap
      map.setBasemap(basemap1);

      // check the property is updated
      assert.equal(map.basemap, basemap1);

      // set the other basemap
      map.setBasemap(basemap2);

      // check the property is updated
      assert.equal(map.basemap, basemap2);

      // screenshot the map for debugging
      cy.wait(500).screenshot({
        capture: 'runner',
      });
    });
  });

  describe('layers', () => {
    it('should add cluster layer', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(UK_LON, UK_LAT),
        new AlloyCoordinate(UK_LON + 2, UK_LAT + 2),
      );
      const layerCode = 'myFakeLayer';
      const styles: AlloyClusterLayerStyle[] = [
        {
          colour: '#cc3300',
          icon: 'icon-stl',
          styleId: 'myFakeStyleId',
        },
      ];
      const layer = new AlloyClusterLayer({
        bounds,
        layerCode,
        map,
        styles,
      });

      // add the layer
      map.addLayer(layer);

      // check the property is updated
      assert.include(map.layers, layer);
    });

    it('should add network layer', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(UK_LON, UK_LAT),
        new AlloyCoordinate(UK_LON + 2, UK_LAT + 2),
      );
      const layerCode = 'myFakeLayer';
      const styles: AlloyNetworkLayerStyle[] = [
        {
          colour: '#cc3300',
          icon: 'icon-stl',
          styleId: 'myFakeStyleId',
        },
      ];
      const layer = new AlloyNetworkLayer({
        bounds,
        layerCode,
        map,
        styles,
      });

      // add the layer
      map.addLayer(layer);

      // check the property is updated
      assert.include(map.layers, layer);
    });

    it('should remove layer', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(UK_LON, UK_LAT),
        new AlloyCoordinate(UK_LON + 2, UK_LAT + 2),
      );
      const layerCode = 'myFakeLayer';
      const styles: AlloyClusterLayerStyle[] = [
        {
          colour: '#cc3300',
          icon: 'icon-stl',
          styleId: 'myFakeStyleId',
        },
      ];
      const layer = new AlloyClusterLayer({
        bounds,
        layerCode,
        map,
        styles,
      });

      // add the layer
      map.addLayer(layer);

      // check the property is updated
      assert.include(map.layers, layer);

      // remove the layer
      map.removeLayer(layer);

      // check the property is updated
      assert.notInclude(map.layers, layer);
    });
  });
});
