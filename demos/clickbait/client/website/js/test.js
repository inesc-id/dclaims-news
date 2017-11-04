// NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]
// HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]

/*
<div class="col-lg-2">
          <button type='button' class='btn btn-info btn-lg homepage-news-claimsViewer-button' onclick='clickClaims()' data-toggle='modal' data-target='#claim-post'>View reviews <span id='badge_http://localhost:8095/post2.html' class='badge clickbaitnotification homepage-news-claimsCounter-badge'></span></button>
        </div>

*/

/*
# ID's
hashId = newsTitle.Sha256.hash()

*Buttons*
button- 		hashId
div-button - 	hashId

*Modals*
modal- 			hashId
modal-claim-body- hashId

*/

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

function createButton (hash, parent) {
  var buttonDiv = document.createElement('div')
  var buttonId = 'button-' + hash
  var divId = 'div-' + buttonId

  	buttonDiv.id = divId
  	buttonDiv.class = 'col-lg-2'
  	parent.appendChild(buttonDiv)

  	var html = "<button type='button' class='btn btn-info btn-lg homepage-news-claimsViewer-button' onclick='clickClaims()' data-toggle='modal' data-target='" + '#modal-' + hash + "'>View reviews <span id='span-" + buttonId + "' class='badge clickbaitnotification homepage-news-claimsCounter-badge'></span></button>"
  	console.log(html)
  	document.getElementById(divId).innerHTML = html
}

function createModals (hash, title) {
  var modalDiv = document.createElement('div')
  var modalId = 'modal-' + hash
  modalDiv.id = modalId
  modalDiv.setAttribute('class', 'modal fade clickbaitclaims')
  modalDiv.setAttribute('role', 'dialog')
  var claimBodyId = 'modal-claim-body-' + hash

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

function allElements () {
  var list = document.getElementsByClassName('homepage-news-element')

  for (var i = 0; i < list.length; i++) {
  	var	title = list[i].getElementsByClassName('homepage-news-title')[0].innerText
  	var strippedTitle = title.replace(/\W/g, '').toLowerCase()
  	var hashId = Sha256.hash(strippedTitle)
  	createButton(hashId, list[i])
  	createModals(hashId, title)
  }
}

allElements()
