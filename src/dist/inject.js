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

const homePageDefaultValues1 = {
  newsElementClass: 'sdc-news-story-grid__card',
  newsTitleClass: 'sdc-news-story-grid__headline',
  specificArticleElement: 'sdc-news-article-header__headline'
}

const homePageDefaultValues2 = {
  newsElementClass: 'blog-article',
  newsTitleClass: 'article-title',
  specificArticleElement: 'main-article-content'
}

function launch () {
  var homePageDefaultValues = homePageDefaultValues1
  console.log('sas.dkjlkAJDSLkajdlaks: ' + window.location.host)
  if (window.location.host == 'tecnico.ulisboa.pt') {
    homePageDefaultValues = homePageDefaultValues2
  }
  if (document.body.getElementsByClassName(homePageDefaultValues.specificArticleElement).length == 0) {
    launchMainPage()
  }

  if (document.body.getElementsByClassName(homePageDefaultValues.specificArticleElement).length == 1) {
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

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
var jq = document.createElement('script')
jq.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'
document.getElementsByTagName('head')[0].appendChild(jq)
console.log('pausa...')
sleep(500).then(() => {
  var bsScript = document.createElement('script')
  bsScript.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'
  document.getElementsByTagName('head')[0].appendChild(bsScript)

  var bsLink = document.createElement('link')
  bsLink.rel = 'stylesheet'
  bsLink.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'
  document.getElementsByTagName('head')[0].appendChild(bsLink)

  var hypercertsCSS = document.createElement('link')
  hypercertsCSS.rel = 'stylesheet'
  hypercertsCSS.href = chrome.extension.getURL('css/hypercerts.css')
  document.getElementsByTagName('head')[0].appendChild(hypercertsCSS)
  launch()
})
