const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const fse = require('fs-extra');
module.exports = async (ctx, file) => {
  const template = path.resolve(__dirname, '.template.ejs');
  const output = path.resolve(process.cwd(), 'app/vue/storage', file + '.js');
  const result = await render(ctx, template, output, {
    name: prefix(...file.split('/'))
  });
  if (result) {
    console.log('create file success:', output);
  } else {
    console.error('create file failed.');
  }
}

async function render(ctx, template, output, data = {}) {
  if (!fs.existsSync(template)) throw new Error('can not find template:' + template);
  const code = await new Promise((resolve, reject) => {
    ejs.renderFile(template, data, function(err, str){
      if (err) return reject(err);
      resolve(str);
    });
  });
  if (!fs.existsSync(output)) {
    fse.outputFileSync(output, code, 'utf8');
    ctx.catch(() => fs.unlinkSync(output));
    return true;
  }
}

function prefix(...names) {
  const name = names.join('_').replace(/\//g, '_').replace(/[_-][a-z0-9]/ig, s => s.substring(1).toUpperCase());
  let first = name.charAt(0);
  const next = name.substring(1);
  return first.toUpperCase() + next;
}