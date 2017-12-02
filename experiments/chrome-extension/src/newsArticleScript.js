 var serverAddress = 'http://146.193.41.153:8092/'
 import Sha256 from './sha256.js'
 var serverAddress = 'http://localhost:8092/'
 // import NewsParser from './hypercertsParser.js'

 var articleId = ''

 function generateArticleId () {
   // var title = document.getElementsByClassName('post-heading')[0].getElementsByTagName('h1')[0].innerHTML
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

   var html = ''

   html += "            <div class='row'>"
   html += "              <button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#generate-claim-modal-" + articleId + "'>Contest the Title</button>"
   html += '            </div>'

   document.getElementById(buttonDivId).innerHTML = html
 }

 function createGenerateClaimModal () {
   var modalDiv = document.createElement('div')
   var modalId = 'generate-claim-modal-' + articleId
   modalDiv.id = modalId
   modalDiv.setAttribute('class', 'modal fade')
   modalDiv.setAttribute('role', 'dialog')

   var articleIdS = 'clickClaims("' + articleId + '")'

   var funcCall = 'sendMessage(document.getElementById("claim").value)'
   // var funcCall = '"testOnClick()"'

   var html = ''
   html += "       <div class='modal-dialog modal-lg'>"
   html += '         <!-- Modal content-->'
   html += "         <div class='modal-content'>"
   html += "           <div class='modal-header'>"
   html += "             <button type='button' class='close' data-dismiss='modal'>&times;</button>"
   html += "             <h4 class='modal-title'>Review Article's Title</h4>"
   html += '           </div>'
   html += "           <div class='modal-body'>"
   html += '             <form>'
   html += "               <div class='form-group'>"
   html += "                 <label for='claim'>Claim:</label>"
   html += "                 <input type='text' class='form-control' id='claim'>"
   html += '               </div>'
   html += "               <button type='button' class='btn btn-default' onclick=" + funcCall + '>Submit</button>'
   // html += "               <button type='button' class='btn btn-default' onclick=" + funcCall + '>Submit</button>'
   html += "               <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>"
   html += '             </form>'
   html += '           </div>'
   html += "           <div class='modal-footer'>"
   html += '           </div>'
   html += '         </div>'
   html += '       </div>'

   modalDiv.innerHTML = html

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
// application/javascript
        // http://146.193.41.153:8092/verify?claim=veryfake&article=jn_99
   var claim = name
  // var article_url = window.location.href
  // var serverAddress = "http://turbina.gsd.inesc-id.pt:8092"
  /*
  var title = document.getElementsByClassName('post-heading')[0].getElementsByTagName('h1')[0].innerHTML
  var strippedTitle = title.replace(/\W/g, '').toLowerCase()
  var articleId = Sha256.hash(strippedTitle)
  */
   var request = serverAddress + 'verify?claim=' + claim + '&article=' + articleId

   console.log('REQUEST::::::     ' + request)

   xhr.open('GET', request)
   xhr.setRequestHeader('content-type', 'application/javascript')

        // xhr.setRequestHeader("postman-token", "9478c587-f2da-2c03-fe1a-5747306ae18f");

   xhr.send(data)
 }

 window.sendMessage = sendMessage

 generateArticleId()
 createGenerateClaimModal()
 createGenerateClaimButton()
