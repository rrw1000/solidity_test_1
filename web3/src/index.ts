import { ethers } from "ethers";
const text : string = "hello world 2!";
const SIMPLE_TOKEN : string = "0xa27bC320252d51EEAA24BCCF6cc003979E485860";

document.querySelector("#demo-text").innerHTML = text;

if (typeof window.ethereum !== 'undefined') {
    console.log('Metamask is installed!')
}

class EthDriver {
    constructor() {
        let btn = document.getElementById('enableButton')
        let runBtn = document.getElementById('runButton')
        let transferButton = document.getElementById('transferButton')
        let balanceButton = document.getElementById('balanceButton')
        let tokenTransferButton = document.getElementById('tokenTransferButton')
        this.runResult = document.getElementById('runResult')
        this.transferResult = document.getElementById('transferResult')
        this.tokenBalance = document.getElementById('tokenBalanceResult')

        btn.addEventListener('click', (e:Event) => this.connectEther())
        runBtn.addEventListener('click', (e:Event) => this.runEther())
        transferButton.addEventListener('click', (e:Event) => this.runTransfer())
        balanceButton.addEventListener('click', (e:Event)=> this.getTokenBalance())
        tokenTransferButton.addEventListener('click', (e:Event) => this.sendToken())
    }

    runEther() {
        const ercabi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "tokenOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokens",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokens",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "_totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenOwner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "remaining",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokens",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenOwner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokens",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokens",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
            const abi =  [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "GreeterError",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "greet",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "greeting",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "throwError",
      "outputs": [],
      "stateMutability": "pure",
      "type": "function"
    }
        ];
        const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
        const tokenAddress = SIMPLE_TOKEN;
        //const contractInstance = new ethers.Contract(address, abi, window.provider)
        const tokenInstance = new ethers.Contract(tokenAddress, ercabi, window.signer)
        this.smartToken = tokenInstance
        window.smartToken = this.smartToken
        //window.provider.getCode(address).then((value) => console.log(value));
        //console.log(contractInstance)
        //contractInstance.greet().then( (value) => this.runResult.innerHTML = value );
        this.runResult.innerHTML = "Done";
    }

    getTokenBalance() {
        let otherAccount = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";
        this.smartToken.balanceOf(this.account).then( (value) =>
            { this.smartToken.balanceOf(otherAccount).then( (v2) =>
                this.tokenBalance.innerHTML = "Ours = " + value + " theirs = " + v2); }
                                                    );
    }

    connectEther() {
        const accountEl = document.getElementById('accountNumber')
        window.provider = new ethers.providers.Web3Provider(window.ethereum)
        window.provider.send("eth_requestAccounts", []).then( accounts =>
            {
                this.account = accounts[0];
                accountEl.innerHTML = this.account;
                window.signer = window.provider.getSigner()
                window.provider.getBlockNumber().then((result) => console.log(result));
            });
    }

    sendToken() {
        const otherAccount = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";
        this.smartToken.transfer(otherAccount, 1).then(
            (result) => this.getTokenBalance());
    }

    runTransfer() {
        const target = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";
        window.signer.sendTransaction( { to: target, value: ethers.utils.parseEther("1.0") } ).then(
            (result) => this.transferResult.innerHTML = result )
    }
}

new EthDriver();

console.log('hhh');
