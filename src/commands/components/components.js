const _ = require('lodash');
const shell = require('shelljs');
var fs = require('fs');
var beautify = require('js-beautify').js;
const path = require('path');
const chalk = require('chalk');
const { UserConfig } = require('../../utils/check');
const { CheckConfig } = require('../../utils/check');
const CreateConfig = require('../../utils/createconfig');

const createcomponet = (program) => {
  const createComponets = program
    .command('component')
    .description('It will generate a React Component')
    .argument('<string>')
    .alias('comp')
    .alias('c')
    .action((string) => {
      if (typeof UserConfig !== 'undefined') {
        const componentspath = UserConfig.FolderStructure.ComponentFolder;
        CreateConfig(componentspath, string);
      } else {
        CheckConfig();
      }
    });
};

module.exports = {
  createcomponet,
};
