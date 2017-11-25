'use strict'
var Promise = require('promise')
var ipfsAPI = require('ipfs-api')
var HashTable = require('hashtable')
var bl = require('bl')
var uniqueFilename = require('unique-filename')
var ipfsRegistry = new HashTable()
var fs = require('fs')

var exports = module.exports = {}

var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

var claimsListPath = 'claims/'
var claimsListFileName = 'claimsList.json'

function updateRegistry (key, ipfsLink) {
  return new Promise(function (resolve, reject) {
    ipfsRegistry.put(key, ipfsLink)
    resolve(ipfsRegistry.get(key))
  })
}

function getLinkFromRegistry (key) {
  return new Promise(function (resolve, reject) {
    resolve(ipfsRegistry.get(key))
  })
}

// // // //

exports.addItem = function (key, item) {
  return new Promise(function (resolve, reject) {
    storeClaimList(item).then(addProofsListToIPFS).then(value => {
    	updateRegistry(key, value).then(value2 => {
    		resolve([key, item])
    	})
    })
  })
}

exports.getItem = function (key) {
  return new Promise(function (resolve, reject) {
  	getLinkFromRegistry(key).then(getFileFromIPFS).then(claimsList => {
  		resolve([key, claimsList])
  	})
  })
}

function storeClaimList (claimsList) {
  return new Promise(function (resolve, reject) {
  	filename = uniqueFilename('', 'claim') + '.json'
    fs.writeFile(claimsListPath + filename, JSON.stringify(claimsList), 'utf8', function (err) {
      if (err) {
        reject('error writing to file...')
      } else {
      	console.log('New file generated: ' + claimsListPath + claimsListFileName)
        resolve([claimsListPath, filename])
      }
    })
  })
}

function addProofsListToIPFS (claimsArray) {
  return new Promise(function (resolve, reject) {
    ipfs.files.add([
      {
        path: claimsListFileName,
        content: fs.createReadStream(claimsArray[0] + claimsArray[1])
      }
    ], function (err, result) {
      if (err) {
        reject('something went wrong adding the file')
      } else {
        console.log('added_to_ipfs')
        resolve(result[0].hash)
      }
    })
  })
}

function getFileFromIPFS (multihash) {
  return new Promise(function (resolve, reject) {
    ipfs.files.cat(multihash, function (err, file) {
      resolve(file.toString('utf8'))
    })
  })
}

function printRegistry () {
  console.log('Array: ')
  var keys = ipfsRegistry.keys()
  for (let i = 0; i < keys.length; i++) {
  	console.log('Key: ' + keys[i] + 'Value: ' + ipfsRegistry.get(keys[i]))
  }
  console.log('Ciao...')
}

var filename = uniqueFilename('', 'claim') + '.json'

console.log(filename)

/*
addItem('jn1', array1).then(console.log).then(value => {
  getItem('jn1').then(console.log)
})
*/
/*
storeClaimList(array1).then(value=>{
	addProofsListToIPFS('jn1').then(console.log).then(value => {
  getItem('jn1').then(console.log)
})
}

.catch((err) => {
  console.log('ERROOOOR')
  console.log(err)
})
*/
