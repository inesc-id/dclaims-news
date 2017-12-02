/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* SHA-256 (FIPS 180-4) implementation in JavaScript                  (c) Chris Veness 2002-2017  */
/*                                                                                   MIT Licence  */
/* www.movable-type.co.uk/scripts/sha256.html                                                     */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */



/**
 * SHA-256 hash function reference implementation.
 *
 * This is an annotated direct implementation of FIPS 180-4, without any optimisations. It is
 * intended to aid understanding of the algorithm rather than for production use.
 *
 * While it could be used where performance is not critical, I would recommend using the ‘Web
 * Cryptography API’ (developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest) for the browser,
 * or the ‘crypto’ library (nodejs.org/api/crypto.html#crypto_class_hash) in Node.js.
 *
 * See csrc.nist.gov/groups/ST/toolkit/secure_hashing.html
 *     csrc.nist.gov/groups/ST/toolkit/examples.html
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sha256 = function () {
  function Sha256() {
    _classCallCheck(this, Sha256);
  }

  _createClass(Sha256, null, [{
    key: 'hash',

    /**
     * Generates SHA-256 hash of string.
     *
     * @param   {string} msg - (Unicode) string to be hashed.
     * @param   {Object} [options]
     * @param   {string} [options.msgFormat=string] - Message format: 'string' for JavaScript string
     *   (gets converted to UTF-8 for hashing); 'hex-bytes' for string of hex bytes ('616263' ≡ 'abc') .
     * @param   {string} [options.outFormat=hex] - Output format: 'hex' for string of contiguous
     *   hex bytes; 'hex-w' for grouping hex bytes into groups of (4 byte / 8 character) words.
     * @returns {string} Hash of msg as hex character string.
     */
    value: function hash(msg, options) {
      console.log('Sha is here ;) ');
      var defaults = { msgFormat: 'string', outFormat: 'hex' };
      var opt = Object.assign(defaults, options);

      // note use throughout this routine of 'n >>> 0' to coerce Number 'n' to unsigned 32-bit integer

      switch (opt.msgFormat) {
        default: // default is to convert string to UTF-8, as SHA only deals with byte-streams
        case 'string':
          msg = utf8Encode(msg);break;
        case 'hex-bytes':
          msg = hexBytesToString(msg);break; // mostly for running tests
      }

      // constants [§4.2.2]
      var K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

      // initial hash value [§5.3.3]
      var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];

      // PREPROCESSING [§6.2.1]

      msg += String.fromCharCode(0x80); // add trailing '1' bit (+ 0's padding) to string [§5.1.1]

      // convert string msg into 512-bit blocks (array of 16 32-bit integers) [§5.2.1]
      var l = msg.length / 4 + 2; // length (in 32-bit integers) of msg + ‘1’ + appended length
      var N = Math.ceil(l / 16); // number of 16-integer (512-bit) blocks required to hold 'l' ints
      var M = new Array(N); // message M is N×16 array of 32-bit integers

      for (var i = 0; i < N; i++) {
        M[i] = new Array(16);
        for (var j = 0; j < 16; j++) {
          // encode 4 chars per integer (64 per block), big-endian encoding
          M[i][j] = msg.charCodeAt(i * 64 + j * 4 + 0) << 24 | msg.charCodeAt(i * 64 + j * 4 + 1) << 16 | msg.charCodeAt(i * 64 + j * 4 + 2) << 8 | msg.charCodeAt(i * 64 + j * 4 + 3) << 0;
        } // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
      }
      // add length (in bits) into final pair of 32-bit integers (big-endian) [§5.1.1]
      // note: most significant word would be (len-1)*8 >>> 32, but since JS converts
      // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
      var lenHi = (msg.length - 1) * 8 / Math.pow(2, 32);
      var lenLo = (msg.length - 1) * 8 >>> 0;
      M[N - 1][14] = Math.floor(lenHi);
      M[N - 1][15] = lenLo;

      // HASH COMPUTATION [§6.2.2]

      for (var _i = 0; _i < N; _i++) {
        var W = new Array(64);

        // 1 - prepare message schedule 'W'
        for (var t = 0; t < 16; t++) {
          W[t] = M[_i][t];
        }for (var _t = 16; _t < 64; _t++) {
          W[_t] = Sha256.σ1(W[_t - 2]) + W[_t - 7] + Sha256.σ0(W[_t - 15]) + W[_t - 16] >>> 0;
        }

        // 2 - initialise working variables a, b, c, d, e, f, g, h with previous hash value
        var a = H[0],
            b = H[1],
            c = H[2],
            d = H[3],
            e = H[4],
            f = H[5],
            g = H[6],
            h = H[7];

        // 3 - main loop (note '>>> 0' for 'addition modulo 2^32')
        for (var _t2 = 0; _t2 < 64; _t2++) {
          var T1 = h + Sha256.Σ1(e) + Sha256.Ch(e, f, g) + K[_t2] + W[_t2];
          var T2 = Sha256.Σ0(a) + Sha256.Maj(a, b, c);
          h = g;
          g = f;
          f = e;
          e = d + T1 >>> 0;
          d = c;
          c = b;
          b = a;
          a = T1 + T2 >>> 0;
        }

        // 4 - compute the new intermediate hash value (note '>>> 0' for 'addition modulo 2^32')
        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
        H[5] = H[5] + f >>> 0;
        H[6] = H[6] + g >>> 0;
        H[7] = H[7] + h >>> 0;
      }

      // convert H0..H7 to hex strings (with leading zeros)
      for (var _h = 0; _h < H.length; _h++) {
        H[_h] = ('00000000' + H[_h].toString(16)).slice(-8);
      } // concatenate H0..H7, with separator if required
      var separator = opt.outFormat == 'hex-w' ? ' ' : '';

      return H.join(separator);

      /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

      function utf8Encode(str) {
        try {
          return new TextEncoder().encode(str, 'utf-8').reduce(function (prev, curr) {
            return prev + String.fromCharCode(curr);
          }, '');
        } catch (e) {
          // no TextEncoder available?
          return unescape(encodeURIComponent(str)); // monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
        }
      }

      function hexBytesToString(hexStr) {
        // convert string of hex numbers to a string of chars (eg '616263' -> 'abc').
        var str = hexStr.replace(' ', ''); // allow space-separated groups
        return str == '' ? '' : str.match(/.{2}/g).map(function (byte) {
          return String.fromCharCode(parseInt(byte, 16));
        }).join('');
      }
    }

    /**
     * Rotates right (circular right shift) value x by n positions [§3.2.4].
     * @private
     */

  }, {
    key: 'ROTR',
    value: function ROTR(n, x) {
      return x >>> n | x << 32 - n;
    }

    /**
     * Logical functions [§4.1.2].
     * @private
     */

  }, {
    key: '\u03A30',
    value: function _(x) {
      return Sha256.ROTR(2, x) ^ Sha256.ROTR(13, x) ^ Sha256.ROTR(22, x);
    }
  }, {
    key: '\u03A31',
    value: function _(x) {
      return Sha256.ROTR(6, x) ^ Sha256.ROTR(11, x) ^ Sha256.ROTR(25, x);
    }
  }, {
    key: '\u03C30',
    value: function _(x) {
      return Sha256.ROTR(7, x) ^ Sha256.ROTR(18, x) ^ x >>> 3;
    }
  }, {
    key: '\u03C31',
    value: function _(x) {
      return Sha256.ROTR(17, x) ^ Sha256.ROTR(19, x) ^ x >>> 10;
    }
  }, {
    key: 'Ch',
    value: function Ch(x, y, z) {
      return x & y ^ ~x & z;
    } // 'choice'

  }, {
    key: 'Maj',
    value: function Maj(x, y, z) {
      return x & y ^ x & z ^ y & z;
    } // 'majority'

  }]);

  return Sha256;
}();

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

