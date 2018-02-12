module.exports = {
  chainWebpack: webpackConfig => {
    if (process.env.NODE_ENV === 'production') {
      webpackConfig
        .plugin('html')
        .tap(([options]) => [Object.assign(options, {
          minify: Object.assign(options.minify, {
            preserveLineBreaks: true
          })
        })])
    }
  },
  devServer: {
    host: 'localhost'
  },
  lintOnSave: true,
  productionSourceMap: false,
  pwa: {
    workboxOptions: {
      importWorkboxFrom: 'local',
      clientsClaim: true,
      skipWaiting: true
    }
  }
}
