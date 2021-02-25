import { assert } from 'chai';
import { AlloyBounds } from '@/map/core/AlloyBounds';
import { AlloyCoordinate } from '@/map/core/AlloyCoordinate';
import { MapChangeCentreEvent } from '@/map/events/MapChangeCentreEvent';
import { MapChangeZoomEvent } from '@/map/events/MapChangeZoomEvent';
import MapData from '../MapData';

let mapCentre: AlloyCoordinate;
let mapZoom: number;

export default function (mapData: MapData) {
  describe('navigation', () => {
    beforeEach(() => {
      mapCentre = mapData.map.centre;
      mapZoom = mapData.map.zoom;
    });

    it('should set centre and trigger centre event', () => {
      // test data
      const coordinate = new AlloyCoordinate(mapCentre.lon - 1, mapCentre.lat + 1);
      const expected = new AlloyCoordinate(mapCentre.lon - 1, mapCentre.lat + 1);
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

    it('should set zoom and trigger zoom event', () => {
      // test data
      const zoom = mapZoom + 2;
      const expected = mapZoom + 2;
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
        assert.notEqual(event.zoom, mapZoom);
        assert.equal(event.zoom, expected);
        assert.equal(mapData.map.zoom, expected);
      });
    });

    it('should set viewport and trigger centre/zoom event', () => {
      // test data
      const bounds = new AlloyBounds(
        new AlloyCoordinate(mapCentre.lon, mapCentre.lat),
        new AlloyCoordinate(mapCentre.lon + 2, mapCentre.lat + 2),
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
        assert.notEqual(zoomEvent.zoom, mapZoom);
        assert.notEqual(mapData.map.zoom, mapZoom);
      });
    });
  });
}
