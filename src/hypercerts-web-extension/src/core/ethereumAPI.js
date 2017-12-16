exports = module.exports

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
const CONTRACT_ADDRESS = '0x40a45F57D67ce54F19dD1f6b3b9F723b4eE6Ff30'

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
