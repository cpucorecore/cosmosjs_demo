const cosmosjs = require("@cosmostation/cosmosjs");
const contractB = require('./contracts/contractB.json');
const Web3 = require('web3');
const axios = require('axios');
const addressTools = require('./address_tools');

const url = 'http://localhost:1317';
const queryAPI = 'http://localhost:1317/vm/estimate_gas'
const chainId = "abc";

// execute `node contract_deploy_with_params.js` to deploy contractA.sol
const contractAddress = 'dip13pl60da3pxcpzvdasnke3de3etpqql6su0uxrr'

web3 = new Web3(url);
const contract = new web3.eth.Contract(contractB.abi);
const clientMethods = contract.methods;

const dippernetwork = cosmosjs.network(url, chainId);
dippernetwork.setBech32MainPrefix('dip')
dippernetwork.setPath("m/44'/925'/0'/0/0");

const mnemonic = "ribbon tuition permit noodle basic oblige torch undo cushion salt logic anger hobby way scene coyote success unable entire myth south cradle order mercy";
const address = dippernetwork.getAddress(mnemonic);

const payload = clientMethods.admin().encodeABI()
const msg = {
    amount: {
        amount: String(0),
        denom: "pdip"
    },
    from: address,
    to: contractAddress,
    payload: payload.slice(2)
}

axios.post(queryAPI, msg)
    .then(res=> {
        console.log(res.data.result.Res);
        const decodedRes = web3.eth.abi.decodeParameter('address', res.data.result.Res);
        console.log(decodedRes);
        console.log(addressTools.ConvertToDipAddress(decodedRes));
    })
    .catch(error =>{
        console.error(error)
    });