const sigUtil = require('eth-sig-util')
const HypercertsNewsClaims = require('../../../hypercerts-news-claims/src/index.js')

var exports = module.exports

function buildMsgParams (claim) {
  let msgParams = [
    {
      type: 'string',      // Any valid solidity type
      name: 'Issuer ID',   // Any string label you want
      value: claim.issuer     // The value to sign
    },
    {
      type: 'string',
      name: 'Article ID',
      value: claim.claim.id
    },
    {
      type: 'string',
      name: 'Classification',
      value: claim.claim.category
    },
    {
      type: 'string',
      name: 'Free Text',
      value: claim.claim.freeText
    }
  ]
  return msgParams
}

exports.newClaim = function (issuerId, articleId, category, freeText) {
  return new Promise(function (resolve, reject) {
    var thisClaim = new HypercertsNewsClaims.SingleClaim(issuerId, articleId, category, freeText)

    const msgParams = buildMsgParams(thisClaim)

    var issuerAddress = web3.eth.accounts[0]

    signMsg(msgParams, issuerAddress).then(value => {
      thisClaim.signature.type = 'eth_signTypedData',
    thisClaim.signature.creator = issuerAddress,
    thisClaim.signature.signatureValue = value.result
      resolve(thisClaim)
    })
  })
}

exports.verifySignature = function (claim) {
  try {
    const msgParams = buildMsgParams(claim)
    const issuerId = claim.issuer

    const recovered = sigUtil.recoverTypedSignature({
      data: msgParams,
      sig: claim.signature.signatureValue
    })
    if (recovered === issuerId) {
      // alert('Recovered signer: ' + issuerId)
      return true
    } else {
    // alert('Failed to verify signer')
      return false
    }
  } catch (err) {
    console.log('Error getting signature')
    return false
  }
}

function signMsg (msgParams, from) {
  return new Promise(function (resolve, reject) {
    web3.currentProvider.sendAsync({
      method: 'eth_signTypedData',
      params: [msgParams, from],
      from: from
    }, function (err, result) {
      if (err) reject(console.error(err))
      if (result.error) {
        reject(console.error(result.error.message))
      }
      resolve(result)
    })
  })
}
