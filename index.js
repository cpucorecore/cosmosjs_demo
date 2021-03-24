const cosmosjs = require("@cosmostation/cosmosjs");

const testContract = require('./contract.json');
const Web3 = require('web3');
web3 = new Web3('http://localhost:1317');
const contract = new web3.eth.Contract(testContract.abi);
const tx = contract.deploy({
    data:testContract.bytecode
});

console.log(tx.encodeABI());

const payload = tx._deployData;

const chainId = "abc";
const dippernetwork = cosmosjs.network('http://localhost:1317', chainId);
dippernetwork.setBech32MainPrefix('dip')
dippernetwork.setPath("m/44'/925'/0'/0/0");

const mnemonic = "ribbon tuition permit noodle basic oblige torch undo cushion salt logic anger hobby way scene coyote success unable entire myth south cradle order mercy";
const address = dippernetwork.getAddress(mnemonic);
const ecpairPriv = dippernetwork.getECPairPriv(mnemonic);

dippernetwork.getAccounts(address).then(data => {
    let stdSignMsg = dippernetwork.newStdMsg({
        msgs: [
            {
                type: "dip/MsgContract",
                value: {
                    amount: {
                        amount: String(0),
                        denom: "pdip"
                    },
                    from: address,
                    to: "",
                    payload: payload.slice(2)
                }
            }
        ],
        chain_id: chainId,
        fee: { amount: [ { amount: String(10000000000000), denom: "pdip" } ], gas: String(200000) },
        memo: "",
        account_number: data.result.value.account_number,
        sequence: data.result.value.sequence
    });

    // const signedTx = dippernetwork.sign(stdSignMsg, ecpairPriv);
    // dippernetwork.broadcast(signedTx).then(response => {
    //     console.log(response);
    // });
})


const clientMethods = contract.methods;
/////////////// contract call ////////////////
const axios = require('axios');
const queryAPI = 'http://localhost:1317/vm/estimate_gas'
const pay = clientMethods.i().encodeABI()
console.log(pay);
const msg = {
    amount: {
        amount: String(0),
        denom: "pdip"
    },
    from: address,
    to: "dip1qefsdxntskrzk3qvdfuqu7q0v3fltx73rpvyht",
    payload: pay.slice(2)
}

axios.post(queryAPI, msg)
    .then(res=> {
        console.log(res.data.result.Res);
    })
    .catch(error =>{
        console.error(error)
    })

/////////////// contract send ////////////////
const payload1 = clientMethods.PlusX(1).encodeABI();
console.log(payload1);