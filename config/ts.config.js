/**
 * @name ts.config
 * @author Lester
 * @date 2022-01-12 18:49
 */
// eslint-disable-next-line no-undef
const cmd = require('node-cmd');
const del = require('del');
del('lib');
cmd.run('npx tsc');
