var Storage = require('./storage.js')

var exports = module.exports

exports.handleVerification = function (nkey, newClaim) {
  return new Promise(function (resolve, reject) {
    Storage.addItem(nkey, newClaim).then(resolve)
  })
}

exports.getClaimsJSONByUrl = function (url) {
  return new Promise(function (fulfill, reject) {
    Storage.getClaimsListFromIpfs(url).then(value => {
      var claimsJSON = {}
      claimsJSON.claimsList = value
      fulfill(claimsJSON)
    })
  })
}

exports.getClaimsCountsJSONByUrl = function (url) {
  return new Promise(function (resolve, reject) {
    Storage.getClaimsCount(url).then(value => resolve(value.toString()))
  })
}

exports.getUserId = function () {
  return new Promise(function (resolve, reject) {
    Storage.getUserId().then(resolve)
  })
}
