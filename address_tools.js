let { bech32, bech32m } = require('bech32')
let eip55 = require('eip55')

function Eip55AddressFromBech32Address(bech32Addr) {
    return eip55.encode(AddressBytesFromBech32(bech32Addr).toString('hex'));
}

function AddressBytesFromBech32(bech32Addr) {
    const res = bech32.decode(bech32Addr);
    return convertBits(res.words, 5, 8, false);
}

function convertBits(data, fromBits, toBits, padding) {
    let acc = 0
    let bits = 0
    let result = []
    let maxV = (1 << toBits) - 1
    for (let p = 0; p < data.length; ++p) {
        let value = data[p]
        if (value < 0 || value >>> fromBits !== 0) {
            return null
        }
        acc = acc << fromBits | value
        bits += fromBits
        while (bits >= toBits) {
            bits -= toBits
            result.push(acc >>> bits & maxV)
        }
    }
    if (padding) {
        if (bits > 0) {
            result.push(acc << toBits - bits & maxV)
        }
    } else if (bits >= fromBits || acc << toBits - bits & maxV) {
        return null
    }
    return Buffer.from(result)
}

module.exports = { Eip55AddressFromBech32Address, AddressBytesFromBech32, convertBits }