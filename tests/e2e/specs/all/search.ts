import { assert } from 'chai';
import { AlloyCoordinate } from '@/map/core/AlloyCoordinate';
import { AlloyCustomLayer } from '@/map/layers/custom/AlloyCustomLayer';
import MapData from '../MapData';

export default function(mapData: MapData) {
  describe('search', () => {
    it('should find features within', () => {
      // Test data.
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'featuresWithin',
      });
      const findWithinCoordinate1 = new AlloyCoordinate(-1.320698, 54.51974);
      const findWithinCoordinate2 = new AlloyCoordinate(-1.300971, 54.500017);
      const delta = 30;

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
      mapData.map.addLayer(layer);

      // Assert the first coordinate is within the first feature, with that delta.
      const featuresWithinFirstFeature = mapData.map.findFeaturesWithin(
        findWithinCoordinate1,
        delta,
      );
      assert.exists(
        featuresWithinFirstFeature.find(
          (featureResult) => featureResult.feature.id === featureWithinCoordinate1.id,
        ),
      );

      // Assert the second coordinate is within the second feature, with that delta.
      const featuresWithinSecondFeature = mapData.map.findFeaturesWithin(
        findWithinCoordinate2,
        delta,
      );
      assert.exists(
        featuresWithinSecondFeature.find(
          (featureResult) => featureResult.feature.id === featureWithinCoordinate2.id,
        ),
      );
    });
    it('should not find features within', () => {
      // Test data.
      const layer = new AlloyCustomLayer({
        map: mapData.map,
        id: 'featuresWithin',
      });
      const coordinateNotWithin = new AlloyCoordinate(-1.320698, 54.51974);
      const delta = 30;

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
      mapData.map.addLayer(layer);

      // Assert the first coordinate is within the first feature, with that delta.
      assert.isEmpty(mapData.map.findFeaturesWithin(coordinateNotWithin, delta));
    });
  });
}
