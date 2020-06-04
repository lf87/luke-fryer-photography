module.exports = {
  css: {
    sourceMap: true
  },
  chainWebpack: config => {
    config.module
      .rule('importGlobLoader')
      .test(/\.scss$/)
      .use('import-glob-loader')
      .loader('import-glob-loader')
  },
  publicPath: '/'
}
