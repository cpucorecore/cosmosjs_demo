let { bech32, bech32m } = require('bech32')

const dipBech32Addr = 'abcdef1qpzry9x8gf2tvdw0s3jn54khce6mua7lmqqqxw';

const res = bech32.decode(dipBech32Addr);
console.log(res.words);