const _ = require('lodash');
const shell = require('shelljs');
var fs = require('fs');
var beautify = require('js-beautify').js;
const path = require('path');
const chalk = require('chalk');
const { UserConfig } = require('../utils/check');

const createafolder = (filename, confirm = true) => {
  console.log(path.join(__dirname, '../../' + filename));
  if (confirm) {
    if (!fs.existsSync(path.join(__dirname, '../../' + filename)) && confirm) {
      fs.mkdirSync(path.join(__dirname, '../../' + filename));

      return console.log(
        chalk.green('Created a ') +
          chalk.yellow(filename) +
          chalk.green(' Folder')
      );
    } else {
      return console.log(
        chalk.red('Already Created a ') +
          chalk.yellow(filename) +
          chalk.green(' Folder')
      );
    }
  }
};

const init = (program) => {
  const init = program
    .command('init')
    .description('Init will create a project structure for you')
    .action(() => {
      const foldername = UserConfig.FolderStructure;
      createafolder(foldername.MainFolder);
      createafolder(foldername.ComponentFolder);
      createafolder(foldername.AssetsFolder);
      createafolder(foldername.RouteFolder);
      createafolder(foldername.LayoutFolder);
      createafolder(
        foldername.ServicesFolder.path,
        foldername.ServicesFolder.default === 'undefined'
          ? false
          : foldername.ServicesFolder.default
      );
      createafolder(
        foldername.PagesFolder.path,
        foldername.PagesFolder.default === 'undefined'
          ? false
          : foldername.PagesFolder.default
      );
      createafolder(
        foldername.ConfigFolder.path,
        foldername.ConfigFolder.default === 'undefined'
          ? false
          : foldername.ConfigFolder.default
      );
    });
};

module.exports = {
  init,
};
