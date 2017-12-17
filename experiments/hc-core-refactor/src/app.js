import Core from './hc-core.js'
import datIPFS from './ipfsstorage.js'

// I'm at the point where I realised there is no FS library in the browser,
// and need to change the way files are added to IPFS
datIPFS.addItem('12345', 'claim:hello')
