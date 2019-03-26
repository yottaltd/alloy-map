import { AlloyTileBasemap } from '../../src/models/basemaps/AlloyTileBasemap';
import { AlloyBounds } from '../../src/models/core/AlloyBounds';
import { AlloyCoordinate } from '../../src/models/core/AlloyCoordinate';
import { AlloyMap } from '../../src/models/core/AlloyMap';
import { MapChangeCentreEvent } from '../../src/models/events/MapChangeCentreEvent';
import { MapChangeZoomEvent } from '../../src/models/events/MapChangeZoomEvent';

describe('map', () => {
  const MAP_ZOOM = 5;
  const MAP_CENTRE = new AlloyCoordinate(0, 0);
  let map: AlloyMap;

  beforeEach(() => {
    cy.visit('/www/index.html');
    cy.get('#map').then((el) => {
      map = new AlloyMap({
        element: el[0],
        centre: MAP_CENTRE,
        zoom: MAP_ZOOM,
      });
    });
  });

  it('should set centre and trigger centre event', () => {
    // test data
    const coordinate = new AlloyCoordinate(4, 4);
    const expected = new AlloyCoordinate(4, 4);
    let event = new MapChangeCentreEvent(new AlloyCoordinate(0, 0));

    // listen to change event
    map.addMapChangeCentreListener((e) => {
      event = e;
    });

    // update the centre
    map.setCentre(coordinate);

    // check the event and property is updated
    assert.isTrue(event.centre.equals(expected));
    assert.isTrue(map.centre.equals(expected));
  });

  it('should set zoom and trigger zoom event', () => {
    // test data
    const zoom = 10;
    const expected = 10;
    let event = new MapChangeZoomEvent(0);

    // listen to change event
    map.addMapChangeZoomListener((e) => {
      event = e;
    });

    // update the zoom
    map.setZoom(zoom);

    // check the event and property is updated
    assert.notEqual(event.zoom, MAP_ZOOM);
    assert.equal(event.zoom, expected);
    assert.equal(map.zoom, expected);
  });

  it('should set viewport and trigger centre/zoom event', () => {
    // test data
    const bounds = new AlloyBounds(new AlloyCoordinate(4, 4), new AlloyCoordinate(5, 5));
    const expected = new AlloyCoordinate(4.5, 4.5); // centre of the above bounds
    let centreEvent = new MapChangeCentreEvent(new AlloyCoordinate(0, 0));
    let zoomEvent = new MapChangeZoomEvent(0);

    // listen to change event
    map.addMapChangeCentreListener((e) => {
      centreEvent = e;
    });
    map.addMapChangeZoomListener((e) => {
      zoomEvent = e;
    });

    // update the viewport
    map.setViewport(bounds);

    // check the event and property is updated
    assert.isTrue(centreEvent.centre.equals(expected));
    assert.isTrue(map.centre.equals(expected));
    assert.notEqual(zoomEvent.zoom, MAP_ZOOM);
    assert.notEqual(map.zoom, MAP_ZOOM);
  });

  it('should set basemap', () => {
    // test data
    const url = 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const basemap = new AlloyTileBasemap(url);

    // set a basemap
    map.setBasemap(basemap);

    // check the property is updated
    assert.equal(map.basemap, basemap);

    // screenshot the map for debugging
    cy.screenshot();
  });
});
