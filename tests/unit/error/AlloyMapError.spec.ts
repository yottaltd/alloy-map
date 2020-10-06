import { AlloyMapError } from '@/error/AlloyMapError';
import { assert } from 'chai';

describe(AlloyMapError.name, () => {
  describe(AlloyMapError.name, () => {
    it('should initialise with string code and message', () => {
      const code = 'error_code';
      const message = 'error_message';
      const error = new AlloyMapError(code, message);

      assert.equal(error.code, code);
      assert.equal(error.message, errorMessage(code, message));
      assert.isUndefined(error.httpStatusCode);
      assert.isUndefined(error.category);
      assert.isUndefined(error.data);
    });
    it('should initialise with numberic code and message', () => {
      const code = 32167;
      const message = 'error_message';
      const error = new AlloyMapError(code, message);

      assert.equal(error.code, `E${code}`);
      assert.equal(error.message, errorMessage(code, message));
      assert.isUndefined(error.httpStatusCode);
      assert.isUndefined(error.category);
      assert.isUndefined(error.data);
    });
    it('should initialise with http status code', () => {
      const code = 'error_code';
      const message = 'error_message';
      const httpStatusCode = 401;

      const error = new AlloyMapError(code, message, { httpStatusCode });

      assert.equal(error.code, code);
      assert.equal(error.message, errorMessage(code, message));
      assert.equal(error.httpStatusCode, httpStatusCode);
      assert.isUndefined(error.category);
      assert.isUndefined(error.data);
    });
    it('should initialise with category', () => {
      const code = 'error_code';
      const message = 'error_message';
      const category = 'some_error_category';

      const error = new AlloyMapError(code, message, { category });

      assert.equal(error.code, code);
      assert.equal(error.message, errorMessage(code, message));
      assert.isUndefined(error.httpStatusCode);
      assert.equal(error.category, category);
      assert.isUndefined(error.data);
    });
    it('should initialise with category', () => {
      const code = 'error_code';
      const message = 'error_message';
      const data = {
        a: 'A',
        b: 'B',
      };

      const error = new AlloyMapError(code, message, { data });

      assert.equal(error.code, code);
      assert.equal(error.message, errorMessage(code, message));
      assert.isUndefined(error.httpStatusCode);
      assert.isUndefined(error.category);
      assert.deepEqual(error.data, data);
    });
  });
  describe(AlloyMapError.parse.name, () => {
    it('should parse AlloyMapError', () => {
      const code = 'error_code';
      const message = 'error_message';
      const error = new AlloyMapError(code, message);

      const parsedError = AlloyMapError.parse(error);

      // should be the same object so not checking with deepEqual
      assert.equal(error, parsedError);
    });
    it('should parse Error object when all required properties are present', () => {
      const errorCode = 32167;
      const error = {
        errorCode: `E${errorCode}`,
        message: 'error_message',
        category: 'error_category',
        httpStatusCode: 401,
        errorData: { something: 'dark_side' },
      };

      const parsedError = AlloyMapError.parse(error);
      assert.isDefined(parsedError);

      assert.equal(parsedError?.code, error.errorCode);
      assert.equal(parsedError?.message, errorMessage(errorCode, error.message));
      assert.equal(parsedError?.category, error.category);
      assert.equal(parsedError?.httpStatusCode, error.httpStatusCode);
      assert.deepEqual(parsedError?.data, error.errorData);
    });
    it('should not parse Error when not all required properties are present', () => {
      const error = {
        errorCode: 'E32167',
        message: 'error_message',
      };

      const parsedError = AlloyMapError.parse(error);
      assert.isUndefined(parsedError);
    });
  });

  function errorMessage(code: string | number, message: string): string {
    return `E${code} - ${message}`;
  }
});
