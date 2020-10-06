import { ProjectionUtils } from '@/utils/ProjectionUtils';
import { assert } from 'chai';

describe(ProjectionUtils.name, () => {
  describe(ProjectionUtils.getProjectionOrThrow.name, () => {
    it('should get projection', () => {
      const code = 'EPSG:4326';
      const projection = ProjectionUtils.getProjectionOrThrow(code);

      assert.equal(projection.getCode(), code);
    });
    it('should throw an exception when trying to get not registered projection', () => {
      const code = 'EPSG:27700';
      assert.throws(() => ProjectionUtils.getProjectionOrThrow(code));
    });
  });
});
