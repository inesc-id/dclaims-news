const uuidv4 = require('uuid/v4')
const HYPERCERTS_NAMESPACE = 'hypercerts-news'
const sigUtil = require('eth-sig-util')

var exports = module.exports

var defaultClaim =
  {
    id: 'claim_id',
    type: ['hypercerts_news_claim'],
    issuer: 'issuer_id',
    issued: 'yyyy-mm-dd',
    claim: {
      id: 'article_id',
      category: 'one_from_the_list',
      freeText: 'something'
    },
    revocation: {
      id: 'articleId',
      type: 'SimpleRevocationList2017'
    },
    signature: {
      type: 'something',
      created: 'timestamp',
      creator: 'someone',
      domain: 'something',
      nonce: '1234',
      signatureValue: 'signature'
    }
  }

exports.newClaim = function (issuerId, articleId, category, freeText) {
  return new Promise(function (resolve, reject) {
    var thisClaim = defaultClaim

    thisClaim.id = HYPERCERTS_NAMESPACE + '-' + uuidv4()
    thisClaim.issuer = issuerId
    thisClaim.claim.id = articleId
    thisClaim.claim.freeText = freeText
    thisClaim.claim.category = category

    const msgParams = [
      {
        type: 'string',      // Any valid solidity type
        name: 'Issuer ID',   // Any string label you want
        value: issuerId     // The value to sign
      },
      {
        type: 'string',
        name: 'Article ID',
        value: articleId
      },
      {
        type: 'string',
        name: 'Classification',
        value: category
      },
      {
        type: 'string',
        name: 'Free Text',
        value: freeText
      }
    ]

    var issuerAddress = web3.eth.accounts[0]

    signMsg(msgParams, issuerAddress).then(value => {
      thisClaim.signature.type = 'eth_signTypedData',
    thisClaim.signature.creator = issuerAddress,
    thisClaim.signature.signatureValue = value
      resolve(thisClaim)
    })
  })
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
