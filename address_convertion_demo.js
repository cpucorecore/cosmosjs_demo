const {ConvertToDipAddress, Eip55AddressFromBech32Address} = require('./address_tools')

// 'dip1k6xw0p6uy50l7c29x37yh89nrpqn257yh35fr7' == '0xb68cE7875c251fFF6145347C4B9cb318413553C4'

// dip bech32 address --> eip55 address
console.log(Eip55AddressFromBech32Address('dip1k6xw0p6uy50l7c29x37yh89nrpqn257yh35fr7'));

// eip55 address --> dip bech32 address
console.log(ConvertToDipAddress('0xb68cE7875c251fFF6145347C4B9cb318413553C4'));
