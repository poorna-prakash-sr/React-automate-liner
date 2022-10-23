const _ = require('lodash');
const shell = require('shelljs');
var fs = require('fs');
var beautify = require('js-beautify').js;
const UserConfig = require('../../../customreact.config.json');
const componenttemplate = require('../../template/component.template');

const createcomponet = (program) => {
  const createComponets = program
    .command('component')
    .description('It will generate a React Component')
    .argument('<string>')
    .alias('comp')
    .action((s) => {
      const componentspath = UserConfig.FolderStructure.ComponentFolder;
      if (
        typeof UserConfig !== 'undefined' &&
        typeof componentspath !== 'undefined'
      ) {
        shell.exec('mkdir -p ' + componentspath);
        shell.cd(componentspath);
        shell.exec('pwd');
        const filename = _.startCase(s) + '.js';

        fs.readFile(filename, 'utf8', function (err, data) {
          if (err) {
            throw err;
          }
          const a = beautify(data, {
            indent_size: 2,
            space_in_empty_paren: true,
          });
          var writeStream = fs.createWriteStream(filename);
          writeStream.write(a);
          writeStream.end();
        });
      }
    });
};

module.exports = {
  createcomponet,
};
