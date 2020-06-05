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
    // config.resolve.alias
    //   .set('categories', path.resolve('src/assets/img/photography'))
  },
  publicPath: '/'
}
