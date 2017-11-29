'use strict'

var ipfsAPI = require('ipfs-api')
var fs = require('fs')

var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})





var storeClaimList(claimsList){

}




var appRouter = function (app) {
  app.get('/hello', function (req, res) {
  	

    res.send('yey')
  })
}

module.exports = appRouter






