# Sample solidity code

solidity/ contains a sample cloned from solidity-template (not sure this was a good idea, but it's how I started).
web3/ contains some npm code that users ethers to interact with a hardhat instance run by solidity/

## How to compile and run

```
cd solidity
yarn compile
yarn run-node
yarn deploy --greeting "fish"
cd ../web3
# In one terminal
webpack --mode development --watch
# In another ..
yarn webpack-dev-server --mode development
```

## Setup notes

- You need to set the local network in metamask to be 31337, http://127.0.0.1:8545/
 - When you restart hardhat, metamask won't restart its nonce counter, and you'll get a nonce too high error.
   Hit "Reset account" in metamask to fix this.
   This is the cause of mysterious "you can't do this" errors when calling smart contracts.

## References

- See
 https://stackoverflow.com/questions/68814078/how-do-i-add-ether-to-my-localhost-metamask-wallet-with-hardhat
 

