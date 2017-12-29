 var path = require('path')
 var webpack = require('webpack')
 module.exports = {
   entry: {
     homepage: './src/homepageScript.js',
     newspage: './src/newsArticleScript.js'

   },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist/')

   },

   stats: {
     colors: true
   },
   externals: [{
     xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
   }],
   devtool: 'source-map',
   node: {
     fs: 'empty'
   },
   plugins: [
     new webpack.IgnorePlugin(/solc/)
   ]
 }
