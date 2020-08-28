import { MathUtils } from '@/utils/MathUtils';
import { assert } from 'chai';

describe(MathUtils.name, () => {
  describe(MathUtils.approximateEquals.name, () => {
    it('should check that numbers approximately equal', () => {
      const number1 = 0.1231235;
      const number2 = 0.1231236;
      const epsilon = 0.000001;

      const result = MathUtils.approximateEquals(number1, number2, epsilon);

      assert.isTrue(result);
    });
    it('should check that numbers do not approximately equal', () => {
      const number1 = 0.1231235;
      const number2 = 0.1231236;
      const epsilon = 0.0000001;

      const result = MathUtils.approximateEquals(number1, number2, epsilon);

      assert.isFalse(result);
    });
  });
});
