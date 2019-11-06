import { AlloyMap } from '../../src/map/core/AlloyMap';
import { AlloyCoordinate } from '../../src/map/core/AlloyCoordinate';

const fixture = 'cypress/specs/all/_defaults.json';

export default class MapData {
  private mapObject: AlloyMap | undefined;

  public get map(): AlloyMap {
    if (!this.mapObject) {
      throw new Error('failed to get map object');
    }
    return this.mapObject;
  }

  public setup() {
    cy.readFile(fixture).then((data: any) => {
      cy.get('#map').then((el) => {
        this.mapObject = new AlloyMap({
          api: data.apiUrl,
          token: data.apiToken,
          element: el[0],
          centre: new AlloyCoordinate(data.ukLon, data.ukLat),
          zoom: data.mapZoom,
        });
      });
    });
  }
}
