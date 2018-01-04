import NewsParser from './hypercertsParser.js'
import ElementsGenerator from './elementsGenerator'
import NewsClaims from './newsClaims.js'
import Hypercerts from 'hypercerts-core'
// import Hypercerts from '../../../hypercerts-core/src/hc-core.js' // testing
import sha3 from 'solidity-sha3'

var articleId = ''
var userId = null

function setUserId (id) {
  userId = id
}

function generateArticleId () {
  return new Promise(function (resolve, reject) {
    var title = NewsParser.getTitleElement(document)
    var strippedTitle = title.replace(/\W/g, '').toLowerCase()
    articleId = sha3(strippedTitle)
    resolve()
  })
}

function createGenerateClaimButton () {
  return new Promise(function (resolve, reject) {
    var buttonDiv = document.createElement('div')
    var buttonDivId = 'generate-claim-button' + articleId
    buttonDiv.id = buttonDivId
    buttonDiv.class = 'container'
    document.getElementsByTagName('article')[0].appendChild(buttonDiv)

    document.getElementById(buttonDivId).innerHTML = ElementsGenerator.createGenerateClaimButton(articleId)
    resolve()
  })
}

function createGenerateClaimModal () {
  return new Promise(function (resolve, reject) {
    var modalDiv = document.createElement('div')
    var modalId = 'generate-claim-modal-' + articleId
    modalDiv.id = modalId
    modalDiv.setAttribute('class', 'modal fade')
    modalDiv.setAttribute('role', 'dialog')

    var funcCall = 'sendMessage(document.getElementById("claim").value,document.getElementById("claim-modal-freeText").value)'

    modalDiv.innerHTML = ElementsGenerator.createClaimModal(funcCall)
    document.body.appendChild(modalDiv)
    resolve()
  })
}

function sendMessage (claimCategory, freeText) {
  // (issuerId, articleId, category, freeText)
  NewsClaims.newClaim(userId, articleId, claimCategory, freeText).then(newClaim => {
    Hypercerts.handleVerification(articleId, newClaim).then(value => {
      alert(value.toString())
      console.log(value.toString())
    })
  })
}

window.sendMessage = sendMessage
window.updateUserId = function () {
  Hypercerts.getUserId().then(setUserId).then(value => {
    document.getElementById('claim-modal-userId-label').innerText = userId
  })
}

let hypercertsSetup =
  {
    initType: 2,
    ipfsHost: '127.0.0.1',
    contractAddress: '0x53abb1d321dd254eff936f0caee94effd4e10621'
  }

Hypercerts.init(hypercertsSetup).then(generateArticleId).then(createGenerateClaimModal).then(createGenerateClaimButton)
// Hypercerts.init(2).then(generateArticleId).then(createGenerateClaimModal).then(createGenerateClaimButton)
