import { assert } from 'chai';
import OLMapBrowserPointerEvent from 'ol/MapBrowserPointerEvent';
import { AlloyCoordinate } from '../../../src/map/core/AlloyCoordinate';
import { AlloyFeature } from '../../../src/map/features/AlloyFeature';
import { AlloyCustomLayer } from '../../../src/map/layers/custom/AlloyCustomLayer';
import { AlloyStyleBuilderBuildState } from '../../../src/map/styles/AlloyStyleBuilderBuildState';
import MapData from '../MapData';

const jsonData = '@data';
const fixture = 'cypress/specs/all/_defaults.json';

const mapElementId = '#map';

let mapCentre: AlloyCoordinate;

export default function(mapData: MapData) {
  describe('features', () => {
    beforeEach(() => {
      cy.readFile(fixture).as(jsonData.substring(1));
      mapCentre = mapData.map.centre;
    });

    it('should add feature to map', () => {
      // Add layer
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'addFeature',
      });
      mapData.map.addLayer(layer);

      // Add custom feature at centre
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      // Wait for map to re-render
      cy.wait(100).then(() => {
        // Check that feature has been added to the centre of the map
        const featuresAtPixel = mapData.map.olMap.getFeaturesAtPixel(
          mapData.map.olMap.getPixelFromCoordinate(mapCentre.toMapCoordinate()),
        );
        cy.wrap(featuresAtPixel).should('have.length', 1);
        cy.wrap(featuresAtPixel![0]).should('equal', customFeature.olFeature);
      });
    });

    it('should remove feature from map', () => {
      // Add layer
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'removeFeature',
      });
      mapData.map.addLayer(layer);

      // Add custom feature at centre
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      let pixel: number[];
      // Wait for map to re-render
      cy.wait(100).then(() => {
        // Check that feature exists at the centre of the map and remove it
        pixel = mapData.map.olMap.getPixelFromCoordinate(mapCentre.toMapCoordinate());
        cy.wrap(mapData.map.olMap.hasFeatureAtPixel(pixel)).should('be.true');
        layer.removeFeature(customFeature);
      });
      // Wait for map to re-render
      cy.wait(100).then(() => {
        // Check that there is no feature at the centre of the map
        cy.wrap(mapData.map.olMap.hasFeatureAtPixel(pixel)).should('be.false');
      });
    });

    it('should select feature on map on click', () => {
      // Add layer
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'selectFeatureByClick',
      });
      mapData.map.addLayer(layer);

      // Add custom feature at centre
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      // Wait for map to re-render
      cy.wait(100).then(() => {
        // Click centre of the map
        const pixel = mapData.map.olMap.getPixelFromCoordinate(mapCentre.toMapCoordinate());
        mapClick(pixel[0], pixel[1]);
      });
      // Wait for map to re-render
      cy.wait(100).then(() => {
        // Check that feature has been selected
        cy.wrap(mapData.map.selectedFeatures.size).should('equal', 1);
        cy.wrap(mapData.map.selectedFeatures.has(customFeature.id)).should('be.true');
      });
    });

    it('should select feature on map programatically', () => {
      // Add layer
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'selectFeatureProgramatically',
      });
      mapData.map.addLayer(layer);

      // Add custom feature at centre
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      // Select feature
      mapData.map.setSelectedFeature(customFeature);

      // Check that feature has been selected
      cy.wrap(mapData.map.selectedFeatures.size).should('equal', 1);
      cy.wrap(mapData.map.selectedFeatures.has(customFeature.id)).should('be.true');
    });

    it('should remove selection from feature on map when clicking basemap', () => {
      // Add layer
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'removeFeatureSelectionByClick',
      });
      mapData.map.addLayer(layer);

      // Add custom feature at centre
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      // Select feature
      mapData.map.setSelectedFeature(customFeature);

      // Check that feature has been selected
      cy.wrap(mapData.map.selectedFeatures.size).should('equal', 1);
      cy.wrap(mapData.map.selectedFeatures.has(customFeature.id)).should('be.true');

      // Wait for map to re-render
      cy.wait(100).then(() => {
        // Click somewhere else on the map to deselect it
        const pixel = mapData.map.olMap.getPixelFromCoordinate(mapCentre.toMapCoordinate());
        mapClick(pixel[0] / 2, pixel[1] / 2);
        // Check that feature has been deselected
        cy.wrap(mapData.map.selectedFeatures).should('be.empty');
      });
    });

    it('should remove selection from feature on map programatically', () => {
      // Add layer
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'removeFeatureSelectionProgramatically',
      });
      mapData.map.addLayer(layer);

      // Add custom feature at centre
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      // Select feature
      mapData.map.setSelectedFeature(customFeature);
      // Check that feature has been selected
      cy.wrap(mapData.map.selectedFeatures.size).should('equal', 1);
      cy.wrap(mapData.map.selectedFeatures.has(customFeature.id)).should('be.true');
      // Deselect feature and check that there are no selected features
      mapData.map.deselectFeature(customFeature);
      cy.wrap(mapData.map.selectedFeatures).should('be.empty');
    });

    it('should select feature on top of other features on click', () => {
      // Add layer
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'selectTopOfStack',
      });
      mapData.map.addLayer(layer);

      // Add four features at centre
      layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      // Last added feature should be at top
      const topFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      let selectedFeatures: Map<string, AlloyFeature> | null = null;
      // Wait for map to re-render
      cy.wait(100).then(() => {
        // Add selection listener
        mapData.map.addFeatureSelectionChangeListener((event) => {
          selectedFeatures = event.features;
        });

        // Click centre of the map to select feature
        const pixel = mapData.map.olMap
          .getPixelFromCoordinate(mapCentre.toMapCoordinate())
          .map((p) => Math.round(p));
        mapClick(pixel[0], pixel[1]);
      });
      // Wait for map to re-render
      cy.wait(100).then(() => {
        if (!selectedFeatures) {
          assert.fail('stack features are null');
          return;
        }
        // Check that only one, top feature has been selected
        cy.wrap(selectedFeatures.size).should('equal', 1);
        cy.wrap(selectedFeatures.has(topFeature.id)).should('be.true');
      });
    });

    it('should suggest features underneath stack of features on click', () => {
      // Add layer
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'underneathStack',
      });
      mapData.map.addLayer(layer);

      // Add 3 features at centre
      const feature1 = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      const feature2 = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      // Last added feature should be on top
      const topFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      let stack: Map<string, AlloyFeature> | null = null;
      let selectedFeature: AlloyFeature | null = null;
      // Wait for map to re-render
      cy.wait(100).then(() => {
        // Add under selection listener
        mapData.map.addFeaturesUnderSelectionListener((event) => {
          stack = event.stack;
          selectedFeature = event.selectedFeature;
        });

        // Click centre of the map
        const pixel = mapData.map.olMap
          .getPixelFromCoordinate(mapCentre.toMapCoordinate())
          .map((p) => Math.round(p));
        mapClick(pixel[0], pixel[1]);
      });
      // Wait for map to re-render
      cy.wait(100).then(() => {
        // Check that top feature has been selected
        cy.wrap(selectedFeature).should('equal', topFeature);
        if (!stack) {
          assert.fail('stack features are null');
          return;
        }
        // Check that other features at same coordinates have been returned in under selection
        cy.wrap(stack.size).should('equal', 2);
        cy.wrap(stack.has(feature1.id)).should('be.true');
        cy.wrap(stack.has(feature2.id)).should('be.true');
      });
    });

    it('should multi select features on map on click', () => {
      cy.get(jsonData).then((data: any) => {
        const coordinate2 = new AlloyCoordinate(data.ukLon + 0.05, data.ukLat + 0.05);

        // Add layer
        const layer = new AlloyCustomLayer({
          map: mapData.map,
          id: 'multiSelectByClick',
        });
        mapData.map.addLayer(layer);

        // Add feature at centre
        const feature1 = layer.addPointFeature(
          {
            title: 'Title',
            subtitle: 'Subtitle',
            colour: '#115599',
            icon: 'icon-system-success',
          },
          mapCentre,
        );

        // Add another feature at secondary coordinates
        const feature2 = layer.addPointFeature(
          {
            title: 'Title',
            subtitle: 'Subtitle',
            colour: '#115599',
            icon: 'icon-system-success',
          },
          coordinate2,
        );

        // Wait for map to re-render
        cy.wait(100).then(() => {
          // Click centre of the map
          const pixel1 = mapData.map.olMap
            .getPixelFromCoordinate(mapCentre.toMapCoordinate())
            .map((p) => Math.round(p));
          mapClick(pixel1[0], pixel1[1]);

          // Shift+click map at the secondary coordinates
          const pixel2 = mapData.map.olMap
            .getPixelFromCoordinate(coordinate2.toMapCoordinate())
            .map((p) => Math.round(p));
          mapClick(pixel2[0], pixel2[1], true);
        });
        // Wait for map to re-render
        cy.wait(100).then(() => {
          // Check that both features have been selected
          cy.wrap(mapData.map.selectedFeatures.size).should('equal', 2);
          cy.wrap(mapData.map.selectedFeatures.has(feature1.id)).should('be.true');
          cy.wrap(mapData.map.selectedFeatures.has(feature2.id)).should('be.true');
        });
      });
    });

    it('should multi select features on map programatically', () => {
      cy.get(jsonData).then((data: any) => {
        const coordinate2 = new AlloyCoordinate(data.ukLon + 0.05, data.ukLat + 0.05);

        // Add layer
        const layer = new AlloyCustomLayer({
          map: mapData.map,
          id: 'multiSelectProgramatically',
        });
        mapData.map.addLayer(layer);

        // Add feature at centre
        const feature1 = layer.addPointFeature(
          {
            title: 'Title',
            subtitle: 'Subtitle',
            colour: '#115599',
            icon: 'icon-system-success',
          },
          mapCentre,
        );

        // Add another feature at secondary coordinates
        const feature2 = layer.addPointFeature(
          {
            title: 'Title',
            subtitle: 'Subtitle',
            colour: '#115599',
            icon: 'icon-system-success',
          },
          coordinate2,
        );

        // Select both features
        mapData.map.selectFeatures([feature1, feature2]);

        // Wait for map to re-render
        cy.wait(100).then(() => {
          // Check that both features have been selected
          cy.wrap(mapData.map.selectedFeatures.size).should('equal', 2);
          cy.wrap(mapData.map.selectedFeatures.has(feature1.id)).should('be.true');
          cy.wrap(mapData.map.selectedFeatures.has(feature2.id)).should('be.true');
        });
      });
    });

    it('should remove feature from multi select features on map on click', () => {
      cy.get(jsonData).then((data: any) => {
        const coordinate2 = new AlloyCoordinate(data.ukLon + 0.05, data.ukLat + 0.05);

        // Add layer
        const layer = new AlloyCustomLayer({
          map: mapData.map,
          id: 'multiSelectByClick',
        });
        mapData.map.addLayer(layer);

        // Add feature at centre
        const feature1 = layer.addPointFeature(
          {
            title: 'Title',
            subtitle: 'Subtitle',
            colour: '#115599',
            icon: 'icon-system-success',
          },
          mapCentre,
        );

        // Add another feature at secondary coordinates
        const feature2 = layer.addPointFeature(
          {
            title: 'Title',
            subtitle: 'Subtitle',
            colour: '#115599',
            icon: 'icon-system-success',
          },
          coordinate2,
        );

        // Select both features
        mapData.map.selectFeatures([feature1, feature2]);

        // Wait for map to re-render
        cy.wait(100).then(() => {
          // Shift+click map at the secondary coordinates
          const pixel = mapData.map.olMap
            .getPixelFromCoordinate(coordinate2.toMapCoordinate())
            .map((p) => Math.round(p));
          mapClick(pixel[0], pixel[1], true);
        });
        // Wait for map to re-render
        cy.wait(100).then(() => {
          // Check that second feature has been deselected
          cy.wrap(mapData.map.selectedFeatures.size).should('equal', 1);
          cy.wrap(mapData.map.selectedFeatures.has(feature1.id)).should('be.true');
        });
      });
    });

    it('should not select non-selectable feature', () => {
      // Add layer
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'notSelectable',
      });
      mapData.map.addLayer(layer);

      // Add non-selectable feature at centre
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
          allowsSelection: false,
        },
        mapCentre,
      );

      // Try selecting to check that feature selection throws as exception and it's not selected
      assert.throws(() => mapData.map.setSelectedFeature(customFeature));
      cy.wrap(mapData.map.selectedFeatures).should('be.empty');
    });

    it('should hover feature', () => {
      // Add layer
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'hover',
      });
      mapData.map.addLayer(layer);

      // Add custom feature at centre
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      // Wait for map to re-render
      cy.wait(100)
        .then(() => {
          // Move pointer to the centre of the map
          const pixel = mapData.map.olMap
            .getPixelFromCoordinate(mapCentre.toMapCoordinate())
            .map((p) => Math.round(p));
          return cy.get(mapElementId).trigger('pointermove', pixel[0], pixel[1]);
        })
        .then(() => {
          // Check that feature is hovered
          cy.wrap(mapData.map.hoverLayer.hoveredFeature).should('equal', customFeature);
        });
    });

    it('should not hover non-hoverable feature', () => {
      // Add layer
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'notHoverable',
      });
      mapData.map.addLayer(layer);

      // Add custom feature at centre
      layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
          allowsHover: false,
        },
        mapCentre,
      );

      // Wait for map to re-render
      cy.wait(100)
        .then(() => {
          // Move pointer to the centre of the map
          const pixel = mapData.map.olMap
            .getPixelFromCoordinate(mapCentre.toMapCoordinate())
            .map((p) => Math.round(p));
          return cy.get(mapElementId).trigger('pointermove', pixel[0], pixel[1]);
        })
        .then(() => {
          // Check that non-hoberable feature is not hovered
          cy.wrap(mapData.map.hoverLayer.hoveredFeature).should('equal', null);
        });
    });

    it('should run interaction processing on selected feature', () => {
      // Add layer
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'selectionCallback',
      });
      mapData.map.addLayer(layer);

      // Add custom feature at centre
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
        },
        mapCentre,
      );

      const selectedFeatures: AlloyFeature[] = [];
      // Add selection listener
      mapData.map.addFeatureSelectionChangeListener((event) => {
        selectedFeatures.push(...Array.from(event.features.values()));
      });
      // Select feature
      mapData.map.setSelectedFeature(customFeature);
      // Check that feature has been selected
      cy.wrap(selectedFeatures).should('have.length', 1);
      cy.wrap(selectedFeatures[0]).should('equal', customFeature);
    });

    it('should check custom feature styles with forced selection state', () => {
      const forceState = AlloyStyleBuilderBuildState.Selected;

      // Add layer
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'forcedStyle',
      });
      mapData.map.addLayer(layer);

      // Add custom feature at centre
      const customFeature = layer.addPointFeature(
        {
          title: 'Title',
          subtitle: 'Subtitle',
          colour: '#115599',
          icon: 'icon-system-success',
          forceState,
        },
        mapCentre,
      );

      // Check that feature force state is set
      cy.wrap(customFeature.properties.forceState).should('equal', forceState);
    });
  });

  // Custom method to dispatch map click event at given coordinates
  // Added since actual clicking on the map is not working due to dragging issue
  // So forcing drag to be `false` in the event
  function mapClick(x: number, y: number, isShiftKey?: boolean) {
    cy.get(mapElementId).then((el) => {
      cy.log('Map click', { x, y });
      const evt = new OLMapBrowserPointerEvent(
        'click',
        mapData.map.olMap,
        new PointerEvent('click', {
          clientX: x,
          clientY: y,
          relatedTarget: el[0],
          shiftKey: isShiftKey,
        }),
        false,
      );
      mapData.map.olMap.dispatchEvent(evt);
    });
  }
}
