import store from '../../store'
import Portis from "@portis/web3";
import Web3 from 'web3'

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

export let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', async function(dispatch) {
    var web3 = window.web3;

    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const mySKALEChain = {
      nodeUrl: process.env.SKALE_CHAIN,
      chainId: 1,
      nodeProtocol: 'rpc',
    };
    const portis = new Portis(process.env.PORTIS_ID, mySKALEChain);

    let web3Portis = new Web3(portis.provider);

    if (typeof web3 !== 'undefined') {


      resolve(store.dispatch(web3Initialized({
        web3Instance: web3,
        web3Portis: web3Portis,
        portis: portis
      })));

    } 
  })
})