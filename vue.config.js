module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: {
            loader: 'html-loader'
          }
        }
      ]
    }
  },
  chainWebpack: config => {
    config
      .module
      .rule('svg')
      .test(() => false)
      .use('file-loader')
      .end()
  }
}
