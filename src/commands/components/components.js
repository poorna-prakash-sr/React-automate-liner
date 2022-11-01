const _ = require('lodash');
const shell = require('shelljs');
var fs = require('fs');
var beautify = require('js-beautify').js;
const path = require('path');
const chalk = require('chalk');
const { UserConfig } = require('../../utils/check_configfile');
const { CheckConfig } = require('../../utils/check_configfile');
const CreateConfig = require('../../utils/create_component_utlil');
const { isEmpty, lowerCase } = require('lodash');
const CreateWrap = require('../../utils/create_wrapcomponent_util');

// function to create a component
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
        let componentspath = UserConfig.FolderStructure.ComponentFolder;
        if (typeof componentspath === 'undefined') {
          console.log('Folder Stucture was not found or something went wrong');
          console.log('Please reinstall the Config File');
          return;
        }
        //option check according to input parameters
        if (options.l) {
          componentspath = UserConfig.FolderStructure.LayoutFolder;
        }
        if (options.r) {
          componentspath = UserConfig.FolderStructure.RouteFolder;
        }
        //extension check according to the userinput
        const ext =
          typeof UserConfig.React.extension === 'undefined'
            ? 'jsx'
            : UserConfig.React.extension;
        //option to make a wrapcomponent
        if (options.w) {
          const needtest = options.t ? true : UserConfig.NeedTestComponent;
          CreateWrap(componentspath, string, ext, options.w, needtest);
          return;
        }
        if (lowerCase(ext) === 'jsx' || lowerCase(ext) === 'js') {
          const needtest = options.t ? true : UserConfig.NeedTestComponent;
          CreateConfig(componentspath, string, ext, needtest);
        } else {
          //warings message for using illegal extension
          console.log(
            chalk.red(
              'Your using illegal extension please make it as correct you can only able to use JS or JSX to create a file in the react'
            )
          );
        }
      } else {
        CheckConfig();
      }
    });
};

module.exports = {
  createcomponet,
};
