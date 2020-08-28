import { StringUtils } from '@/utils/StringUtils';
import { assert } from 'chai';

describe(StringUtils.name, () => {
  describe(StringUtils.cacheKeyConcat.name, () => {
    it('should concat key from inputs of string and number types', () => {
      const inputs = ['a', 'b', 321, 67, 'abyrvalg'];
      const expected = 'a:b:321:67:abyrvalg';

      const key = StringUtils.cacheKeyConcat(...inputs);

      assert.equal(key, expected);
    });
  });
});
