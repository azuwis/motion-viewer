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
  productionSourceMap: false,
  pwa: {
    themeColor: '#424242',
    workboxOptions: {
      exclude: [
          /\.map$/,
          /img\/icons\//,
          /^js\/manifest.*\.js$/,
          /favicon\.ico$/,
          /manifest\.json$/
      ],
      importWorkboxFrom: 'local',
      clientsClaim: true,
      skipWaiting: true
    }
  }
}
