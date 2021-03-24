const cosmosjs = require("@cosmostation/cosmosjs");
const contractA = require('./contracts/contractA.json');
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
                    payload: contractA.bytecode.slice(2)
                }
            }
        ],
        chain_id: chainId,
        fee: { amount: [ { amount: String(10000000000000), denom: "pdip" } ], gas: String(500000) },
        memo: "",
        account_number: data.result.value.account_number,
        sequence: data.result.value.sequence
    });

    const signedTx = dippernetwork.sign(stdSignMsg, ecpairPriv);
    dippernetwork.broadcast(signedTx).then(response => {
        console.log(response);

        const txQueryUrl = url + '/txs/' + response.txhash.toString();
        setTimeout(()=>{
            axios.get(txQueryUrl).then(res=>{
                res.data.events.forEach((event, index, _) => {
                    if(event.type == 'contract_created') {
                        event.attributes.forEach((attr, i, _) => {
                            console.log(attr.value);
                        })
                    }
                })
            })
        }, 5000);
    });
})
