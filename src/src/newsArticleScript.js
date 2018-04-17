import NewsParser from './hypercertsParser.js'
import ElementsGenerator from './elementsGenerator'
import NewsClaims from './newsClaims.js'
// import Hypercerts from 'hypercerts-core'
import Hypercerts from '../../../hypercerts-core/src/hc-core.js' // testing
import sha3 from 'solidity-sha3'

var articleId = ''
var userId = null

const CONTRACT_ADDRESS = '0xF2F2f7C36fbBA17ad8a28a4680a7059B44C4B626'

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
    window.performance.mark('news-timer-issue-claim-manual-start')
    if (document.getElementById('switch').checked) {
      Hypercerts.issueWithPublisher(articleId, newClaim).then(value => {
        // alert(value.toString())
        // console.log(value.toString())
        window.performance.mark('news-timer-issue-claim-manual-end')
        window.performance.measure('news-timer-issue-claim-manual', 'news-timer-issue-claim-manual-start', 'news-timer-issue-claim-manual-end')
      })
    } else {
      Hypercerts.handleVerification(articleId, newClaim).then(value => {
        alert(value.toString())
        console.log(value.toString())
        window.performance.mark('news-timer-issue-claim-manual-end')
        window.performance.measure('news-timer-issue-claim-manual', 'news-timer-issue-claim-manual-start', 'news-timer-issue-claim-manual-end')
      }
  )
    }
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
    contractAddress: CONTRACT_ADDRESS
  }

Hypercerts.init(hypercertsSetup).then(generateArticleId).then(createGenerateClaimModal).then(createGenerateClaimButton)
// Hypercerts.init(2).then(generateArticleId).then(createGenerateClaimModal).then(createGenerateClaimButton)
