module.exports = (program, client) => {
  program
    .command('wox:store <file>')
    .description('add a new store file for vuex')
    .action(client.require('./addfile.js'));
}
module.exports.__IS_CLI_PLUGIN__ = true;