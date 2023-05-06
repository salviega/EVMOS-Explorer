# EVMOS Explorer

EVMOS Explorer: [EVMOS] EVM Extensions Hackathon

EVMOS Explorer is a powerful and flexible tool that can help developers to work more effectively with Solidity smart contracts in EVMOS blockchain.

## Project Description:

EVMOS Explorer was created with the aim of enhancing the overall developer experience on the EVMOS blockchain. In order for EVMOS to gain widespread adoption, developers need to have a seamless and efficient experience when deploying, interacting with, and verifying smart contracts. EVMOS Explorer was designed with this goal in mind.

Explore: developers can effortlessly interact with their smart contracts simply by inputting their contract address. This saves time and effort as there's no need to go through a complex process to interact with the contract.

Deploy: simplifies the smart contract deployment process by handling the compilation and deployment for developers, freeing them from the tedious and lengthy process of creating an entire project. This also eliminates the need for users to export private keys or write scripts to deploy their smart contracts.

Verify: With just one click, developers can verify their previously deployed smart contracts.This quick and easy verification process saves valuable time and effort for developers.

## How it's Made:

EVMOS Explorer's frontend is developed using Next Application and features a visually appealing and user-friendly interface built using HTML, CSS, and Tailwind. The core logic of the platform is developed using Typescript and React to ensure a seamless user experience.

To compile the smart contract code written in Solidity, we use Solc Compiler. Contract deployment and interaction with the blockchain are facilitated using Ethers.js. We enable wallet connection with EVMOS Testnet through the use of Wagmi and Rainbowkit.

To store the contract data, we use IPFS via the Web3.storage service. The IPFS CIDs of the contracts are then indexed in Firebase for easy access and retrieval.

### VIdeo

Video url: xxx

### Vercel deploy

Vercel url: https://evmos-explorer.vercel.app/

## Quick start 🏄

Prerequisites: [Node (v16 LTS)](https://nodejs.org/en/download/) and [Git](https://git-scm.com/downloads)

> Clone the repository:

```
git clone https://github.com/salviega/EVMOS-Explorer.git
```

> Install dependencies:

```
yarn
```

> Run the project:

```
yarn dev
```

## Authors 🏗

[salviega](https://github.com/salviega)

[sheva323](https://github.com/sheva323)