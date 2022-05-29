const presets = [
  ['@babel/preset-env', { // какой пресет использовать
    targets: { // какие версии браузеров поддерживать
      edge: '17',
      ie: '11',
      firefox: '50',
      chrome: '64',
      safari: '11.1'
    },

    // использовать полифиллы для браузеров из свойства target
    // по умолчанию babel использует поллифиллы библиотеки core-js
    useBuiltIns: "entry"
  }]
];

const plugins = [
  ['@babel/transform-runtime', {'regenerator':true}]
];

module.exports = { presets };
module.exports = { plugins };




