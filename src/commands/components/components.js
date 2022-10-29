const _ = require('lodash');
const shell = require('shelljs');
var fs = require('fs');
var beautify = require('js-beautify').js;
const path = require('path');
const chalk = require('chalk');
const { UserConfig } = require('../../utils/check');
const { CheckConfig } = require('../../utils/check');
const CreateConfig = require('../../utils/createconfig');
const { isEmpty, lowerCase } = require('lodash');
const CreateWrap = require('../../utils/createwrap');

const createcomponet = (program) => {
  const createComponets = program
    .command('component')
    .description('It will generate a React Component in component file')
    .argument('<string>')
    .alias('comp')
    .alias('c')
    .option('-c', 'Create a Component inside a component folder')
    .option('-l', 'Create a Component inside a LayoutFolder')
    .option('-r', 'Create a Component inside a RouteFolder')
    .option('-w', 'Create a <String> Folder Wrap with file and css')
    .option('-t', 'Create a test file for your component')
    .action((string, options) => {
      if (typeof UserConfig !== 'undefined') {
        shell.exec('pwd');
        let componentspath = UserConfig.FolderStructure.ComponentFolder;
        if (options.l) {
          componentspath = UserConfig.FolderStructure.LayoutFolder;
        }
        if (options.r) {
          componentspath = UserConfig.FolderStructure.RouteFolder;
        }
        const ext =
          typeof UserConfig.React.extension === 'undefined'
            ? 'jsx'
            : UserConfig.React.extension;
        if (options.w && options.t) {
          const needtest = options.t ? true : UserConfig.NeedTestComponent;
          CreateWrap(componentspath, string, ext, options.w, needtest);
          return;
        }
        if (lowerCase(ext) === 'jsx' || lowerCase(ext) === 'js') {
          const needtest = options.t ? true : UserConfig.NeedTestComponent;
          CreateConfig(componentspath, string, ext, needtest);
        } else {
          console.log(
            chalk.red(
              'Your using illegal extension please make it correct you can only able to use JS or JSX to create a file in the react'
            )
          );
        }
      }
    });
};

module.exports = {
  createcomponet,
};
