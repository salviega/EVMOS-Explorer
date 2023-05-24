import { ContractFactory } from "ethers";
import { AbiCoder, defaultAbiCoder } from "ethers/lib/utils.js";

export async function compileContract(code) {
  var input = {
    language: "Solidity",
    sources: {
      "file.sol": {
        content: code,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  var output = JSON.parse(solc.compile(JSON.stringify(input)));

  for (var contractName in output.contracts["file.sol"]) {
    var response = {
      abi: output.contracts["file.sol"][contractName].abi, /// get the abi
      bytecode: `0x${output.contracts["file.sol"][contractName].evm.bytecode.object}`, // get the bytecode
    };
    return response;
  }
}

export async function encodeConArgs(types, values) {
  defaultAbiCoder.encode(types, values);
}

export async function deploy(bytecode, address, paramEncoded) {
  ethereum
    .request({
      method: "eth_sendTransaction",
      params: [
        {
          from: address,
          gas: "0x2DC6C0",
          data: bytecode + paramEncoded,
        },
      ],
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function deployViaEthers(bytecode, abi, signer, params) {
  const factory = new ContractFactory(abi, bytecode, signer);

  const contract = await factory.deploy(params);

  console.log(contract);

  return contract;
}

export async function deployContract() {
  const data = await compileContract(sourceCode);
  console.log(data);

  const txData = await deploy(data.bytecode);
  console.log(txData);
}
