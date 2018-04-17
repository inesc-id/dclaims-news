var exports = module.exports = {}

var claimsCategories =
  [
    'Fake News',
    'Satire',
    'Extreme Bias',
    'Conspiracy Theory',
    'State News',
    'Junk Science',
    'Clickbait'
  ]

function claimsCategoriesHTML () {
  var html = ''

  for (var i = 0; i < claimsCategories.length; i++) {
    html += "<option value='" + claimsCategories[i] + "'>" + claimsCategories[i] + '</option>'
  }

  return html
}

exports.getClaimsCategories = function () {
  return claimsCategories
}

exports.createViewReviewsModal = function (title, claimBodyId) {
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

  return html
}

exports.createClaimModal = function (funcCall) {
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
  html += "                 <label for='name' id='claim-modal-userId-label'>ID:</label>"
  // html += "                 <input type='text' class='form-control' id='claim-modal-userId'>"
  html += "                 <label for='freeText'>Free Text:</label>"
  html += "                 <input type='text' class='form-control' id='claim-modal-freeText'>"
  html += ' <label class="switch" > <input id="switch" type="checkbox"> <span class="slider round"></span> </label>'
  html += "                 <div class='styled-select slate'>"
  html += '                   <select id ="claim">'
  html += claimsCategoriesHTML()
  html += '                   </select'
  html += '                 </div>'
  html += '               </div>'
  html += "               <button type='button' class='btn btn-default' data-dismiss='modal' onclick=" + funcCall + '>Submit</button>'
  html += "               <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>"
  html += '             </form>'
  html += '           </div>'
  html += "           <div class='modal-footer'>"
  html += '           </div>'
  html += '         </div>'
  html += '       </div>'

  return html
}

exports.createGenerateClaimButton = function (articleId) {
  var html = ''

  html += "            <div class='row'>"
  html += "              <button type='button' onclick='updateUserId()' class='btn btn-info btn-lg' data-toggle='modal' data-target='#generate-claim-modal-" + articleId + "'>Contest the Title</button>"
  html += '            </div>'

  return html
}
