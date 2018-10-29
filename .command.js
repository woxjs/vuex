module.exports = (program, { tryCatch, exec, Addone }) => {
  program
    .command('store <files...>')
    .description('add a new store file for vuex')
    .action(files => tryCatch(async roll => await exec((cmd) => {
      const addone = new Addone(cmd, roll);
      let filePath = files.join('/');
      if (!/\.js$/.test(filePath)) filePath += '.js';
      const output = path.resolve(process.cwd(), 'app', 'webstore', filePath);
      await addone.render(
        path.resolve(__dirname, '.template.ejs'), 
        output, {
          name: addone.prefix(...files)
        }
      );
    
      cmd.complete({
        prefix: '[Make]',
        message: `OK, cache file is created at '${output}'.`,
        suffix: '(@wox/vuex)'
      });
    })));
}