# Hypercerts

- João Santos' M.Sc Thesis
- Universidade de Lisboa, Instituto Superior Técnico
- 2017-2018
- Advisors: 
  - [Nuno Santos](http://www.gsd.inesc-id.pt/~nsantos/)
  - [David Dias](http://daviddias.me/)
  
Table of Contents
=================

   * [Hypercerts](#hypercerts)
      * [Project Description](#project-description)
      * [Project Structure](#project-structure)
         * [Hypercerts Web-Extension](#hypercerts-web-extension)
         * [Hypercerts-Core](#hypercerts-core)
         * [Hypercerts-Ethereum-mock](#hypercerts-ethereum-mock)
      * [Usage](#usage)

## Project Description

Hypercerts is a platform that enables a truly distributed and trustless way of managing claims about News articles.
Currently under development.

Using the Hypercerts-Web-Extension users can generate claims  (whose authenticity and integrity can be verified by anyone without the need of a third party) about any news article, and those claims can be presented to all other users. This all happens in a distributed and trustless form, with the use of [IPFS](https://ipfs.io) and [Ethereum](https://www.ethereum.org).

## Project Structure
Hypercerts is made of three main components. Hypercerts-Web-Extension, Hypercerts-Core and Hypercerts-Ethereum.
![](https://github.com/inesc-id/hypercerts-pm/blob/master/images/hc-arch2.jpg?raw=true)

## Usage
1. Install and configure IPFS
```sh
> npm install --save ipfs-api
# Show the ipfs config API port to check it is correct
> ipfs config Addresses.API
/ip4/127.0.0.1/tcp/5001
# Set it if it does not match the above output
> ipfs config Addresses.API /ip4/127.0.0.1/tcp/5001
# Restart the daemon after changing the config

# Run the daemon
> ipfs daemon
```
2. [Install and configure Metamask](https://metamask.io/)
3. Download `src/hypercerts-web-extension` and install it in Chrome:
  - Go to [`chrome://extensions`]
  - Check the `Developer Mode` box
  - Select `Load unpacked extension...` and chose the `src/hypercerts-web-extension` directory.
4. Download `src/hypercerts-web-extension` and install it in Chrome or Firefox.
5. Visit [https://tecnico.ulisboa.pt/en/news/](https://tecnico.ulisboa.pt/en/news/) to view claims.
6. Open a news article and to generate a claim press the `Generate Claim` button.

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
