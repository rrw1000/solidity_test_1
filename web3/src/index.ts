import { ethers } from "ethers";
const text : string = "hello world 2!";

document.querySelector("#demo-text").innerHTML = text;

if (typeof window.ethereum !== 'undefined') {
    console.log('Metamask is installed!')
}

class EthDriver {
    constructor() {
        let btn = document.getElementById('enableButton')
        let runBtn = document.getElementById('runButton')
        let transferButton = document.getElementById('transferButton')
        this.runResult = document.getElementById('runResult')
        this.transferResult = document.getElementById('transferResult')

        btn.addEventListener('click', (e:Event) => this.connectEther())
        runBtn.addEventListener('click', (e:Event) => this.runEther())
        transferButton.addEventListener('click', (e:Event) => this.runTransfer())
    }

    runEther() {
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
        const contractInstance = new ethers.Contract(address, abi, window.provider)
        //window.provider.getCode(address).then((value) => console.log(value));
        console.log(contractInstance)
        contractInstance.greet().then( (value) => this.runResult.innerHTML = value );
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

    runTransfer() {
        const target = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";
        window.signer.sendTransaction( { to: target, value: ethers.utils.parseEther("1.0") } ).then(
            (result) => this.transferResult.innerHTML = result )
    }
}

new EthDriver();

console.log('hhh');
