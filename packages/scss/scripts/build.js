const fs = require('fs');
const path = require('path');
const sass = require('sass');

const scssSourcePath = path.resolve(__dirname, '../src');
const normalizePath = path.resolve(__dirname, '..');

const globalScssFilePath = path.resolve(__dirname, '../src/global.scss');
const outputFilePath = path.resolve(__dirname, '../src/lib/global.css');

const componentTypes = ['atoms', 'molecules', 'organisms'];

const getAllComponents = () => {
  let allComponents = [];

  componentTypes.forEach((type) => {
    const components = fs
      .readdirSync(path.resolve(__dirname, `../src/${type}`))
      .map((component) => ({
        input: path.resolve(__dirname, `../src/${type}/${component}`),
        output: path.resolve(__dirname, `../src/lib/${type}/${component.replace('.scss', '.css')}`),
      }));

    allComponents = [...allComponents, ...components];
  });

  return allComponents;
};

const compiler = (input, output) => {
  const folder = output.split('/').slice(0, -1).join('/');
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const result = sass
    .compile(input, {
      // style: 'compressed',
      loadPaths: [scssSourcePath, normalizePath],
    })
    .css.toString();

  fs.writeFileSync(output, result);
};

compiler(globalScssFilePath, outputFilePath);

getAllComponents().forEach((component) => {
  compiler(component.input, component.output);
});
