/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} file_path Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */
function injectScript (file_path, tag) {
  var node = document.getElementsByTagName(tag)[0]
  var script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', file_path)
  node.appendChild(script)
}

function launch () {
  if (document.body.getElementsByClassName('main-article-content').length == 0) {
    launchMainPage()
  }

  if (document.body.getElementsByClassName('main-article-content').length == 1) {
    launchArticlePage()
  }
}

function launchMainPage () {
  console.log('Main Page')
  injectScript(chrome.extension.getURL('homepage.bundle.js'), 'body')
}

function launchArticlePage () {
  console.log('Article Page')
  injectScript(chrome.extension.getURL('newspage.bundle.js'), 'body')
}

launch()
