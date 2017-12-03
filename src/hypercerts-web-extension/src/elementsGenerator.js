var exports = module.exports = {}

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
  html += "                 <label for='claim'>Claim:</label>"
  html += "                 <input type='text' class='form-control' id='claim'>"
  html += '               </div>'
  html += "               <button type='button' class='btn btn-default' onclick=" + funcCall + '>Submit</button>'
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
  html += "              <button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#generate-claim-modal-" + articleId + "'>Contest the Title</button>"
  html += '            </div>'

  return html
}
