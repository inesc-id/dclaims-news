import NewsParser from './hypercertsParser.js'
import ElementsGenerator from './elementsGenerator'
import NewsClaims from './newsClaims.js'
// import Hypercerts from 'hypercerts-core'
import Hypercerts from '../../../hypercerts-core/src/hc-core.js' // testing
import sha3 from 'solidity-sha3'

var TRUSTLIST = ['0x64810cefb991351b323e8a970cda57e07ecbad30', '0x3296C51BC98DD4dCd5605469EC3A736c0E60ef43']

var TRUSTLIST_ACTIVE = false

var TESTING = true

const CONTRACT_ADDRESS = '0xfa66a818D2e537F4A861b71a435CfBB1B5A2BdF2'

window.articleIds = []

var INIT_RELOAD_COUNT = 0
// var RELOAD_COUNT = localStorage.getItem('reload-counter')
var RELOAD_COUNT = 0

var loaded = []

function clickClaims (articleId) {
  // checks if the page has already loaded the items. If it has,
  // it does not request the stuff again
  if (loaded.indexOf(articleId) != -1) {
    console.log('Already loaded, refresh page to get latest')
    return
  }
  loaded.push(articleId)
  console.log('Opened claims')
  var claimBodyId = 'modal-claim-body-' + articleId
  document.getElementById(claimBodyId).innerHTML = "There are no claims about this article's title yet. Open the article and be the first!"
  window.performance.mark('timer-get-claims-ipfs-start' + articleId.substring(1, 5))
  Hypercerts.getClaimsJSONByUrl(articleId).then(value => {
    var claims = value
    var cleanList = claims['claimsList']
    window.performance.mark('timer-get-claims-ipfs-end' + articleId.substring(1, 5))
    window.performance.measure('home-timer-get-claims-ipfs-' + articleId.substring(1, 5) + 'len-' + cleanList.length, 'timer-get-claims-ipfs-start' + articleId.substring(1, 5), 'timer-get-claims-ipfs-end' + articleId.substring(1, 5))
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
/*
    if (!NewsClaims.verifySignature(cleanList[i])) {
      // if bad digital signature
      console.log('Bad signature from claim: ' + cleanList[i].id)
      continue
    }
    */

    let st1 = '  CLAIM #' + (i + 1)
    let st2 = 'Category: \n' + cleanList[i].claim.category
    // let st4 = 'Comment: \n' + cleanList[i].claim.freeText
    let st3 = 'User: ' + cleanList[i].issuer

    txt += '<p class="claimtitle">' + st1 + '</p>' + '<p class="claimbody">' + st2 + '</p>' + '<p class="claimuser">' + st3 + '</p>'
    // txt += '<p class="claimtitle">' + st1 + '</p>' + '<p class="claimbody">' + st2 + '</p>' + '<p class="claimbody">' + st4 + '</p>' + '<p class="claimuser">' + st3 + '</p>'
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

  window.performance.mark('timer-load-claims-count-start' + articleId.substring(1, 5))

  Hypercerts.getClaimsCountsJSONByUrl(articleId).then(value => {
    var claimsCount = value.toString()
    console.log('Server response:    ' + claimsCount)
    document.getElementById(badgeId).innerHTML = claimsCount
    window.performance.mark('timer-load-claims-count-end' + articleId.substring(1, 5))
    window.performance.measure('home-timer-load-claims-count-' + articleId.substring(1, 5), 'timer-load-claims-count-start' + articleId.substring(1, 5), 'timer-load-claims-count-end' + articleId.substring(1, 5))
  })
}

function allElements () {
  window.performance.mark('timer-dclaims-init-end')
  window.performance.measure('home-timer-dclaims-init', 'timer-dclaims-init-start', 'timer-dclaims-init-end')
  window.performance.mark('timer-create-ui-elements-start')

  var list = NewsParser.getNewsItems(document)

  for (var i = 0; i < list.length; i++) {
    try {
      var title = NewsParser.getTitleElement(list[i])
      var strippedTitle = NewsParser.cleanTitle(title)
      var articleId = sha3(strippedTitle)
    } catch (err) {
      console.log('Error getting title, probably not a news article.  - ' + err)
      continue
    }
    window.articleIds.push(articleId)

    // Buttons
    createViewClaimsButton(articleId, list[i])
    // Modal
    createViewClaimsModals(articleId, title)

    // Badges
    setBadgeCount(articleId)
  }

  window.performance.mark('timer-create-ui-elements-end')
  window.performance.measure('home-timer-create-ui-elements', 'timer-create-ui-elements-start', 'timer-create-ui-elements-end')

  if (RELOAD_COUNT == INIT_RELOAD_COUNT && RELOAD_COUNT > 0) {
    let bla = ['tests']
    bla = JSON.stringify(bla)
    localStorage.setItem('measures', bla)
  }

  if (RELOAD_COUNT > 0) {
    var items = []
    items.push(window.performance.getEntriesByType('measure'))
    var allItems = JSON.parse(localStorage.getItem('measures'))
    var newItems = allItems.concat(items)
    var newItemsJson = JSON.stringify(newItems)
    localStorage.setItem('measures', newItemsJson)
    localStorage.setItem('reload-counter', localStorage.getItem('reload-counter') - 1)
    location.reload()
  }
}

// '0x53abb1d321dd254eff936f0caee94effd4e10621'
let hypercertsSetup =
  {
    initType: 2,
    ipfsHost: '127.0.0.1',
    contractAddress: CONTRACT_ADDRESS
  }
window.performance.mark('timer-dclaims-init-start')
Hypercerts.init(hypercertsSetup).then(allElements)
// Hypercerts.init(2).then(allElements)

/*
window.getAllClaims = function () {
  var list = NewsParser.getNewsItems(document)

  for (var i = 0; i < list.length; i++) {
    var title = NewsParser.getTitleElement(list[i])
    var strippedTitle = NewsParser.cleanTitle(title)
    var articleId = sha3(strippedTitle)

    clickClaims(articleId)
  }
}
*/

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

window.getAllClaims = async function () {
  var list = NewsParser.getNewsItems(document)

  for (var i = 0; i < list.length; i++) {
    var title = NewsParser.getTitleElement(list[i])
    var strippedTitle = NewsParser.cleanTitle(title)
    var articleId = sha3(strippedTitle)
    // clickClaims(articleId)
    window.performance.mark('timer-get-claims-ipfs-start' + articleId.substring(1, 5))
    Hypercerts.getClaimsJSONByUrl(articleId).then(value => {
      var claims = value
      var cleanList = claims['claimsList']
      window.performance.mark('timer-get-claims-ipfs-end' + articleId.substring(1, 5))
      window.performance.measure('home-timer-get-claims-ipfs-' + articleId.substring(1, 5) + 'len-' + cleanList.length, 'timer-get-claims-ipfs-start' + articleId.substring(1, 5), 'timer-get-claims-ipfs-end' + articleId.substring(1, 5))
    })
    await sleep(5000)
  }
}

/*
Instructions for tests, run in the browser
localStorage.removeItem('measures')
localStorage.setItem('reload-counter',20)
*/
