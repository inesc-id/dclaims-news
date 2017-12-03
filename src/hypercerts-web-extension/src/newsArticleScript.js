import Sha256 from './sha256.js'
import NewsParser from './hypercertsParser.js'
import ElementsGenerator from './elementsGenerator'
import serverConfig from './serverConfig.json'

var serverAddress = serverConfig['serverAddress']

var articleId = ''

function generateArticleId () {
  var title = NewsParser.getTitleElement(document)
  var strippedTitle = title.replace(/\W/g, '').toLowerCase()
  articleId = Sha256.hash(strippedTitle)
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

  var funcCall = 'sendMessage(document.getElementById("claim").value)'

  modalDiv.innerHTML = ElementsGenerator.createClaimModal(funcCall)

  document.body.appendChild(modalDiv)
}

function sendMessage (name) {
  var data = null

  var xhr = new XMLHttpRequest()
  xhr.withCredentials = false

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      alert(this.responseText)
      console.log(this.response)
    }
  })

  var claim = name
  var request = serverAddress + 'verify?claim=' + claim + '&article=' + articleId
  xhr.open('GET', request)
  xhr.setRequestHeader('content-type', 'application/javascript')

  xhr.send(data)
}

window.sendMessage = sendMessage

generateArticleId()
createGenerateClaimModal()
createGenerateClaimButton()
