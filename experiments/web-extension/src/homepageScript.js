import Sha256 from './sha256.js'
import NewsParser from './hypercertsParser.js'

console.log('Helloooo')

// var serverAddress = 'http://146.193.41.153:8092/'
var serverAddress = 'http://localhost:8092/'

function clickClaims (articleId) {
  console.log('Opened claims')
  var claimBodyId = 'modal-claim-body-' + articleId
  document.getElementById(claimBodyId).innerHTML = "There are no claims about this article's title yet. Open the article and be the first!"

// http://146.193.41.153:8092/getclaims?article=http://turbina.gsd.inesc-id.pt:8095/post.html

  var data = null
  var xhr = new XMLHttpRequest()
  xhr.withCredentials = false

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      var claims = JSON.parse(this.response)

      var cleanList = claims['claimsList'][1]
      console.log(cleanList.length)

      var txt = '<div class="container">'

      for (let i = 0; i < cleanList.length; i++) {
                // console.log(cleanList[i])
        let st1 = '  CLAIM #' + (i + 1)
        let st2 = 'Text: \n' + cleanList[i]['claim']
        let st3 = 'User: ' + cleanList[i]['ip']

                // txt+= '<div class="row">'
        txt += '<p class="claimtitle">' + st1 + '</p>' + '<p class="claimbody">' + st2 + '</p>' + '<p class="claimuser">' + st3 + '</p>'
                // txt+='</div>'
      }
      txt += '</div>'
      document.getElementById(claimBodyId).innerHTML = txt
    }
  })

  var request = serverAddress + 'getclaims?article=' + articleId

  console.log('RESQUESTING:  \n' + request)

  xhr.open('GET', request)
  xhr.setRequestHeader('content-type', 'application/javascript')
  xhr.send(data)
}
window.clickClaims = clickClaims

function titles () {
  console.log('Test file')

  var list = document.getElementsByClassName('homepage-news-title')
  for (var item of list) {
    var strippedTitle = item.innerText.replace(/\W/g, '').toLowerCase()
    console.log(strippedTitle)
    var encrypted = Sha256.hash(strippedTitle)
    console.log('HASH: ' + encrypted)
  }
}

function createViewClaimsButton (articleId, parent) {
  var buttonDiv = document.createElement('div')
  var buttonId = 'button-' + articleId
  var divId = 'div-' + buttonId

  var articleIdS = 'clickClaims("' + articleId + '")'

  buttonDiv.id = divId
  buttonDiv.class = 'col-lg-2'
  parent.appendChild(buttonDiv)

  var html = "<button type='button' class='btn btn-info btn-lg homepage-news-claimsViewer-button' onclick=" + articleIdS + " data-toggle='modal' data-target= #modal-" + articleId + ">View reviews <span id='span-" + buttonId + "' class='badge clickbaitnotification homepage-news-claimsCounter-badge'></span></button>"
  console.log('butttoooooon: ' + html)
  document.getElementById(divId).innerHTML = html
}

function createViewClaimsModals (articleId, title) {
  var modalDiv = document.createElement('div')
  var modalId = 'modal-' + articleId
  modalDiv.id = modalId
  modalDiv.setAttribute('class', 'modal fade clickbaitclaims')
  modalDiv.setAttribute('role', 'dialog')
  var claimBodyId = 'modal-claim-body-' + articleId

  var html = ''
  html += "  <div class='modal-dialog'>"
  html += '    <!-- Modal content-->'
  html += "    <div class='modal-content'>"
  html += "      <div class='modal-header'>"
  html += "        <button type='button' class='close' data-dismiss='modal'>&times;</button>"
  html += "        <h4 class='modal-title'>'" + title + "'</h4>"
  html += '      </div>'
  html += "      <div class='modal-body' id='" + claimBodyId + "'>"
  html += '        <p>The title induces the reader in error</p>'
  html += '        <p> Science cuts two ways, of course; Clearly suggests there is another way</p>'
  html += '      </div>'
  html += "      <div class='modal-footer'>"
  html += "        <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>"
  html += '      </div>'
  html += '    </div>'
  html += ''
  html += '  </div>'

  modalDiv.innerHTML = html

  document.body.appendChild(modalDiv)
}

function setBadgeCount (articleId) {
  var data = null
  var xhr = new XMLHttpRequest()
  xhr.withCredentials = false
  var badgeId = 'span-button-' + articleId

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      var number = this.response.toString()
      console.log('Server response:    ' + number)
      document.getElementById(badgeId).innerHTML = number
    }
  })
  var request = serverAddress + 'getcount?article=' + articleId

  xhr.open('GET', request)
  xhr.setRequestHeader('content-type', 'application/javascript')
  xhr.send(data)
}

function allElements () {
  console.log('TITLLLLEE: ')
  // var list = document.getElementsByClassName('homepage-news-element')
  var list = NewsParser.getNewsItems(document)

  for (var i = 0; i < list.length; i++) {
    // var title = list[i].getElementsByClassName('homepage-news-title')[0].innerText
    var title = NewsParser.getTitleElement(list[i])

    // var strippedTitle = title.replace(/\W/g, '').toLowerCase()
    var strippedTitle = NewsParser.cleanTitle(title)
    var articleId = Sha256.hash(strippedTitle)

    // Buttons
    createViewClaimsButton(articleId, list[i])
    // Modal
    createViewClaimsModals(articleId, title)
    // Badges
    setBadgeCount(articleId)
  }
}

allElements()
