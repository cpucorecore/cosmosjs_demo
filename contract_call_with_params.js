const cosmosjs = require("@cosmostation/cosmosjs");
const testContract = require('./contracts/contractA.json');
const Web3 = require('web3');

const url = 'http://localhost:1317';
const chainId = "abc";

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const dippernetwork = cosmosjs.network(url, chainId);
dippernetwork.setBech32MainPrefix('dip')
dippernetwork.setPath("m/44'/925'/0'/0/0");

const mnemonic = "ribbon tuition permit noodle basic oblige torch undo cushion salt logic anger hobby way scene coyote success unable entire myth south cradle order mercy";
const address = dippernetwork.getAddress(mnemonic);
const ecpairPriv = dippernetwork.getECPairPriv(mnemonic);

web3 = new Web3(url);
const contract = new web3.eth.Contract(testContract.abi);
const clientMethods = contract.methods;

// execute: `node contract_deploy.js` to deploy contractA and get the deployed address
const contractAddress = 'dip18z2ww0grcwsc3z3eyupm2gjy0hk2x4w7lnuc65';

// call contractA.sol: PlusX(int256)
let payload = clientMethods.PlusX(1000).encodeABI();
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
                    to: contractAddress,
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

    const signedTx = dippernetwork.sign(stdSignMsg, ecpairPriv);
    dippernetwork.broadcast(signedTx).then(response => {
        console.log(response);
    });
});

// sleep 5 seconds manually
// call contractA.sol: PlusXY(int256, int256)
payload = clientMethods.PlusXY(1000, 10000).encodeABI();
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
                    to: contractAddress,
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

    const signedTx = dippernetwork.sign(stdSignMsg, ecpairPriv);
    dippernetwork.broadcast(signedTx).then(response => {
        console.log(response);
    });
});

// sleep 5 seconds manually
// call contractA.sol: PlusArray(int256, int256)
payload = clientMethods.PlusArray([1,2,3,4,5]).encodeABI();
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
                    to: contractAddress,
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

    const signedTx = dippernetwork.sign(stdSignMsg, ecpairPriv);
    dippernetwork.broadcast(signedTx).then(response => {
        console.log(response);
    });
});