import { assert } from 'chai';
import { AlloyBasemapFactory } from '../../../src/map/basemaps/AlloyBasemapFactory';
import MapData from '../MapData';

export default function(mapData: MapData) {
  describe('basemaps', () => {
    it('should set skyward basemap', () => {
      // test data
      const basemap = AlloyBasemapFactory.createSkyward();

      // set a basemap
      mapData.map.setBasemap(basemap);

      // check the property is updated
      assert.equal(mapData.map.basemap, basemap);

      // screenshot the map for debugging
      cy.wait(500).screenshot({
        capture: 'runner',
      });
    });

    it('should set nightscape basemap', () => {
      // test data
      const basemap = AlloyBasemapFactory.createNightscape();

      // set a basemap
      mapData.map.setBasemap(basemap);

      // check the property is updated
      assert.equal(mapData.map.basemap, basemap);

      // screenshot the map for debugging
      cy.wait(500).screenshot({
        capture: 'runner',
      });
    });

    it('should set open streetmap basemap', () => {
      // test data
      const basemap = AlloyBasemapFactory.createOpenStreetmap();

      // set a basemap
      mapData.map.setBasemap(basemap);

      // check the property is updated
      assert.equal(mapData.map.basemap, basemap);

      // screenshot the map for debugging
      cy.wait(500).screenshot({
        capture: 'runner',
      });
    });

    it('should set satellite basemap', () => {
      // test data
      const basemap = AlloyBasemapFactory.createSatellite();

      // set a basemap
      mapData.map.setBasemap(basemap);

      // check the property is updated
      assert.equal(mapData.map.basemap, basemap);

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
      mapData.map.setBasemap(basemap);

      // check the property is updated
      assert.equal(mapData.map.basemap, basemap);

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
      mapData.map.setBasemap(basemap1);

      // check the property is updated
      assert.equal(mapData.map.basemap, basemap1);

      // set the other basemap
      mapData.map.setBasemap(basemap2);

      // check the property is updated
      assert.equal(mapData.map.basemap, basemap2);

      // screenshot the map for debugging
      cy.wait(500).screenshot({
        capture: 'runner',
      });
    });

    it('should take a screenshot', async () => {
      const basemap = AlloyBasemapFactory.createSkyward();
      mapData.map.setBasemap(basemap);

      const screenshot = await mapData.map.screenshot();
      assert.exists(screenshot);
    });
  });
}
