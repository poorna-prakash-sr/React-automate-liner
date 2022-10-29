const fs = require('fs');
const chalk = require('chalk');
const shell = require('shelljs');
const _ = require('lodash');
const path = require('path');

const CreateConfig = (componentspath, s) => {
  console.log(chalk.green('Created a Folder structure'));
  shell.exec('mkdir -p ' + componentspath);
  shell.cd(componentspath);
  const filename = _.startCase(s) + '.js';
  try {
    {
      fs.closeSync(fs.openSync(filename, 'w'));
      fs.readFile(
        path.join(__dirname, '../template/component.template.txt'),
        'utf-8',
        function (err, data) {
          if (err) throw err;

          var newValue = data.replace(/<% name %>/g, _.startCase(s));
          fs.writeFile(filename, newValue, 'utf-8', function (err) {
            if (err) throw err;
            console.log(chalk.green('Created ') + chalk.yellow(filename));
          });
        }
      );
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = CreateConfig;
