import basemaps from './all/basemaps';
import features from './all/features';
import layers from './all/layers';
import navigation from './all/navigation';
import search from './all/search';
import MapData from './MapData';

context('tests', () => {
  const mapData: MapData = new MapData();

  beforeEach(() => {
    cy.visit('/www/index.html');
    mapData.setup();
  });

  basemaps(mapData);
  features(mapData);
  layers(mapData);
  navigation(mapData);
  search(mapData);
});
