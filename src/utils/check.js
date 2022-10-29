const pkg = require('../../package.json');
const chalk = require('chalk');
const prompt = require('prompt-sync')();
var shell = require('shelljs');
const fs = require('fs');
const path = require('path');

const prerequisite = () => {
  //to get node version
  const isnodeavailable = process.version;
  console.log('Node version: ' + chalk.yellowBright(isnodeavailable));
  //to check if react is available or not
  const isReact = pkg.dependencies.react;
  if (typeof isReact === 'undefined') {
    console.log(
      chalk.red(
        'Sorry!, I Guess React is not available in this path' +
          '\n' +
          chalk.green('Dont worry i can react your react for you!')
      )
    );
    //to install react
    const yesorno = prompt('[y/n]');
    if (yesorno === 'y' || yesorno === 'Y') {
      //whether to install react in default path or specific path
      const installpath = prompt('Can i install here? [y/n]');
      if (installpath === 'y' || installpath === 'Y') {
        //react project namespace
        const projectname = prompt('Project name ');
        //command to install react project
        shell.exec('npx create-react-app ' + projectname);
        return;
      }
      //to install react on the specified path
      else if (installpath === 'n' || installpath === 'N') {
        //input for specific folder path
        const userinput = prompt(
          chalk.bgGreenBright('Please give a file path ')
        );
        try {
          //to create a directory path if not exists and create react project here
          const filepath = fs.statSync(userinput);
          if (filepath.isDirectory()) {
            shell.exec('mkdir -p ' + userinput);
            shell.cd(userinput);
            const projectname = prompt('Project name ');
            shell.exec('npx create-react-app ' + projectname);
            return;
          } else {
            console.log('Not a directory');
          }
        } catch (e) {
          console.log(chalk.bgRedBright('Not a valid path'));
        }
      }
      return;
    } else if (yesorno === 'n' || yesorno === 'N') {
      console.log(chalk.yellowBright("So it well it's time to say bye...."));
    }
    return;
  }
  return true;
};

let UserConfig = undefined;
try {
  UserConfig = require('../../customreact.config.json');
} catch (err) {}

const CheckConfig = () => {
  if (typeof UserConfig === 'undefined') {
    console.log(chalk.bgRedBright('Oh there is no config file here'));
    const yon = prompt('can i install the config file[y/n] ');
    if (yon === 'Y' || yon === 'y') {
      const filename = 'customreact.config.json';
      fs.closeSync(fs.openSync('customreact.config.json', 'w'));
      fs.readFile(
        path.join(__dirname, '../template/config.txt'),
        'utf-8',
        function (err, data) {
          if (err) throw err;

          fs.writeFile(filename, data, 'utf-8', function (err) {
            if (err) throw err;
            console.log(chalk.green('Created ') + chalk.yellow(filename));
          });
        }
      );
    }
  }
};

module.exports = {
  prerequisite,
  UserConfig,
  CheckConfig,
};
