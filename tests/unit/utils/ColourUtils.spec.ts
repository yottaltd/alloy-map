import { Colour, ColourUtils } from '@/utils/ColourUtils';
import { assert } from 'chai';

describe(ColourUtils.name, () => {
  describe(ColourUtils.darkenBorder.name, () => {
    it('should darken border colour', () => {
      const colour: Colour = '#32167a';
      const expectedColour: Colour = '#2E1470';
      const darkenBorderColour = ColourUtils.darkenBorder(colour);

      assert.equal(darkenBorderColour, expectedColour);
    });
  });
  it(ColourUtils.darkenLabel.name, () => {
    it('should darken label colour', () => {
      const colour: Colour = '#32167a';
      const expectedColour: Colour = '#2A1266';
      const darkenLabelColour = ColourUtils.darkenLabel(colour);

      assert.equal(darkenLabelColour, expectedColour);
    });
  });
  it(ColourUtils.lightenBackground.name, () => {
    it('should lighten background colour', () => {
      const colour: Colour = '#32167a';
      const expectedColour: Colour = '#3A1A8E';
      const lightenBackgroundColour = ColourUtils.lightenBackground(colour);

      assert.equal(lightenBackgroundColour, expectedColour);
    });
  });
  it(ColourUtils.lightenHalo.name, () => {
    it('should lighten halo colour', () => {
      const colour: Colour = '#32167a';
      const expectedColour: Colour = [58, 26, 142, 0.5];
      const lightenHaloColour = ColourUtils.lightenHalo(colour);

      assert.deepEqual(lightenHaloColour, expectedColour);
    });
  });
  it(ColourUtils.opacity.name, () => {
    it('should add opacity to colour', () => {
      const colour: Colour = '#32167a';
      const opacity = 0.5;
      const expectedColour: Colour = [50, 22, 122, opacity];
      const opacityColour = ColourUtils.opacity(colour, opacity);

      assert.deepEqual(opacityColour, expectedColour);
    });
  });
  it(ColourUtils.semiTransparent.name, () => {
    it('should make colour semi-transparent', () => {
      const colour: Colour = '#32167a';
      const expectedColour: Colour = [50, 22, 122, 0.33];
      const semiTransparentColour = ColourUtils.semiTransparent(colour);

      assert.deepEqual(semiTransparentColour, expectedColour);
    });
  });
  describe(ColourUtils.toString.name, () => {
    it('should return the same string for string Colour', () => {
      const colour: Colour = '#32167a';
      const toStringColour: string = ColourUtils.toString(colour);

      assert.equal(colour, toStringColour);
    });
    it('should convert nuber array Colour to string', () => {
      const colour: Colour = [120, 153, 345, 0.3];
      const expectedColour = `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, ${colour[3]});`;
      const toStringColour: string = ColourUtils.toString(colour);

      assert.equal(toStringColour, expectedColour);
    });
  });
});
