'use strict'

const ipfsAPI = require('ipfs-api')
const OrbitDB = require('orbit-db')

console.log('Starting...')

var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

// const userId = Math.floor(Math.random() * 1000)
const userId = 1111
const orbitdb = new OrbitDB(ipfs, userId)
const db = orbitdb.kvstore('|hypercerts-test-kv')

db.set('volume', '100')
  .then(() => {
    console.log(db.get('volume'))
    // 100
  })
