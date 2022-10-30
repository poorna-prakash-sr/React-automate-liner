const { Command } = require('commander');
const program = new Command();
const _ = require('lodash');
const cli = require('./commands/info/infocli');
const checker = require('./utils/check_configfile');
const component = require('./commands/components/components');
const init = require('./commands/folder_init');

//To check react is available
// const toCheckReact = checker.prerequisite();
const toCheckReact = true;

if (toCheckReact) {
  //Information about in the CLI
  cli.infoCli(program);

  //To Create a Component in the React Folder
  component.createcomponet(program);
  init.init(program);
}

program.parse(process.argv);
