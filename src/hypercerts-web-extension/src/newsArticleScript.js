import Sha256 from './sha256.js'
import NewsParser from './hypercertsParser.js'
import ElementsGenerator from './elementsGenerator'
import serverConfig from './serverConfig.json'
import NewsClaims from './newsClaims.js'
import Hypercerts from './core/hc-core.js'
import sha3 from 'solidity-sha3'

var serverAddress = serverConfig['serverAddress']

var articleId = ''

function generateArticleId () {
  var title = NewsParser.getTitleElement(document)
  var strippedTitle = title.replace(/\W/g, '').toLowerCase()
  // articleId = Sha256.hash(strippedTitle)
  articleId = sha3(strippedTitle)
}

function createGenerateClaimButton () {
  var buttonDiv = document.createElement('div')
  var buttonDivId = 'generate-claim-button' + articleId
  buttonDiv.id = buttonDivId
  buttonDiv.class = 'container'
  document.getElementsByTagName('article')[0].appendChild(buttonDiv)

  document.getElementById(buttonDivId).innerHTML = ElementsGenerator.createGenerateClaimButton(articleId)
}

function createGenerateClaimModal () {
  var modalDiv = document.createElement('div')
  var modalId = 'generate-claim-modal-' + articleId
  modalDiv.id = modalId
  modalDiv.setAttribute('class', 'modal fade')
  modalDiv.setAttribute('role', 'dialog')

  var articleIdS = 'clickClaims("' + articleId + '")'

  var funcCall = 'sendMessage(document.getElementById("claim").value,document.getElementById("claim-modal-userId").value,document.getElementById("claim-modal-freeText").value)'

  modalDiv.innerHTML = ElementsGenerator.createClaimModal(funcCall)

  document.body.appendChild(modalDiv)
}

function sendMessage (claimCategory, userId, freeText) {
  // (issuerId, articleId, category, freeText)
  var newClaim = NewsClaims.newClaim(userId, articleId, claimCategory, freeText)

  Hypercerts.handleVerification(articleId, newClaim).then(value => {
    alert(value.toString())
    console.log(value.toString())
  })
}

window.sendMessage = sendMessage

generateArticleId()
createGenerateClaimModal()
createGenerateClaimButton()
