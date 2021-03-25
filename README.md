# dippernetwork js sdk demos
setup env:
``` shell
# https://docs.dippernetwork.com/get-started/install.html
dipcli rest-server
```

## address convertion between bech32 address and eip55 address
see address_tools.js
```shell
node address_convertion_demo.js
```


## send coin
```shell
node send_coin.js
```

## contract deploy without params
```shell
node contract_deploy.js
```

## contract deploy with params
```shell
node contract_deploy_with_params.js
```

## contract call without params
```shell
node contract_call.js
```

## contract call with params
```shell
node contract_call_with_params.js
```

## contract query without params
use web3.eth.abi to decode contract query result, reference:
https://web3js.readthedocs.io/en/v1.3.4/web3-eth-abi.html#decodeparameters

```shell
node contract_query.js
```

## contract query with params
use web3.eth.abi to decode contract query result, reference:
https://web3js.readthedocs.io/en/v1.3.4/web3-eth-abi.html#decodeparameters

```shell
node contract_query_with_params.js
```
