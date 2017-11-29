'use strict'
var Promise = require('promise')
var ipfsAPI = require('ipfs-api')
var HashTable = require('hashtable')
var bl = require('bl')
var uniqueFilename = require('unique-filename')

var fs = require('fs')
var storage = require('node-persist')
var blockchainAPI = require('./blockchainAPI.js')

var exports = module.exports = {}

var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

var claimsListPath = 'claims/'
var claimsListFileName = 'claimsList.json'

function storeItem (key, item) {
  return new Promise(function (fulfill, reject) {
    blockchainAPI.storeItem(key, item).then(function (value) {
      if (value) {
        fulfill([key, value])
      } else {
        fulfill(null)
      }
    })
  })
}

function getItemFromStorage (key) {
  return new Promise(function (fulfill, reject) {
    blockchainAPI.getItemFromStorage(key).then(function (value) {
      if (value) {
        fulfill(value)
      } else {
        fulfill(null)
      }
    })
  })
}

/*
function storeItem (key, item) {
  return new Promise(function (fulfill, reject) {
    storage.init().then(function () {
      storage.setItem(key, item).then(function (value) {
        if (value) {
          fulfill([key, value])
        } else {
          fulfill(null)
        }
      })
    })
  })
}

function getItemFromStorage (key) {
  return new Promise(function (fulfill, reject) {
    storage.init().then(function () {
      storage.getItem(key).then(function (value) {
        if (value) {
          fulfill(value)
        } else {
          fulfill(null)
        }
      })
    })
  })
}
*/
function updateRegistry (key, ipfsLink) {
  return new Promise(function (resolve, reject) {
    storeItem(key, ipfsLink).then(value => {
      resolve(value)
    })
  })
}

function getLinkFromRegistry (key) {
  return new Promise(function (resolve, reject) {
    try {
      getItemFromStorage(key).then(link => {
        if (link) {
          console.log('LINK: ' + JSON.stringify(link))
          resolve(link)
        } else {
          console.log('No Key')
          resolve(null)
        }
      })
    } catch (err) {
      console.log('Error getting key')
      resolve(null)
    }
  })
}

// // // //

exports.addItem = function (key, item) {
  console.log('Adding item')
  console.log('Key: ' + key + ' Item: ' + item.toString())
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
      if (claimsList) {
        console.log('----------')
        console.log('FILE Retrieved')
        console.log()
        console.log('----------')
        resolve([key, claimsList])
      } else {
        console.log('NO FILE')
        resolve(null)
      }
    })
  })
}

function storeClaimList (claimsList) {
  return new Promise(function (resolve, reject) {
    console.log('Storing claims list || Content: ' + JSON.stringify(claimsList[0]))

    var filename = uniqueFilename('', 'claim') + '.json'
    console.log(filename)
    fs.writeFile(claimsListPath + filename, JSON.stringify(claimsList), 'utf8', function (err) {
      if (err) {
        reject('error writing to file...')
      } else {
        console.log('New file generated: ' + claimsListPath + filename)
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
    try {
      ipfs.files.cat(multihash, function (err, file) {
        resolve(JSON.parse(file.toString('utf8')))
      })
    } catch (err) {
      console.log('Error getting file form IPFS')
      resolve(null)
    }
  })
}

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
