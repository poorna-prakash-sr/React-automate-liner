const chalk = require('chalk');
const prompt = require('prompt-sync')();
var shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const { isEmpty } = require('lodash');
let pkg = undefined;

if (fs.existsSync(shell.pwd().stdout + '/' + 'package.json')) {
  pkg = require(shell.pwd().stdout + '/' + 'package.json');
}

const prerequisite = () => {
  //to get node version
  const isnodeavailable = process.version;
  console.log('Node version: ' + chalk.yellowBright(isnodeavailable));
  //to check if react is available or not
  const isReact =
    typeof pkg === 'undefined' ? 'undefined' : pkg.dependencies.react;
  if (typeof isReact === 'undefined') {
    console.log(
      chalk.red(
        'Package.json was discovered in the current directory! \n The project is already running in the current directory.' +
          '\n' +
          chalk.green(
            'Create a new directory and create a new project or Install REACT in the current directory!'
          )
      )
    );
    //to install react
    const yesorno = prompt('[y/n]');
    if (yesorno === 'y' || yesorno === 'Y') {
      //whether to install react in default path or specific path
      const installpath = prompt('Install in current path? [y/n]');
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
            shell.mkdir('-p', userinput);
            shell.cd(userinput);
            const projectname = prompt('Project name :');
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
  const currentpath = shell.pwd().stdout;
  UserConfig = require(currentpath + '/customreact.config.json');
} catch (err) {}

const CheckConfig = () => {
  if (typeof UserConfig === 'undefined') {
    console.log(chalk.bgRedBright('There was no configuration file found!'));
    const yon = prompt('Install the config file[y/n] ');
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
