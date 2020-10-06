import { NumberFormatUtils } from '@/utils/NumberFormatUtils';
import { assert } from 'chai';

describe(NumberFormatUtils.name, () => {
  describe(NumberFormatUtils.smallFormatNumber.name, () => {
    it('should not format a small number', () => {
      const number = 333;

      const result = NumberFormatUtils.smallFormatNumber(number);

      assert.equal(result, number.toString());
    });
    it('should format a number in thousands', () => {
      const number = 1_555;
      const expected = '1.6k';

      const result = NumberFormatUtils.smallFormatNumber(number);

      assert.equal(result, expected);
    });
    it('should format a number in hundreds of thousands', () => {
      const number = 123_555;
      const expected = '124k';

      const result = NumberFormatUtils.smallFormatNumber(number);

      assert.equal(result, expected);
    });
    it('should format a number in millions', () => {
      const number = 1_555_353;
      const expected = '1.6m';

      const result = NumberFormatUtils.smallFormatNumber(number);

      assert.equal(result, expected);
    });
    it('should format a number in tens of millions', () => {
      const number = 12_312_555;
      const expected = '12m';

      const result = NumberFormatUtils.smallFormatNumber(number);

      assert.equal(result, expected);
    });
    it('should format a number in hundreds of millions', () => {
      const number = 123_456_555;
      const expected = '100m+';

      const result = NumberFormatUtils.smallFormatNumber(number);

      assert.equal(result, expected);
    });
  });
});
