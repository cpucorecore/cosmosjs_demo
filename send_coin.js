const cosmosjs = require("@cosmostation/cosmosjs");
const axios = require('axios');

// setup cosmosjs instance
const chainId = "abc";
const url = 'http://localhost:1317';
const dippernetwork = cosmosjs.network(url, chainId);
dippernetwork.setBech32MainPrefix('dip')
dippernetwork.setPath("m/44'/925'/0'/0/0");

// import account by mnemonic
const mnemonic = "ribbon tuition permit noodle basic oblige torch undo cushion salt logic anger hobby way scene coyote success unable entire myth south cradle order mercy";
const address = dippernetwork.getAddress(mnemonic);
const ecpairPriv = dippernetwork.getECPairPriv(mnemonic);

const toAddress = 'dip1k6xw0p6uy50l7c29x37yh89nrpqn257yh35fr7';

dippernetwork.getAccounts(address).then(data => {
    let stdSignMsg = dippernetwork.newStdMsg({
        msgs: [
            {
                type: "dip/MsgSend",
                value: {
                    amount: [
                        {
                            amount: String(1000000000000000),
                            denom: "pdip"
                        }
                    ],
                    from_address: address,
                    to_address: toAddress,
                }
            }
        ],
        chain_id: chainId,
        fee: { amount: [ { amount: String(10000000000000), denom: "pdip" } ], gas: String(500000) },
        memo: "",
        account_number: data.result.value.account_number,
        sequence: data.result.value.sequence
    });

    // signing transaction
    const signedTx = dippernetwork.sign(stdSignMsg, ecpairPriv);

    // broadcast transaction to blockchain
    dippernetwork.broadcast(signedTx).then(response => {
        console.log(response);

        // query transaction result after 5 seconds
        const txQueryUrl = url + '/txs/' + response.txhash.toString();
        setTimeout(()=>{
            axios.get(txQueryUrl).then(res=>{
                console.log(res);
            })
        }, 5000);
    });
})
