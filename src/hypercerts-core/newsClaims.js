const uuidv4 = require('uuid/v4')
const HYPERCERTS_NAMESPACE = 'hypercerts-news'

var exports = modules.exports

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
  var thisClaim = defaultClaim

  thisClaim.id = HYPERCERTS_NAMESPACE + '-' + uuidv4()
  thisClaim.issuer = issuerId
  thisClaim.claim.id = articleId
  thisClaim.claim.freeText = freeText

  return thisClaim
}
