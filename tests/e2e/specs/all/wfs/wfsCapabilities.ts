import { WfsUtils } from '@/wfs/WfsUtils';
import MapData from '../../MapData';

const wfsNoPrefixCapabilities = 'tests/e2e/specs/all/wfs/blaby_gov_uk_WFS_GetCapabilities.xml';
const wfsNoPrefixCapabilitiesParsed =
  'tests/e2e/specs/all/wfs/blaby_gov_uk_WFS_GetCapabilitiesParsed.json';

const wfsRootPrefixCapabilities = 'tests/e2e/specs/all/wfs/gov_wales_WFS_GetCapabilities.xml';
const wfsRootPrefixCapabilitiesParsed =
  'tests/e2e/specs/all/wfs/gov_wales_WFS_GetCapabilitiesParsed.json';

const wfsFeaturesPrefixCapabilities =
  'tests/e2e/specs/all/wfs/bristol_gov_uk_WFS_GetCapabilities.xml';
const wfsFeaturesPrefixCapabilitiesParsed =
  'tests/e2e/specs/all/wfs/bristol_gov_uk_WFS_GetCapabilitiesParsed.json';

export default function (mapData: MapData) {
  describe('wfs capabilities parsing', () => {
    it('should parse capabilities without prefix', () => {
      // root and nodes without prefixes
      cy.readFile(wfsNoPrefixCapabilitiesParsed).then((savedCaps) => {
        cy.readFile(wfsNoPrefixCapabilities).then(async (caps) => {
          const parsedCaps = await WfsUtils.parseCapabilities(caps.url, caps);
          assert.deepEqual(jsonify(parsedCaps), jsonify(savedCaps));
        });
      });
    });
    it('should parse capabilities with wfs: prefix on the root node', () => {
      // root is with prefix - wfs:WFS_Capabilities
      cy.readFile(wfsRootPrefixCapabilitiesParsed).then((savedCaps) => {
        cy.readFile(wfsRootPrefixCapabilities).then(async (caps) => {
          const parsedCaps = await WfsUtils.parseCapabilities(caps.url, caps);
          assert.deepEqual(jsonify(parsedCaps), jsonify(savedCaps));
        });
      });
    });
    it('should parse capabilities with wfs: prefix on feature nodes', () => {
      // nodes with wfs: prefix - FeatureTypeList, FeatureType, Name, Title, DefaultCRS
      cy.readFile(wfsFeaturesPrefixCapabilitiesParsed).then((savedCaps) => {
        cy.readFile(wfsFeaturesPrefixCapabilities).then(async (caps) => {
          const parsedCaps = await WfsUtils.parseCapabilities(caps.url, caps);
          assert.deepEqual(jsonify(parsedCaps), jsonify(savedCaps));
        });
      });
    });
  });
}

function jsonify(input: any) {
  return JSON.parse(JSON.stringify(input));
}
