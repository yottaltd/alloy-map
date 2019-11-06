import { assert } from 'chai';
import OLMapBrowserPointerEvent from 'ol/MapBrowserPointerEvent';
import { AlloyBasemapFactory } from '../../src/map/basemaps/AlloyBasemapFactory';
import { AlloyBounds } from '../../src/map/core/AlloyBounds';
import { AlloyCoordinate } from '../../src/map/core/AlloyCoordinate';
import { AlloyMap } from '../../src/map/core/AlloyMap';
import { LayersChangeEvent } from '../../src/map/events/LayersChangeEvent';
import { MapChangeCentreEvent } from '../../src/map/events/MapChangeCentreEvent';
import { MapChangeZoomEvent } from '../../src/map/events/MapChangeZoomEvent';
import { AlloyFeature } from '../../src/map/features/AlloyFeature';
import { AlloyClusterLayer } from '../../src/map/layers/cluster/AlloyClusterLayer';
import { AlloyCustomLayer } from '../../src/map/layers/custom/AlloyCustomLayer';
import { AlloyNetworkLayer } from '../../src/map/layers/network/AlloyNetworkLayer';
import { AlloyLayerStyle } from '../../src/map/styles/AlloyLayerStyle';
import { AlloyStyleBuilderBuildState } from '../../src/map/styles/AlloyStyleBuilderBuildState';

