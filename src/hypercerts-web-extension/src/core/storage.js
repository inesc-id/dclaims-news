'use strict'
var exports = module.exports = {}
var Promise = require('promise')
var Buffer = require('buffer/').Buffer
var blockchainAPI = require('./ethereumAPI.js')
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')

exports.addItem = function (key, item) {
  console.log('Adding item')
  console.log('Key: ' + key + ' Item: ' + item.toString())
  return new Promise(function (resolve, reject) {
    addProofsListToIPFS(Buffer.from(JSON.stringify(item))).then(value => {
      storeItem(key, value).then(value2 => {
        resolve([key, item])
      })
    })
  })
}

exports.getItem = function (key) {
  return new Promise(function (resolve, reject) {
    getLinkFromRegistry(key).then(getFileFromIPFS).then(claimsList => {
      if (claimsList) {
        resolve([key, claimsList])
      } else {
        console.log('NO FILE')
        resolve(null)
      }
    })
  })
}

function storeItem (key, item) {
  return new Promise(function (resolve, reject) {
    blockchainAPI.storeItem(key, item).then(function (value) {
      if (value) {
        resolve([key, value])
      } else {
        resolve(null)
      }
    })
  })
}

function getItemFromStorage (key) {
  return new Promise(function (resolve, reject) {
    blockchainAPI.getItemFromStorage(key).then(function (value) {
      if (value) {
        resolve(value)
      } else {
        resolve(null)
      }
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

function addProofsListToIPFS (claimsArrayBuffer) {
  return new Promise(function (resolve, reject) {
    ipfs.files.add([claimsArrayBuffer], function (err, result) {
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
        if (err) {
          console.log('Error connecting to IPFS. Check daemon is running')
          resolve(null)
        }
        try {
          var result = JSON.parse(file.toString('utf8'))
          resolve(result)
        } catch (err) {
          console.log('Error parsing JSON from a claim.')
          resolve(null)
        }
      })
    } catch (err) {
      console.log('File does not exist on IFPS')
      resolve(null)
    }
  })
}