// if (typeof module !== 'undefined' && module.exports) module.exports = Sha256 // ≡ export default Sha256


exports.default = Sha256;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _exports = module.exports = {};

var defaultValue = true;

var homePageDefaultValues2 = {
  newsElementClass: 'homepage-news-element',
  newsTitleClass: 'homepage-news-title'
};

var homePageDefaultValues = {
  newsElementClass: 'blog-article',
  newsTitleClass: 'article-title'
};

var newsPageDefaultValues = {
  newsTitleClass: ''
};

_exports.getNewsItems = function (documentObj) {
  return documentObj.getElementsByClassName(homePageDefaultValues.newsElementClass);
};

_exports.getTitleElement = function (parent) {
  if (window.location.href.toString().includes('campus-community')) {
    console.log('Getting By Tag nameeee');
    return parent.getElementsByClassName('main-content')[0].getElementsByClassName('container')[0].getElementsByClassName('row')[0].getElementsByTagName('h1')[0].innerHTML;
  } else {
    return parent.getElementsByClassName(homePageDefaultValues.newsTitleClass)[0].innerText;
  }
};

_exports.cleanTitle = function (title) {
  return title.replace(/\W/g, '').toLowerCase();
};

/*

document.getElementsByClassName("main-content")[0].getElementsByClassName("container")[0].getElementsByClassName("row")[0].getElementsByTagName("h1")[0].innerHTML

window.location.href.toString().includes("campus-community")
*/

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _exports = module.exports = {};

