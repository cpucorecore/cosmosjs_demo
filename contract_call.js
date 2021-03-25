const cosmosjs = require("@cosmostation/cosmosjs");
const contractA = require('./contracts/contractA.json');
const Web3 = require('web3');

const url = 'http://localhost:1317';
const chainId = "abc";

// execute `node contract_deploy.js` to deploy contractA.sol
const contractAddress = 'dip16de7mlvzvzxgg2rjtzchcjfef0s6ydkdcxf302'

const dippernetwork = cosmosjs.network(url, chainId);
dippernetwork.setBech32MainPrefix('dip')
dippernetwork.setPath("m/44'/925'/0'/0/0");

const mnemonic = "ribbon tuition permit noodle basic oblige torch undo cushion salt logic anger hobby way scene coyote success unable entire myth south cradle order mercy";
const address = dippernetwork.getAddress(mnemonic);
const ecpairPriv = dippernetwork.getECPairPriv(mnemonic);

web3 = new Web3(url);
const contract = new web3.eth.Contract(contractA.abi);
const clientMethods = contract.methods;
const payload = clientMethods.PlusOne().encodeABI();
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
