//small info about the CLI
const infoCli = (program) => {
  program
    .name('React Component Generator')
    .description('Create a React Component Generator')
    .version('1.0.1-alpha');
};

module.exports = {
  infoCli,
};
