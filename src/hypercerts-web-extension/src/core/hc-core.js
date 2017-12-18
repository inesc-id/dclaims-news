var Storage = require('./storage.js')

var exports = module.exports
/*
exports.handleVerification = function (nkey, newClaim) {
  return new Promise(function (fulfill, reject) {
    var newClaimArray = []
    newClaimArray.push(newClaim)

    Storage.getItem(nkey).then(value => {
      var newClaimsList
      if (value) {
        console.log('Appending...')
        newClaimsList = value[1].concat(newClaimArray)
      } else {
        console.log('Creating new list')
        newClaimsList = newClaimArray
      }
      return Storage.addItem(nkey, newClaimsList)
    }).then(value => {
      console.log('Sucess \n' + value)
      fulfill('Sucess :)')
    })
  })
} */

exports.handleVerification = function (nkey, newClaim) {
  return new Promise(function (resolve, reject) {
    Storage.addItem(nkey, newClaim).then(resolve)
  })
}

/*
exports.getClaimsJSONByUrl = function (url) {
  return new Promise(function (fulfill, reject) {
    Storage.getItem(url).then(value => {
      var claimsJSON = {}
      claimsJSON.claimsList = value
      fulfill(claimsJSON)
    })
  })
}
*/
exports.getClaimsJSONByUrl = function (url) {
  return new Promise(function (fulfill, reject) {
    Storage.getClaimsListFromIpfs(url).then(value => {
      var claimsJSON = {}
      claimsJSON.claimsList = value
      fulfill(claimsJSON)
    })
  })
}
/*
exports.getClaimsCountsJSONByUrl = function (url) {
  return new Promise(function (fulfill, reject) {
    Storage.getItem(url).then(values => {
      if (values) {
        fulfill(values[1].length)
                // fulfill("3")
      } else {
        fulfill('0')
      }
    })
  })
}
*/

exports.getClaimsCountsJSONByUrl = function (url) {
  return new Promise(function (resolve, reject) {
    Storage.getClaimsCount(url).then(value => resolve(value.toString()))
  })
}
