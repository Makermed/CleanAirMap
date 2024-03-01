module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    ignore: [
      '**/node_modules/maplibre-gl/dist/maplibre-gl.js',
      '**/node_modules/maplibre-gl/dist/maplibre-gl.js.map',
      './node_modules/maplibre-gl/dist/maplibre-gl.js',
      './node_modules/maplibre-gl/**/*',
    ],
  };
};
