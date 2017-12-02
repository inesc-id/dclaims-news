var exports = module.exports = {}

exports.generateViewReviewsModal = function (title, claimBodyId) {
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
  html += "        <button type='button' class='btn btn-default' data-dismiss='modal'>Closesss</button>"
  html += '      </div>'
  html += '    </div>'
  html += ''
  html += '  </div>'

  return html
}