const mapElementId = '#map';

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

    cy.get(mapElementId).then((el) => {
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

    it('should set xyz basemap', () => {
      // test data
      const basemap = AlloyBasemapFactory.createXyz({
        url: 'https://example.com/{x}/{y}/{z}',
        watermark:
          '<div class="find-me" style="position: fixed; right: 0; bottom: 0;">Find Me</div>',
      });

      // set a basemap
      map.setBasemap(basemap);

      // check the property is updated
      assert.equal(map.basemap, basemap);

      // check watermark was added to screen
      cy.get('.find-me').should('be.visible');

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
      let event: LayersChangeEvent = new LayersChangeEvent(new Map(), new Map());

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
      let event: LayersChangeEvent = new LayersChangeEvent(new Map(), new Map());

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
      let event: LayersChangeEvent = new LayersChangeEvent(new Map(), new Map());

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
    it('should add feature to map', () => {
      const layer = new AlloyCustomLayer({
        map,
        id: 'addFeature',
      });
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );
      map.addLayer(layer);

      cy.wait(100).then(() => {
        const featuresAtPixel = map.olMap.getFeaturesAtPixel(
          map.olMap.getPixelFromCoordinate(MAP_CENTRE.toMapCoordinate()),
        );
        cy.wrap(featuresAtPixel).should('have.length', 1);
        cy.wrap(featuresAtPixel![0]).should('equal', customFeature.olFeature);
      });
    });
    it('should remove feature from map', () => {
      const layer = new AlloyCustomLayer({
        map,
        id: 'removeFeature',
      });
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );
      map.addLayer(layer);

      cy.wait(100).then(() => {
        const pixel = map.olMap.getPixelFromCoordinate(MAP_CENTRE.toMapCoordinate());
        cy.wrap(map.olMap.hasFeatureAtPixel(pixel)).should('be.true');
        layer.removeFeature(customFeature);
        cy.wait(100).then(() => {
          cy.wrap(map.olMap.hasFeatureAtPixel(pixel)).should('be.false');
        });
      });
    });
    it('should select feature on map on click', () => {
      const customLayer = new AlloyCustomLayer({
        map,
        id: 'selectFeatureByClick',
      });
      map.addLayer(customLayer);

      const customFeature = customLayer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );

      cy.wait(100).then(() => {
        const pixel = map.olMap.getPixelFromCoordinate(MAP_CENTRE.toMapCoordinate());
        mapClick(pixel[0], pixel[1]);
        cy.wait(100).then(() => {
          cy.wrap(map.selectedFeatures.size).should('equal', 1);
          cy.wrap(map.selectedFeatures.has(customFeature.id)).should('be.true');
        });
      });
    });
    it('should select feature on map programatically', () => {
      const layer = new AlloyCustomLayer({
        map,
        id: 'selectFeatureProgramatically',
      });
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );
      map.addLayer(layer);

      map.setSelectedFeature(customFeature);
      cy.wrap(map.selectedFeatures.size).should('equal', 1);
      cy.wrap(map.selectedFeatures.has(customFeature.id)).should('be.true');
    });
    it('should remove selection from feature on map when clicking basemap', () => {
      const layer = new AlloyCustomLayer({
        map,
        id: 'removeFeatureSelectionByClick',
      });
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );
      map.addLayer(layer);

      map.setSelectedFeature(customFeature);
      cy.wrap(map.selectedFeatures.size).should('equal', 1);
      cy.wrap(map.selectedFeatures.has(customFeature.id)).should('be.true');
      cy.wait(100).then(() => {
        const pixel = map.olMap.getPixelFromCoordinate(MAP_CENTRE.toMapCoordinate());
        mapClick(pixel[0] / 2, pixel[1] / 2);
        cy.wrap(map.selectedFeatures).should('be.empty');
      });
    });
    it('should remove selection from feature on map programatically', () => {
      const layer = new AlloyCustomLayer({
        map,
        id: 'removeFeatureSelectionProgramatically',
      });
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );
      map.addLayer(layer);

      map.setSelectedFeature(customFeature);
      cy.wrap(map.selectedFeatures.size).should('equal', 1);
      cy.wrap(map.selectedFeatures.has(customFeature.id)).should('be.true');
      map.deselectFeature(customFeature);
      cy.wrap(map.selectedFeatures).should('be.empty');
    });
    it('should select feature on top of other features on click', () => {
      const customLayer = new AlloyCustomLayer({
        map,
        id: 'selectTopOfStack',
      });
      map.addLayer(customLayer);

      customLayer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );

      customLayer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );

      customLayer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );

      const topFeature = customLayer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );

      cy.wait(100).then(() => {
        let selectedFeatures: Map<string, AlloyFeature> | null = null;
        map.addFeatureSelectionChangeListener((event) => {
          selectedFeatures = event.features;
        });

        const pixel = map.olMap
          .getPixelFromCoordinate(MAP_CENTRE.toMapCoordinate())
          .map((p) => Math.round(p));
        mapClick(pixel[0], pixel[1]);

        cy.wait(100).then(() => {
          if (!selectedFeatures) {
            assert.fail('stack features are null');
            return;
          }
          cy.wrap(selectedFeatures.size).should('equal', 1);
          cy.wrap(selectedFeatures.has(topFeature.id)).should('be.true');
        });
      });
    });
    it('should suggest features underneath stack of features on click', () => {
      const customLayer = new AlloyCustomLayer({
        map,
        id: 'underneathStack',
      });
      map.addLayer(customLayer);

      const feature1 = customLayer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );

      const feature2 = customLayer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );

      const topFeature = customLayer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );

      cy.wait(100).then(() => {
        let stack: Map<string, AlloyFeature> | null = null;
        let selectedFeature: AlloyFeature | null = null;
        map.addFeaturesUnderSelectionListener((event) => {
          stack = event.stack;
          selectedFeature = event.selectedFeature;
        });

        const pixel = map.olMap
          .getPixelFromCoordinate(MAP_CENTRE.toMapCoordinate())
          .map((p) => Math.round(p));
        mapClick(pixel[0], pixel[1]);

        cy.wait(100).then(() => {
          cy.wrap(selectedFeature).should('equal', topFeature);
          if (!stack) {
            assert.fail('stack features are null');
            return;
          }
          cy.wrap(stack.size).should('equal', 2);
          cy.wrap(stack.has(feature1.id)).should('be.true');
          cy.wrap(stack.has(feature2.id)).should('be.true');
        });
      });
    });
    it('should multi select features on map on click', () => {
      const coordinate2 = new AlloyCoordinate(UK_LON + 0.05, UK_LAT + 0.05);

      const layer = new AlloyCustomLayer({
        map,
        id: 'multiSelectByClick',
      });
      map.addLayer(layer);

      const feature1 = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );

      const feature2 = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        coordinate2,
      );

      cy.wait(100).then(() => {
        const pixel1 = map.olMap
          .getPixelFromCoordinate(MAP_CENTRE.toMapCoordinate())
          .map((p) => Math.round(p));
        mapClick(pixel1[0], pixel1[1]);

        const pixel2 = map.olMap
          .getPixelFromCoordinate(coordinate2.toMapCoordinate())
          .map((p) => Math.round(p));
        mapClick(pixel2[0], pixel2[1], true);

        cy.wait(100).then(() => {
          cy.wrap(map.selectedFeatures.size).should('equal', 2);
          cy.wrap(map.selectedFeatures.has(feature1.id)).should('be.true');
          cy.wrap(map.selectedFeatures.has(feature2.id)).should('be.true');
        });
      });
    });
    it('should multi select features on map programatically', () => {
      const coordinate2 = new AlloyCoordinate(UK_LON + 0.05, UK_LAT + 0.05);

      const layer = new AlloyCustomLayer({
        map,
        id: 'multiSelectProgramatically',
      });
      const feature1 = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );

      const feature2 = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        coordinate2,
      );
      map.addLayer(layer);
      map.selectFeatures([feature1, feature2]);

      cy.wait(100).then(() => {
        cy.wrap(map.selectedFeatures.size).should('equal', 2);
        cy.wrap(map.selectedFeatures.has(feature1.id)).should('be.true');
        cy.wrap(map.selectedFeatures.has(feature2.id)).should('be.true');
      });
    });
    it('should remove feature from multi select features on map on click', () => {
      const coordinate2 = new AlloyCoordinate(UK_LON + 0.05, UK_LAT + 0.05);

      const layer = new AlloyCustomLayer({
        map,
        id: 'multiSelectByClick',
      });
      map.addLayer(layer);

      const feature1 = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );

      const feature2 = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        coordinate2,
      );

      map.selectFeatures([feature1, feature2]);

      cy.wait(100).then(() => {
        const pixel = map.olMap
          .getPixelFromCoordinate(coordinate2.toMapCoordinate())
          .map((p) => Math.round(p));
        mapClick(pixel[0], pixel[1], true);

        cy.wait(100).then(() => {
          cy.wrap(map.selectedFeatures.size).should('equal', 1);
          cy.wrap(map.selectedFeatures.has(feature1.id)).should('be.true');
        });
      });
    });
    it('should not select non-selectable feature', () => {
      const layer = new AlloyCustomLayer({
        map,
        id: 'notSelectable',
      });
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
          allowsSelection: false,
        },
        MAP_CENTRE,
      );
      map.addLayer(layer);
      try {
        map.setSelectedFeature(customFeature);
      } catch (e) {
        cy.wrap(map.selectedFeatures).should('be.empty');
      }
    });
    it('should hover feature', () => {
      const layer = new AlloyCustomLayer({
        map,
        id: 'hover',
      });
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );
      map.addLayer(layer);

      const pixel = map.olMap
        .getPixelFromCoordinate(MAP_CENTRE.toMapCoordinate())
        .map((p) => Math.round(p));
      cy.get(mapElementId)
        .trigger('pointermove', pixel[0], pixel[1])
        .then(() => {
          cy.wrap(map.hoverLayer.hoveredFeature).should('equal', customFeature);
        });
    });
    it('should not hover non-hoverable feature', () => {
      const layer = new AlloyCustomLayer({
        map,
        id: 'notHoverable',
      });
      layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
          allowsHover: false,
        },
        MAP_CENTRE,
      );
      map.addLayer(layer);

      const pixel = map.olMap
        .getPixelFromCoordinate(MAP_CENTRE.toMapCoordinate())
        .map((p) => Math.round(p));
      cy.get(mapElementId)
        .trigger('pointermove', pixel[0], pixel[1])
        .then(() => {
          cy.wrap(map.hoverLayer.hoveredFeature).should('equal', null);
        });
    });
    it('should run interaction processing on selected feature', () => {
      const layer = new AlloyCustomLayer({
        map,
        id: 'selectionCallback',
      });
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        MAP_CENTRE,
      );
      map.addLayer(layer);
      const selectedFeatures: AlloyFeature[] = [];
      map.addFeatureSelectionChangeListener((event) => {
        selectedFeatures.push(...Array.from(event.features.values()));
      });
      map.setSelectedFeature(customFeature);
      cy.wrap(selectedFeatures).should('have.length', 1);
      cy.wrap(selectedFeatures[0]).should('equal', customFeature);
    });
    it('should check custom feature styles with forced selection state', () => {
      const forceState = AlloyStyleBuilderBuildState.Selected;

      const layer = new AlloyCustomLayer({
        map,
        id: 'forcedStyle',
      });
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
          forceState,
        },
        MAP_CENTRE,
      );
      map.addLayer(layer);

      cy.wrap(customFeature.properties.forceState).should('equal', forceState);
    });
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

  function mapClick(x: number, y: number, isShiftKey?: boolean) {
    cy.get(mapElementId).then((el) => {
      cy.log('Map click', { x, y });
      const evt = new OLMapBrowserPointerEvent(
        'click',
        map.olMap,
        new PointerEvent('click', {
          clientX: x,
          clientY: y,
          relatedTarget: el[0],
          shiftKey: isShiftKey,
        }),
        false,
      );
      map.olMap.dispatchEvent(evt);
    });
  }
});
