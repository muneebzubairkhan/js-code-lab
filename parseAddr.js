const removeDuplicates = true;

// dependencies
const fs = require('fs');

// input
const data = fs.readFileSync('ethAddressesIn.txt', 'utf8');

// read only the addresses from file
let addresses = data.match(/(\b0x[a-fA-F0-9]{40}\b)/g);
const addrLen = addresses.length;

// remove duplicates
if (removeDuplicates) {
  let betterRes = {};
  addresses.map(a => (betterRes[a.toLowerCase()] = true));
  addresses = Object.keys(betterRes);
}


console.log(JSON.stringify(addresses, null, 4).replaceAll("\n", "").replaceAll("   ", ""));
// console.log(JSON.stringify(addresses, null, 4));
// output
// fs.writeFile(
//   'ethAddressesOut.txt',
//   `total addresses were: ${addrLen}
//   ${addresses.length} 'unique addresses were found. Thanks to Allah.'
  
//   ${addresses}`,
//   e => e && console.log(e.message),
// );
