import React, { useEffect, useState } from "react";
import ConstructorArguments from "./ConstructorArgs";
import { deploy } from "../functionality/deployContract";
import { useAccount, useProvider, useTransaction } from "wagmi";
import { storeContract } from "@/functionality/storeData";
import { Contract, Wallet } from "ethers";
import { Registery_ABI, Registery_address } from "@/constants/constants";
import { explorerLink } from "@/constants/constants";
import { firebaseApi } from "@/services/firebaseApi";
import { useToast } from "@chakra-ui/react";
const private_key: any = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const Code = () => {
  const { createItem } = firebaseApi();
  const { address } = useAccount();
  const provider = useProvider();
  const toast = useToast();

  const [contractName, setContractName] = useState<string>("");
  const [sourceCode, setSourceCode] = useState<string>();
  const [output, setOutput] = useState<{ abi: any[]; bytecode: string }>();

  const [contractAddress, setContractAddress] = useState<string>();
  const [error, setError] = useState<string>();

  const [compiled, setCompiled] = useState<Boolean>(false);
  const [ipfsLink, setIpfsLink] = useState<string>();

  const manager_wallet = new Wallet(private_key, provider);
  const registery_contract = new Contract(
    Registery_address,
    Registery_ABI,
    manager_wallet
  );

  async function handleCompile() {
    if (!sourceCode) {
      toast({
        title: "No source code",
        description:
          "You need to provide source code to perform compilation!!!",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const response = await fetch("./api/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sourceCode }),
    });

    console.log(response);
    const formattedResponse = (await response.json()).output;

    if (response.status == 200) {
      setOutput(formattedResponse);
      toast({
        title: "Compilation successfull",
        description:
          "Your code was compiled succesfully, You can deploy your contract now.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setError("Successfully Compiled");

      setCompiled(true);
    } else {
      setError(formattedResponse);
      toast({
        title: "Compilation error",
        description: `${formattedResponse}`,
        status: "error",
        duration: 2700,
        isClosable: true,
      });
    }
  }

  async function verifyContract() {
    if (!output && !contractAddress) {
      toast({
        title: "Contract Not Compiled OR Deployed!!!",
        description: `This contract is either not deployed or compiled, which is necessary for contract verification`,
        status: "error",
        duration: 2800,
        isClosable: true,
      });
      setError("Compile & Deploy the Contract first");
      return;
    }

    const contractData = {
      name: contractName,
      address: contractAddress,
      deployer: address,
      abi: output?.abi,
      bytecode: output?.bytecode,
      code: sourceCode,
    };

    toast({
      title: "Uploading to IPFS...",
      status: "loading",
      duration: 2000,
      isClosable: true,
    });
    const CID = await storeContract(contractData);
    const IPFSURL = `https://w3s.link/ipfs/${CID}`;
    console.log(IPFSURL, "IPFSURL");

    console.log({
      address: contractAddress,
      IPFSURL: IPFSURL,
    });

    await createItem({
      address: contractAddress,
      IPFSURL: IPFSURL,
    });

    console.log(":D");

    setIpfsLink(IPFSURL);
    toast({
      title: "IPFS URL",
      description: `${IPFSURL}`,
      status: "success",
      duration: 2800,
      isClosable: true,
    });

    toast({
      title: `Record Added in the Registry: ${contractAddress}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <p className="text-center text-white font-bold text-xl text-skin-base my-4 leading-tight tracking-tighter mb-6 lg:tracking-normal">
        Enter the contract address
      </p>
      <input
        className="w-8/12 sm:w-6/12 mb-10 px-5 py-3 bg-gray-900 text-white text-xl rounded-xl"
        type="text"
        id=""
        onChange={(e) => {
          setContractAddress(e.target.value);
        }}
      />
      <h1 className="text-white font-bold text-xl text-skin-base my-4 leading-tight tracking-tighter mb-6 lg:tracking-normal">
        Paste the contract code here
      </h1>
      <textarea
        onChange={(e) => setSourceCode(e.target.value)}
        className="w-8/12 sm:w-6/12 h-[70vh] mb-10 p-10 bg-gray-900 text-white text-xl rounded-2xl"
      />{" "}
      <div className="flex items-center justify-between flex-col sm:flex-row">
        <button
          onClick={() => handleCompile()}
          className="sm:px-4 py-2 animate-text text-2xl bg-emerald-800 hover:bg-[#A7F3D0] text-black rounded-lg"
        >
          Compile
        </button>
        {compiled && (
          <button
            onClick={() => verifyContract()}
            className="sm:px-4 py-2 animate-text text-2xl bg-emerald-800 hover:bg-[#A7F3D0] text-black rounded-lg"
          >
            Verify
          </button>
        )}
      </div>
    </div>
  );
};

export default Code;
