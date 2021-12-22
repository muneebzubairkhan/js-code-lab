import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import { appendFile } from 'fs';
import { ethNodeLink } from './smart-contracts.js';

export const getAccount = async mnemonic => {
  const ethereum = new HDWalletProvider(mnemonic, ethNodeLink);
  const web3 = new Web3(ethereum);
  const account = (await web3.eth.getAccounts())[0];
  log(`send eth to ${account}`);
  return account;
};

export const getWeb3 = (mnemonic, nodeLink = ethNodeLink) => {
  const ethereum = new HDWalletProvider(mnemonic, nodeLink);
  return new Web3(ethereum);
};

// option 1
// export const log = text => {
//   console.log(text);
// };

// option 2
export const log = (text, newLinesBefore = 0) => {
  for (let i = 0; i < newLinesBefore; i++) text += '\n';

  text = time() + text;
  console.log(text);
  appendFile('out.txt', text + '\n', e => e && console.log(e.message));
};

export const time = () => ('' + new Date() + '').split('GMT')[0];
export const seconds = 1000;

/**
 * Wait transactions to be mined.
 *
 * Based on https://raw.githubusercontent.com/Kaisle/await-transaction-mined/master/index.js
 */

const DEFAULT_INTERVAL = 500;

const DEFAULT_BLOCKS_TO_WAIT = 0;

/**
 * Wait for one or multiple transactions to confirm.
 *
 * @param web3
 * @param txnHash A transaction hash or list of those
 * @param options Wait timers
 * @return Transaction receipt
 */
export function waitTransaction(web3, txnHash, options = null) {
  const interval =
    options && options.interval ? options.interval : DEFAULT_INTERVAL;
  const blocksToWait =
    options && options.blocksToWait
      ? options.blocksToWait
      : DEFAULT_BLOCKS_TO_WAIT;
  var transactionReceiptAsync = async function (txnHash, resolve, reject) {
    try {
      var receipt = web3.eth.getTransactionReceipt(txnHash);
      if (!receipt) {
        setTimeout(function () {
          transactionReceiptAsync(txnHash, resolve, reject);
        }, interval);
      } else {
        if (blocksToWait > 0) {
          var resolvedReceipt = await receipt;
          if (!resolvedReceipt || !resolvedReceipt.blockNumber)
            setTimeout(function () {
              transactionReceiptAsync(txnHash, resolve, reject);
            }, interval);
          else {
            try {
              var block = await web3.eth.getBlock(resolvedReceipt.blockNumber);
              var current = await web3.eth.getBlock('latest');
              if (current.number - block.number >= blocksToWait) {
                var txn = await web3.eth.getTransaction(txnHash);
                if (txn.blockNumber != null) resolve(resolvedReceipt);
                else
                  reject(
                    new Error(
                      'Transaction with hash: ' +
                        txnHash +
                        ' ended up in an uncle block.'
                    )
                  );
              } else
                setTimeout(function () {
                  transactionReceiptAsync(txnHash, resolve, reject);
                }, interval);
            } catch (e) {
              setTimeout(function () {
                transactionReceiptAsync(txnHash, resolve, reject);
              }, interval);
            }
          }
        } else resolve(receipt);
      }
    } catch (e) {
      reject(e);
    }
  };

  // Resolve multiple transactions once
  if (Array.isArray(txnHash)) {
    var promises = [];
    txnHash.forEach(function (oneTxHash) {
      promises.push(waitTransaction(web3, oneTxHash, options));
    });
    return Promise.all(promises);
  } else {
    return new Promise(function (resolve, reject) {
      transactionReceiptAsync(txnHash, resolve, reject);
    });
  }
}

/**
 * Check if the transaction was success based on the receipt.
 *
 * https://ethereum.stackexchange.com/a/45967/620
 *
 * @param receipt Transaction receipt
 */
export function isSuccessfulTransaction(receipt) {
  if (receipt.status == '0x1' || receipt.status == 1) {
    return true;
  } else {
    return false;
  }
}
