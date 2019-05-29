import { AlloyMapError } from '../error/AlloyMapError';

/**
 * function to intercept service calls and check for common error codes
 * @param response the response to intercept
 * @ignore
 * @internal
 */
export function responseInterceptor(response: Response): PromiseLike<Response> {
  // Short circuit for statuses with no body
  if (response.status === 204) {
    return Promise.resolve({} as Response);
  }
  return response
    .json()
    .then((json) => {
      if (json) {
        // If it's an AlloyMapError throw an AlloyMapError, otherwise let it keep going, it'll fall
        // in the next if condition.
        const potentialAlloyError = AlloyMapError.parse(json);
        if (potentialAlloyError) {
          throw potentialAlloyError;
        }
      } else if (response.status < 200 || response.status >= 300) {
        throw new AlloyMapError(
          1549368024,
          `Unexpected status code for api call: ${response.status}`,
          {
            data: {
              statusCode: response.status,
              statusText: response.statusText,
            },
          },
        );
      }
      return json;
    })
    .catch((err) => {
      if (err instanceof AlloyMapError) {
        return Promise.reject(err);
      }
      return Promise.reject(
        new AlloyMapError(1549368181, 'Failed to parse json response', {
          data: {
            error: err.message,
          },
        }),
      );
    });
}
