module.exports = {
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
