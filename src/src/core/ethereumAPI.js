exports = module.exports

const ABI = [
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'bytes32'
      },
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'name': 'newList',
    'outputs': [
      {
        'name': 'issuer',
        'type': 'address'
      },
      {
        'name': 'ipfsLink',
        'type': 'string'
      },
      {
        'name': 'revoked',
        'type': 'bool'
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
        'name': 'articleId',
        'type': 'bytes32'
      }
    ],
    'name': 'getClaimsListSize',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
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
        'name': 'articleId',
        'type': 'bytes32'
      },
      {
        'name': 'claimIndex',
        'type': 'uint256'
      }
    ],
    'name': 'getClaim',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      },
      {
        'name': '',
        'type': 'string'
      },
      {
        'name': '',
        'type': 'bool'
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
    'name': 'bigOldList',
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
    'name': 'issueClaim',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
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

// const CONTRACT_ADDRESS = '0x40a45F57D67ce54F19dD1f6b3b9F723b4eE6Ff30'
// const CONTRACT_ADDRESS = '0x22913e635e15356dfdb3ef50806fd58154464b7a'
const CONTRACT_ADDRESS = '0x53abb1d321dd254eff936f0caee94effd4e10621'

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
    // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  console.alert('You need to have a Web3 provider. Try Metamask.')
}

web3.eth.defaultAccount = web3.eth.accounts[0]

var HypercertsContract = web3.eth.contract(ABI)

var HypercertsInstance = HypercertsContract.at(CONTRACT_ADDRESS)

exports.getClaimsListCount = function (key) {
  return new Promise(function (resolve, reject) {
    HypercertsInstance.getClaimsListSize.call(key, function (error, result) {
      if (!error) {
        // console.log(result)
        resolve(result)
      } else {
        console.error(error)
        reject(error)
      }
    })
  })
}

exports.getClaim = function (key, index) {
  return new Promise(function (resolve, reject) {
    HypercertsInstance.getClaim.call(key, index, function (error, result) {
      if (!error) {
        // console.log(result)
        resolve(result)
      } else {
        console.error(error)
        reject(error)
      }
    })
  })
}

exports.getClaimsList = function (key) {
  return new Promise(function (resolve, reject) {
    let claimsList = []
    exports.getClaimsListCount(key).then(value => {
      let ps = []
      for (let i = 0; i < value; i++) {
        ps.push(exports.getClaim(key, i))
      }
      Promise.all(ps)
    .then((results) => {
      for (let j = 0; j < results.length; j++) {
        let claim = {}
        claim.issuer = results[j][0]
        claim.ipfsLink = results[j][1]
        claim.revoked = results[j][2]

        claimsList.push(claim)
      }
      resolve(claimsList)
    }).catch(err => console.log(err))  // First rejected promise
    })
  })
}

exports.storeItem = function (key, item) {
  return new Promise(function (resolve, reject) {
    HypercertsInstance.setIpfsLink(key, item, function (error, result) {
      if (!error) {
        console.log(result)
        resolve(result)
      } else {
        console.error(error)
        reject(error)
      }
    })
  })
}

exports.getItemFromStorage = function (key) {
  return new Promise(function (resolve, reject) {
    HypercertsInstance.getIpfsLink.call(key, function (error, result) {
      if (!error) {
        console.log(result)
        resolve(result)
      } else {
        console.error(error)
        reject(error)
      }
    })
  })
}

exports.issueClaim = function (key, ipfsLink) {
  return new Promise(function (resolve, reject) {
    HypercertsInstance.issueClaim(key, ipfsLink, function (error, result) {
      if (!error) {
        resolve(true)
      } else {
        console.error(error)
        reject(error)
      }
    })
  })
}

exports.getUserId = function () {
  return new Promise(function (resolve, reject) {
    resolve(web3.eth.accounts[0])
  })
}
