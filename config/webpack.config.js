/* global module */
module.exports = {
 entry: './resources/js/app.js',
  output: {
    path: '/public/js',
    filename: 'app.js',
    publicPath: "/js/",
  },
  devtool: "#inline-source-map",
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
                presets: ['es2015']
              }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
         query: {
                    presets: ['es2015']
                }
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
};
