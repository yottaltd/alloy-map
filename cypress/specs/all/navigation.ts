import { assert } from 'chai';
import { AlloyBounds } from '../../../src/map/core/AlloyBounds';
import { AlloyCoordinate } from '../../../src/map/core/AlloyCoordinate';
import { MapChangeCentreEvent } from '../../../src/map/events/MapChangeCentreEvent';
import { MapChangeZoomEvent } from '../../../src/map/events/MapChangeZoomEvent';
import MapData from '../MapData';

const jsonData = '@data';
const fixture = 'cypress/specs/all/_defaults.json';

let mapCentre: AlloyCoordinate;

export default function(mapData: MapData) {
  describe('navigation', () => {
    beforeEach(() => {
      cy.readFile(fixture).as(jsonData.substring(1));
      mapCentre = mapData.map.centre;
    });

    it('should set centre and trigger centre event', () => {
      cy.get(jsonData).then((data: any) => {
        // test data
        const coordinate = new AlloyCoordinate(data.ukLon - 1, data.ukLat + 1);
        const expected = new AlloyCoordinate(data.ukLon - 1, data.ukLat + 1);
        let event = new MapChangeCentreEvent(new AlloyCoordinate(0, 0), 0, [0, 0, 0, 0]);

        // listen to change event
        mapData.map.addMapChangeCentreListener((e) => {
          event = e;
        });

        // update the centre
        mapData.map.setCentre(coordinate);

        // events exposed via the map instance are debounced
        cy.wait(500).then(() => {
          // check the event and property is updated
          assert.isTrue(event.centre.equals(expected));
          assert.isTrue(mapData.map.centre.equals(expected));
        });
      });
    });

    it('should set zoom and trigger zoom event', () => {
      cy.get(jsonData).then((data: any) => {
        // test data
        const zoom = data.mapZoom + 2;
        const expected = data.mapZoom + 2;
        let event = new MapChangeZoomEvent(0, 0);

        // listen to change event
        mapData.map.addMapChangeZoomListener((e) => {
          event = e;
        });

        // update the zoom
        mapData.map.setZoom(zoom);
        // events exposed via the map instance are debounced
        cy.wait(500).then(() => {
          // check the event and property is updated
          assert.notEqual(event.zoom, data.mapZoom);
          assert.equal(event.zoom, expected);
          assert.equal(mapData.map.zoom, expected);
        });
      });
    });

    it('should set viewport and trigger centre/zoom event', () => {
      cy.get(jsonData).then((data: any) => {
        // test data
        const bounds = new AlloyBounds(
          new AlloyCoordinate(data.ukLon, data.ukLat),
          new AlloyCoordinate(data.ukLon + 2, data.ukLat + 2),
        );
        let centreEvent = new MapChangeCentreEvent(new AlloyCoordinate(0, 0), 0, [0, 0, 0, 0]);
        let zoomEvent = new MapChangeZoomEvent(0, 0);

        // listen to change event
        mapData.map.addMapChangeCentreListener((e) => {
          centreEvent = e;
        });
        mapData.map.addMapChangeZoomListener((e) => {
          zoomEvent = e;
        });

        // update the viewport
        mapData.map.setViewport(bounds);

        // events exposed via the map instance are debounced
        cy.wait(500).then(() => {
          // check the event and property is updated
          assert.isNotTrue(centreEvent.centre.equals(mapCentre));
          assert.isNotTrue(mapData.map.centre.equals(mapCentre));
          assert.notEqual(zoomEvent.zoom, data.mapZoom);
          assert.notEqual(mapData.map.zoom, data.mapZoom);
        });
      });
    });
  });
}