_exports.createViewReviewsModal = function (title, claimBodyId) {
  var html = '';
  html += "  <div class='modal-dialog'>";
  html += '    <!-- Modal content-->';
  html += "    <div class='modal-content'>";
  html += "      <div class='modal-header'>";
  html += "        <button type='button' class='close' data-dismiss='modal'>&times;</button>";
  html += "        <h4 class='modal-title'>'" + title + "'</h4>";
  html += '      </div>';
  html += "      <div class='modal-body' id='" + claimBodyId + "'>";
  html += '        <p>The title induces the reader in error</p>';
  html += '        <p> Science cuts two ways, of course; Clearly suggests there is another way</p>';
  html += '      </div>';
  html += "      <div class='modal-footer'>";
  html += "        <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>";
  html += '      </div>';
  html += '    </div>';
  html += '';
  html += '  </div>';

  return html;
};

_exports.createClaimModal = function (funcCall) {
  var html = '';
  html += "       <div class='modal-dialog modal-lg'>";
  html += '         <!-- Modal content-->';
  html += "         <div class='modal-content'>";
  html += "           <div class='modal-header'>";
  html += "             <button type='button' class='close' data-dismiss='modal'>&times;</button>";
  html += "             <h4 class='modal-title'>Review Article's Title</h4>";
  html += '           </div>';
  html += "           <div class='modal-body'>";
  html += '             <form>';
  html += "               <div class='form-group'>";
  html += "                 <label for='claim'>Claim:</label>";
  html += "                 <input type='text' class='form-control' id='claim'>";
  html += '               </div>';
  html += "               <button type='button' class='btn btn-default' onclick=" + funcCall + '>Submit</button>';
  html += "               <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>";
  html += '             </form>';
  html += '           </div>';
  html += "           <div class='modal-footer'>";
  html += '           </div>';
  html += '         </div>';
  html += '       </div>';

  return html;
};

_exports.createGenerateClaimButton = function (articleId) {
  var html = '';

  html += "            <div class='row'>";
  html += "              <button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#generate-claim-modal-" + articleId + "'>Contest the Title</button>";
  html += '            </div>';

  return html;
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {"serverAddress":"http://146.193.41.153:8092/","_serverAddress":"http://localhost:8092/"}

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _sha = __webpack_require__(0);

var _sha2 = _interopRequireDefault(_sha);

var _hypercertsParser = __webpack_require__(1);

var _hypercertsParser2 = _interopRequireDefault(_hypercertsParser);

var _elementsGenerator = __webpack_require__(2);

var _elementsGenerator2 = _interopRequireDefault(_elementsGenerator);

var _serverConfig = __webpack_require__(3);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverAddress = _serverConfig2.default['serverAddress'];

var articleId = '';

function generateArticleId() {
  var title = _hypercertsParser2.default.getTitleElement(document);
  var strippedTitle = title.replace(/\W/g, '').toLowerCase();
  articleId = _sha2.default.hash(strippedTitle);
}

function createGenerateClaimButton() {
  var buttonDiv = document.createElement('div');
  var buttonDivId = 'generate-claim-button' + articleId;
  buttonDiv.id = buttonDivId;
  buttonDiv.class = 'container';
  document.getElementsByTagName('article')[0].appendChild(buttonDiv);

  document.getElementById(buttonDivId).innerHTML = _elementsGenerator2.default.createGenerateClaimButton(articleId);
}

function createGenerateClaimModal() {
  var modalDiv = document.createElement('div');
  var modalId = 'generate-claim-modal-' + articleId;
  modalDiv.id = modalId;
  modalDiv.setAttribute('class', 'modal fade');
  modalDiv.setAttribute('role', 'dialog');

  var articleIdS = 'clickClaims("' + articleId + '")';

  var funcCall = 'sendMessage(document.getElementById("claim").value)';

  modalDiv.innerHTML = _elementsGenerator2.default.createClaimModal(funcCall);

  document.body.appendChild(modalDiv);
}

function sendMessage(name) {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      alert(this.responseText);
      console.log(this.response);
    }
  });

  var claim = name;
  var request = serverAddress + 'verify?claim=' + claim + '&article=' + articleId;
  xhr.open('GET', request);
  xhr.setRequestHeader('content-type', 'application/javascript');

  xhr.send(data);
}

window.sendMessage = sendMessage;

generateArticleId();
createGenerateClaimModal();
createGenerateClaimButton();

/***/ })
/******/ ]);
//# sourceMappingURL=newspage.bundle.js.map