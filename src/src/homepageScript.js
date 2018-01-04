import NewsParser from './hypercertsParser.js'
import ElementsGenerator from './elementsGenerator'
import NewsClaims from './newsClaims.js'
import Hypercerts from 'hypercerts-core'
// import Hypercerts from '../../../hypercerts-core/src/hc-core.js' // testing
import sha3 from 'solidity-sha3'

var TRUSTLIST = ['0x64810cefb991351b323e8a970cda57e07ecbad30']

var TRUSTLIST_ACTIVE = true

function clickClaims (articleId) {
  console.log('Opened claims')
  var claimBodyId = 'modal-claim-body-' + articleId
  document.getElementById(claimBodyId).innerHTML = "There are no claims about this article's title yet. Open the article and be the first!"

  Hypercerts.getClaimsJSONByUrl(articleId).then(value => {
    var claims = value

    var cleanList = claims['claimsList']
    displayClaimsDigest(claimBodyId, cleanList)
  })
}

window.clickClaims = clickClaims

function displayClaimsDigest (claimBodyId, cleanList) {
  var txt = '<div class="container">'

  for (let i = 0; i < cleanList.length; i++) {
    if (TRUSTLIST_ACTIVE) {
      if (TRUSTLIST.indexOf(cleanList[i].issuer) == -1) {
        console.log('Skipped')
        continue
      }
    }

    if (!NewsClaims.verifySignature(cleanList[i])) {
      // if bad digital signature
      console.log('Bad signature from claim: ' + cleanList[i].id)
      continue
    }

    let st1 = '  CLAIM #' + (i + 1)
    let st2 = 'Category: \n' + cleanList[i].claim.category
    let st3 = 'User: ' + cleanList[i].issuer

    txt += '<p class="claimtitle">' + st1 + '</p>' + '<p class="claimbody">' + st2 + '</p>' + '<p class="claimuser">' + st3 + '</p>'
  }
  txt += '</div>'
  document.getElementById(claimBodyId).innerHTML = txt
}

function displayAllClaims (claimBodyId, cleanList) {
  var txt = '<div class="container">'

  for (let i = 0; i < cleanList.length; i++) {
                // console.log(cleanList[i])
    let st1 = '  CLAIM #' + (i + 1)
    let st2 = 'Category: \n' + cleanList[i].claim.category
    let st3 = 'User: ' + cleanList[i].issuer

    txt += '<p class="claimtitle">' + st1 + '</p>' + '<p class="claimbody">' + st2 + '</p>' + '<p class="claimuser">' + st3 + '</p>'
  }
  txt += '</div>'
  document.getElementById(claimBodyId).innerHTML = txt
}

function titles () {
  var list = document.getElementsByClassName('homepage-news-title')
  for (var item of list) {
    var strippedTitle = item.innerText.replace(/\W/g, '').toLowerCase()
    //
    var encrypted = sha3(strippedTitle)
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
  document.getElementById(divId).innerHTML = html
}

function createViewClaimsModals (articleId, title) {
  var modalDiv = document.createElement('div')
  var modalId = 'modal-' + articleId
  modalDiv.id = modalId
  modalDiv.setAttribute('class', 'modal fade clickbaitclaims')
  modalDiv.setAttribute('role', 'dialog')
  var claimBodyId = 'modal-claim-body-' + articleId

  modalDiv.innerHTML = ElementsGenerator.createViewReviewsModal(title, claimBodyId)

  document.body.appendChild(modalDiv)
}

function setBadgeCount (articleId) {
  var badgeId = 'span-button-' + articleId

  Hypercerts.getClaimsCountsJSONByUrl(articleId).then(value => {
    var claimsCount = value.toString()
    console.log('Server response:    ' + claimsCount)
    document.getElementById(badgeId).innerHTML = claimsCount
  })
}

function allElements () {
  var list = NewsParser.getNewsItems(document)

  for (var i = 0; i < list.length; i++) {
    var title = NewsParser.getTitleElement(list[i])

    var strippedTitle = NewsParser.cleanTitle(title)
    var articleId = sha3(strippedTitle)

    // Buttons
    createViewClaimsButton(articleId, list[i])
    // Modal
    createViewClaimsModals(articleId, title)
    // Badges
    setBadgeCount(articleId)
  }
}

let hypercertsSetup =
  {
    initType: 2,
    ipfsHost: '127.0.0.1',
    contractAddress: '0x53abb1d321dd254eff936f0caee94effd4e10621'
  }

Hypercerts.init(hypercertsSetup).then(allElements)
// Hypercerts.init(2).then(allElements)
