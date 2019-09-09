import { assert } from 'chai';
import { AlloyBasemapFactory } from '../../src/map/basemaps/AlloyBasemapFactory';
import { AlloyBounds } from '../../src/map/core/AlloyBounds';
import { AlloyCoordinate } from '../../src/map/core/AlloyCoordinate';
import { AlloyMap } from '../../src/map/core/AlloyMap';
import { LayersChangeEvent } from '../../src/map/events/LayersChangeEvent';
import { MapChangeCentreEvent } from '../../src/map/events/MapChangeCentreEvent';
import { MapChangeZoomEvent } from '../../src/map/events/MapChangeZoomEvent';
import { AlloyClusterLayer } from '../../src/map/layers/cluster/AlloyClusterLayer';
import { AlloyCustomLayer } from '../../src/map/layers/custom/AlloyCustomLayer';
import { AlloyNetworkLayer } from '../../src/map/layers/network/AlloyNetworkLayer';
import { AlloyLayerStyle } from '../../src/map/styles/AlloyLayerStyle';

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
        map,
        styles,
      });
      let event: LayersChangeEvent = new LayersChangeEvent(new Map());

      // listen to change event
      map.addLayersChangeListener((e) => {
        event = e;
      });

      // add the layer
      map.addLayer(layer);

      // check the property is updated
      assert.isTrue(map.layers.has(layer.id));
      assert.isTrue(event.layers.has(layer.id));
    });

    it('should add network layer', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(UK_LON, UK_LAT),
        new AlloyCoordinate(UK_LON + 2, UK_LAT + 2),
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
        map,
        styles,
      });
      let event: LayersChangeEvent = new LayersChangeEvent(new Map());

      // listen to change event
      map.addLayersChangeListener((e) => {
        event = e;
      });

      // add the layer
      map.addLayer(layer);

      // check the property is updated
      assert.isTrue(map.layers.has(layer.id));
      assert.isTrue(event.layers.has(layer.id));
    });

    it('should remove layer', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(UK_LON, UK_LAT),
        new AlloyCoordinate(UK_LON + 2, UK_LAT + 2),
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
        map,
        styles,
      });
      let event: LayersChangeEvent = new LayersChangeEvent(new Map());

      // listen to change event
      map.addLayersChangeListener((e) => {
        event = e;
      });

      // add the layer
      map.addLayer(layer);

      // check the property is updated
      assert.isTrue(map.layers.has(layer.id));
      assert.isTrue(event.layers.has(layer.id));

      // remove the layer
      map.removeLayer(layer);

      // check the property is updated
      assert.isFalse(map.layers.has(layer.id));
      assert.isFalse(event.layers.has(layer.id));
    });

    it('should not allow layer with same id to be added twice', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(UK_LON, UK_LAT),
        new AlloyCoordinate(UK_LON + 2, UK_LAT + 2),
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
        map,
        styles,
      });
      const layerWithSameCode = new AlloyClusterLayer({
        bounds,
        layerCode,
        map,
        styles,
      });

      // add the layer
      map.addLayer(layer);

      // check the property is updated
      assert.isTrue(map.layers.has(layer.id));

      // try to add a second layer
      assert.throws(() => map.addLayer(layerWithSameCode));
    });

    it('should not allow layer not in map to be removed', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(UK_LON, UK_LAT),
        new AlloyCoordinate(UK_LON + 2, UK_LAT + 2),
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
        map,
        styles,
      });
      const otherLayer = new AlloyClusterLayer({
        bounds,
        layerCode: layerCodeOther,
        map,
        styles,
      });

      // add the layer
      map.addLayer(layer);

      // check the property is updated
      assert.isTrue(map.layers.has(layer.id));

      assert.throws(() => map.removeLayer(otherLayer));
    });
  });

  describe('features', () => {
    it('should add feature to map', () => {});
    it('should remove feature from map', () => {});
    it('should select feature on map on click', () => {});
    it('should select feature on map programatically', () => {});
    it('should remove selection from feature on map on click', () => {});
    it('should remove selection from feature on map when clicking basemap', () => {});
    it('should remove selection from feature on map programatically', () => {});
    it('should select feature on top of other features on click', () => {});
    it('should suggest features underneath stack of features on click', () => {});
    it('should multi select features on map on click', () => {});
    it('should multi select features on map programatically', () => {});
    it('should not select non-selectable feature', () => {});
    it('should run interaction processing on selected feature', () => {});
    it('should check custom feature styles with forced selection state', () => {});
  });

  describe('search', () => {
    it('should find features within', () => {
      // Test data.
      const layer = new AlloyCustomLayer({
        map,
        id: 'featuresWithin',
      });
      const findWithinCoordinate1 = new AlloyCoordinate(-1.320698, 54.51974);
      const findWithinCoordinate2 = new AlloyCoordinate(-1.300971, 54.500017);
      const delta: number = 30;

      // Add features to the layer.
      const featureWithinCoordinate1 = layer.addPointFeature(
        {
          title: 'First Point',
          subtitle: 'Feature Within',
          colour: '#FF0000',
          icon: 'icon-system-success',
        },
        new AlloyCoordinate(-1.3207, 54.5198),
      );
      const featureWithinCoordinate2 = layer.addPointFeature(
        {
          title: 'Second Point',
          subtitle: 'Feature Within',
          colour: '#FFA500',
          icon: 'icon-system-404',
        },
        new AlloyCoordinate(-1.30098, 54.500025),
      );

      // Add layer to the map.
      map.addLayer(layer);

      // Assert the first coordinate is within the first feature, with that delta.
      const featuresWithinFirstFeature = map.findFeaturesWithin(findWithinCoordinate1, delta);
      assert.exists(
        featuresWithinFirstFeature.find(
          (featureResult) => featureResult.feature.id === featureWithinCoordinate1.id,
        ),
      );

      // Assert the second coordinate is within the second feature, with that delta.
      const featuresWithinSecondFeature = map.findFeaturesWithin(findWithinCoordinate2, delta);
      assert.exists(
        featuresWithinSecondFeature.find(
          (featureResult) => featureResult.feature.id === featureWithinCoordinate2.id,
        ),
      );
    });
    it('should not find features within', () => {
      // Test data.
      const layer = new AlloyCustomLayer({
        map,
        id: 'featuresWithin',
      });
      const coordinateNotWithin = new AlloyCoordinate(-1.320698, 54.51974);
      const delta: number = 30;

      // Add features to the layer.
      layer.addPointFeature(
        {
          title: 'First Point',
          subtitle: 'Feature Within',
          colour: '#FF0000',
          icon: 'icon-system-success',
        },
        new AlloyCoordinate(-1.4, 54.6),
      );

      // Add layer to the map.
      map.addLayer(layer);

      // Assert the first coordinate is within the first feature, with that delta.
      assert.isEmpty(map.findFeaturesWithin(coordinateNotWithin, delta));
    });
  });
});
