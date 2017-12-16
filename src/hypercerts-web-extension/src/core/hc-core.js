var ipfsStorage = require('./ipfsstorage.js')

var exports = module.exports

exports.handleVerification = function (nkey, newClaim) {
  return new Promise(function (fulfill, reject) {
    var newClaimArray = []
    newClaimArray.push(newClaim)

    ipfsStorage.getItem(nkey).then(value => {
      var newClaimsList
      if (value) {
        console.log('Appending...')
        newClaimsList = value[1].concat(newClaimArray)
      } else {
        console.log('Creating new list')
        newClaimsList = newClaimArray
      }
      return ipfsStorage.addItem(nkey, newClaimsList)
    }).then(value => {
      console.log('Sucess \n' + value)
      fulfill('Sucess :)')
    })
  })
}

exports.getClaimsJSONByUrl = function (url) {
  return new Promise(function (fulfill, reject) {
    ipfsStorage.getItem(url).then(value => {
      var claimsJSON = {}
      claimsJSON.claimsList = value
      fulfill(claimsJSON)
    })
  })
}

exports.getClaimsCountsJSONByUrl = function (url) {
  return new Promise(function (fulfill, reject) {
    ipfsStorage.getItem(url).then(values => {
      if (values) {
        fulfill(values[1].length)
                // fulfill("3")
      } else {
        fulfill('0')
      }
    })
  })
}
