## Hypercerts-Core

The Hypercerts-Web-Extension uses the Hypercerts-Core to store and retrieve claims.
This project uses the [IPFS-Go](https://github.com/ipfs/go-ipfs) implementation (due to the requirement of content discovery) so it requires an IPFS daemon to be executed on a machine. 
**Note: This machine can be the same one in which the browser extension is running.**

## Usage
```sh
> cd src/hypercerts-core
> npm install
> node app.js
```
