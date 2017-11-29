const path = require('path')

module.exports = {
  entry: {
  	homepage: './src/homepageScript.js',
  	newspage: './src/newsArticleScript.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/js_hypercerts')

  }
}
