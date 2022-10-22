const _ = require('lodash');
const UserConfig = require('../../../customreact.config.json');

const createcomponet = (program) => {
  const createComponets = program
    .command('component')
    .description('It will generate a React Component')
    .argument('<string>')
    .alias('comp')
    .action((s) => {
      console.log([s]);
    });
};

module.exports = {
  createcomponet,
};
