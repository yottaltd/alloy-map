import { AlloyMap } from '../../src/models/core/AlloyMap';
import { AlloyMapFactory } from '../../src/factories/AlloyMapFactory';
import { AlloyCoordinate } from '../../src/models/core/AlloyCoordinate';
import { AlloyBounds } from '../../src/models/core/AlloyBounds';
import { MapChangeCentreEvent } from '../../src/models/events/MapChangeCentreEvent';
import { MapChangeZoomEvent } from '../../src/models/events/MapChangeZoomEvent';

describe('map', () => {
  let map: AlloyMap;

  beforeEach(() => {
    cy.visit('/www/index.html');
    cy.get('#map').then((el) => {
      map = AlloyMapFactory.create({
        element: el[0],
      });
    });
  });

  it('should set centre', () => {
    let event: MapChangeCentreEvent;
    map.addMapChangeCentreListener((e) => {
      event = e;
    });
    map.setCentre(new AlloyCoordinate(4, 4));
    cy.wait(100).then(() => {
      // check the event and property is updated
      const expected = new AlloyCoordinate(4, 4);
      assert.isTrue(event.centre.equals(expected));
      assert.isTrue(map.centre.equals(expected));
    });
  });

  it('should set zoom', () => {
    let event: MapChangeZoomEvent;
    map.addMapChangeZoomListener((e) => {
      event = e;
    });
    map.setZoom(10);
    cy.wait(100).then(() => {
      // check the event and property is updated
      const expected = 9;
      assert.equal(event.zoom, expected);
      assert.equal(map.zoom, expected);
    });
  });

  it('should set viewport', () => {
    map.setViewport(new AlloyBounds(new AlloyCoordinate(4, 4), new AlloyCoordinate(5, 5)));
  });

  it('should set basemap', () => {
    map.setBasemap({});
  });
});
