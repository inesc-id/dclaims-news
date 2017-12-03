# Hypercerts

- João Santos' M.Sc Thesis
- Universidade de Lisboa, Instituto Superior Técnico
- 2017-2018
- Advisors: 
  - [Nuno Santos](http://www.gsd.inesc-id.pt/~nsantos/)
  - [David Dias](http://daviddias.me/)

## Project Description

Hypercerts is a platform that enables a truly distributed and trustless way of managing claims about News articles.
Currently under development.

Using the Hypercerts-Web-Extension users can generate claims  (whose authenticity and integrity can be verified by anyone without the need of a third party) about any news article, and those claims can be presented to all other users. This all happens in a distributed and trustless form, with the use of [IPFS](https://ipfs.io) and [Ethereum](https://www.ethereum.org).

## Project Structure
Hypercerts is made of three main components. [Hypercert-core](https://github.com/inesc-id/hypercerts/tree/master/src/hypercerts-core), [Hypercerts-Web-Extension](https://github.com/inesc-id/hypercerts/tree/master/src/hypercerts-web-extension) and [Hypercerts-Ethereum](https://github.com/inesc-id/hypercerts/tree/master/src/hypercerts-ethereum-mock) (currently a mock).
![](https://github.com/inesc-id/hypercerts-pm/blob/master/images/hc-arch2.jpg?raw=true)
The directory structure of this repo is as follows:
```
-src
 ├── hypercerts-core
 ├── hypercerts-ethereum-mock
 ├── hypercerts-web-extension
 ```
### Hypercerts Web-Extension
The Hypercerts-Web-Extension is a Chrome extension that dynamically generates HTML content that allows users to interact with the Hypercerts-core from any news website (currently only supports [https://tecnico.ulisboa.pt/en/news](https://tecnico.ulisboa.pt/en/news), but other can be easily added).
If you are not familiar with how Chrome extensions work, please refer to this [quick start guide](https://developer.chrome.com/extensions/getstarted).
```
├── src
│   ├── elementsGenerator.js
│   ├── homepageScript.js
│   ├── hypercertsParser.js
│   ├── newsArticleScript.js
│   ├── serverConfig.json
│   └── sha256.js
├── dist
│   ├── content.js
│   ├── css
│   ├── inject.js
│   ├── manifest.json
│   ├── *.bundle.js
├── package.json
└── webpack.config.js
```

The files in `/src` are compiled and added to `/dist` as `*.bundle.js`.
Hypercerts deals with news websites by determining if the a given webpage is the homepage (the page where a lot of headlines are displayed) or a news article page (a webpage dedicated to an entire news piece) of the news website. 
- If it's the homepage:`homepageScript.js` is executed.
- If it's the article page: `newsArticleScript.js` is executed. 
 
> [`homepageScript.js`](https://github.com/inesc-id/hypercerts/blob/weekly-goals-build-extension/src/hypercerts-web-extension/src/homepageScript.js)

Deals with the homepage of news websites (where there are a lot of news titles in display). Crawls through the webpage, looking for news titles, generating IDs, buttons and modals to view claims made about those articles as well as a badge that shows the claims count for each article. 

> [`newsArticleScript.js`](https://github.com/inesc-id/hypercerts/blob/weekly-goals-build-extension/src/hypercerts-web-extension/src/newsArticleScript.js)

Deals with news article pages (a webpage that deals with only one article). Generates the article ID, from the title, and the button and modal to allow users to generate claims about that article.

There are other scripts that support the two presented above.
> [`elementsGenerator.js`](https://github.com/inesc-id/hypercerts/blob/weekly-goals-build-extension/src/hypercerts-web-extension/src/elementsGenerator.js)

Module that exports functions to generate the required HTML elements, buttons, modals, etc...

> [`sha256.js`](https://github.com/inesc-id/hypercerts/blob/weekly-goals-build-extension/src/hypercerts-web-extension/src/sha256.js)

Module that exports a function to compute a sha-256 hash of a string. Used to generate article id's, based on the article title.

> [`serverConfig.json`](https://github.com/inesc-id/hypercerts/blob/weekly-goals-build-extension/src/hypercerts-web-extension/src/serverConfig.json)

JSON file that has the IP:port of the server running Hypercerts-core.

### Hypercerts-Core

The Hypercerts-Web-Extension uses the Hypercerts-Core to store and retrieve claims.
This project uses the [IPFS-Go](https://github.com/ipfs/go-ipfs) implementation (due to the requirement of content discovery) so it requires an IPFS daemon to be executed on a machine. 
**Note: This machine can be the same one in which the browser extension is running.**

### Hypercerts-Ethereum-mock
Currently this ethereum-mock serves as a translator between news articles's ID and the IPFS Links of the claims about those articles.

## Usage
1. Clone this repo.
`git clone https://github.com/inesc-id/hypercerts.git` 
2. Install IPFS-Go, [see here](https://github.com/ipfs/go-ipfs#install) and run it with `ipfs daemon`.
**Note:** We are using the ipfs-js-api so there is the need to configure ipfs daemon to listen on the correct port, `5001` in this case. The example below shows how to correctly configure it. ([more info here](https://github.com/ipfs/js-ipfs-api#install))
```sh
# Show the ipfs config API port to check it is correct
> ipfs config Addresses.API
/ip4/127.0.0.1/tcp/5001
# Set it if it does not match the above output
> ipfs config Addresses.API /ip4/127.0.0.1/tcp/5001
# Restart the daemon after changing the config

# Run the daemon
> ipfs daemon
```
3. On a new terminal window, install and run Hypercerts-ethereum-mock
```sh
> cd src/hypercerts-ethereum-mock
> npm install
> npm server.js
```
**Note:** Hypercerts requires Node.js v6 or higher.

4. On a new terminal window, install and run Hypercerts-core
```sh
> cd src/hypercerts-core
> npm install
> node app.js
```

**Note:** If you are running Hypercerts-core in a different machine from the one you are running Hypercerts-ethereum mock (or changed the port), you need to update the `src/hypercerts-core/blockchainAPI.js` file:
```js
//const serverAddress = 'http://localhost:8088/'
const serverAddress = 'hypercerts-mock-ethereum_ip:port'
```



5. On a new terminal window, install, configure and compile the Chrome extension
```sh
> cd src/hypercerts-web-extension
> npm install
# Open and configure src/serverConfig.json by adding the correct ip:port of your running IPFS daemon in serverAddress (ignore the _serverAddress)
# Compile with webpack
npm run webpack
```
6. Install the Hypercerts-web-extension in Chrome
    a. Open Google Chrome
    b. On the address bar, go to `chrome://extensions`
    c. Click `Load unpacked extension`
    d. Navigate to and select src/hypercerts-web-extension/dist

7. Use the extension! Visit the website [`https://tecnico.ulisboa.pt/en/news`](https://tecnico.ulisboa.pt/en/news)
**Note:** Since you're probably running Hypercerts-core on your local machine, without https, we will have to turn a chrome safety feature off.
            - Click the shield icon in the far right of the address bar.
            - In the pop-up window, click Load anyway or Load unsafe script (depending on your Chrome version).

8. Open a news article and generate a claim about it! Then go back to the homepage and verify that the claims counter of that article has increased. You can then click the `view claims` button, and the claim you generated should appear.
**Note:** There counter has a [bug](https://github.com/inesc-id/hypercerts/issues/7) which results in the count sometimes appearing as `0`, this can be resolved by reloading the page a few times.

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
