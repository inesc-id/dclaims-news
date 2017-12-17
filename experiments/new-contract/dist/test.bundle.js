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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(1);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.getClaimsList('aabb').then(console.log);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports;
/*
const ABI = [
  {
    'constant': true,
    'inputs': [
      {
        'name': 'articleId',
        'type': 'bytes32'
      }
    ],
    'name': 'getIpfsLink',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'bytes32'
      }
    ],
    'name': 'bigList',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'articleId',
        'type': 'bytes32'
      },
      {
        'name': 'ipfsLink',
        'type': 'string'
      }
    ],
    'name': 'setIpfsLink',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
]
*/

var ABI = [{
  'constant': true,
  'inputs': [{
    'name': '',
    'type': 'bytes32'
  }, {
    'name': '',
    'type': 'uint256'
  }],
  'name': 'newList',
  'outputs': [{
    'name': 'issuer',
    'type': 'address'
  }, {
    'name': 'ipfsLink',
    'type': 'string'
  }, {
    'name': 'revoked',
    'type': 'bool'
  }],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function'
}, {
  'constant': true,
  'inputs': [{
    'name': 'articleId',
    'type': 'bytes32'
  }],
  'name': 'getIpfsLink',
  'outputs': [{
    'name': '',
    'type': 'string'
  }],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function'
}, {
  'constant': true,
  'inputs': [{
    'name': 'articleId',
    'type': 'bytes32'
  }],
  'name': 'getClaimsListSize',
  'outputs': [{
    'name': '',
    'type': 'uint256'
  }],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function'
}, {
  'constant': true,
  'inputs': [{
    'name': 'articleId',
    'type': 'bytes32'
  }, {
    'name': 'claimIndex',
    'type': 'uint256'
  }],
  'name': 'getClaim',
  'outputs': [{
    'name': '',
    'type': 'address'
  }, {
    'name': '',
    'type': 'string'
  }, {
    'name': '',
    'type': 'bool'
  }],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function'
}, {
  'constant': true,
  'inputs': [{
    'name': '',
    'type': 'bytes32'
  }],
  'name': 'bigOldList',
  'outputs': [{
    'name': '',
    'type': 'string'
  }],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function'
}, {
  'constant': false,
  'inputs': [{
    'name': 'articleId',
    'type': 'bytes32'
  }, {
    'name': 'ipfsLink',
    'type': 'string'
  }],
  'name': 'issueClaim',
  'outputs': [],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'constant': false,
  'inputs': [{
    'name': 'articleId',
    'type': 'bytes32'
  }, {
    'name': 'ipfsLink',
    'type': 'string'
  }],
  'name': 'setIpfsLink',
  'outputs': [],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function'
}];

// const CONTRACT_ADDRESS = '0x40a45F57D67ce54F19dD1f6b3b9F723b4eE6Ff30'
var CONTRACT_ADDRESS = '0x22913e635e15356dfdb3ef50806fd58154464b7a';

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  console.alert('You need to have a Web3 provider. Try Metamask.');
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var HypercertsContract = web3.eth.contract(ABI);

var HypercertsInstance = HypercertsContract.at(CONTRACT_ADDRESS);

exports.getClaimsListCount = function (key) {
  return new Promise(function (resolve, reject) {
    HypercertsInstance.getClaimsListSize.call(key, function (error, result) {
      if (!error) {
        // console.log(result)
        resolve(result);
      } else {
        console.error(error);
        reject(error);
      }
    });
  });
};

exports.getClaim = function (key, index) {
  return new Promise(function (resolve, reject) {
    HypercertsInstance.getClaim.call(key, index, function (error, result) {
      if (!error) {
        // console.log(result)
        resolve(result);
      } else {
        console.error(error);
        reject(error);
      }
    });
  });
};

exports.getClaimsList = function (key) {
  return new Promise(function (resolve, reject) {
    var claimsList = [];
    exports.getClaimsListCount(key).then(function (value) {
      var ps = [];
      for (var i = 0; i < value; i++) {
        ps.push(exports.getClaim(key, i));
      }
      Promise.all(ps).then(function (results) {
        console.log('---- RES ----');
        console.log(results); // Result of all resolve as an array
        for (var j = 0; j < results.length; j++) {
          var claim = {};
          claim.issuer = results[j][0];
          claim.ipfsLink = results[j][1];
          claim.revoked = results[j][2];

          claimsList.push(claim);
        }
        resolve(claimsList);
      }).catch(function (err) {
        return console.log(err);
      }); // First rejected promise
    });
  });
};

exports.storeItem = function (key, item) {
  return new Promise(function (resolve, reject) {
    HypercertsInstance.setIpfsLink(key, item, function (error, result) {
      if (!error) {
        console.log(result);
        resolve(result);
      } else {
        console.error(error);
        reject(error);
      }
    });
  });
};

exports.getItemFromStorage = function (key) {
  return new Promise(function (resolve, reject) {
    HypercertsInstance.getIpfsLink.call(key, function (error, result) {
      if (!error) {
        console.log(result);
        resolve(result);
      } else {
        console.error(error);
        reject(error);
      }
    });
  });
};

/***/ })
/******/ ]);
//# sourceMappingURL=test.bundle.js.map