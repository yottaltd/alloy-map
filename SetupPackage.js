'use strict';
exports.__esModule = true;
const fs = require('fs');
// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the compiled js files in the
// root of the package.
// It will not be included in the npm package.
function main() {
  const source = fs.readFileSync(__dirname + '/package.json').toString('utf-8');
  const sourceObj = JSON.parse(source);
  sourceObj.scripts = {};
  sourceObj.devDependencies = {};
  fs.writeFileSync(
    __dirname + '/dist/package.json',
    Buffer.from(JSON.stringify(sourceObj, null, 2), 'utf-8'),
  );
}
main();
