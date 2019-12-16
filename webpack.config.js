// @ts-check
/** @typedef { import('webpack').Configuration } WebpackConfig */

const ManifestPlugin = require('webpack-manifest-plugin')

/** @type WebpackConfig */
const browser = {
  entry: {
    browser: './src/browser/main.tsx'
  },
  output: {
    path: `${__dirname}/dist/public`,
    filename: '[name].[contenthash].js'
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ]
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [ 'url-loader' ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },

  // allow react to be served separately, allowing page bundles to stay small
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM'
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'browser.manifest.json'
    })
  ]
}

const configs = [ browser ]

module.exports = configs
