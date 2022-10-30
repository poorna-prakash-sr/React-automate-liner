const fs = require('fs');
const chalk = require('chalk');
const shell = require('shelljs');
const _ = require('lodash');
const path = require('path');

const CreateConfig = (componentspath, s, ext, needtestfile) => {
  shell.mkdir('-p', componentspath);
  shell.cd(componentspath);
  const filename = _.startCase(s) + '.' + ext;
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
      if (needtestfile) {
        const filename = _.startCase(s) + '.test.js';
        fs.closeSync(fs.openSync(filename, 'w'));
        fs.readFile(
          path.join(__dirname, '../template/testconfig.txt'),
          'utf-8',
          function (err, data) {
            if (err) throw err;

            var newValue = data.replace(/<% name %>/g, _.startCase(s));
            fs.writeFile(filename, newValue, 'utf-8', function (err) {
              if (err) throw err;
              console.log(
                chalk.green('Created Test for ') + chalk.yellow(filename)
              );
            });
          }
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = CreateConfig;
