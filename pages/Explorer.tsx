import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Input from '@/components/Input'
import ReturnedFunction from '@/components/ReturnedFunction'
import {
	analyzeABI,
	contractDataType,
	functionType
} from '@/functionality/analyzeABI'
import { Registery_ABI, Registery_address } from '@/constants/constants'
import { useAccount, useContract, useProvider } from 'wagmi'
import { explorerLink } from '@/constants/constants'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import ReturnedSourceCode from '@/components/ReturnedSourceCode'
import { firebaseApi } from '@/services/firebaseApi'

const private_key: any = process.env.NEXT_PUBLIC_PRIVATE_KEY

const Explorer = () => {
	const { getItemByAddress } = firebaseApi()
	const router = useRouter()

	const [readFunctions, setReadFunctions] = useState<functionType[]>()
	const [writeFunctions, setWriteFunctions] = useState<functionType[]>()
	const [showType, setShowType] = useState<string>()
	const [constructors, setConstructors] = useState<functionType[]>()
	const [contractExists, setContractExists] = useState<boolean>()
	const [contractData, setContractData] = useState<contractDataType>()
	const [contractAddress, setContractAddress] = useState<string>()
	const [ipfsURI, setIpfsURI] = useState<string>()
	const [isReadActive, setIsReadActive] = useState<boolean>(false)
	const [isWriteActive, setIsWriteActive] = useState<boolean>(false)
	const [isSourceCodeActive, setIsSourceCodeActive] = useState<boolean>(false)

	const { address } = useAccount()
	const provider = useProvider()
	const Registery_Contract = useContract({
		address: Registery_address,
		abi: Registery_ABI,
		signerOrProvider: provider
	})
	const toast = useToast()
	console.log(showType, 'showtype here')
	useEffect(() => {
		const queryAddress: any = router.query.address
		if (queryAddress) {
			setContractAddress(queryAddress)
		}
	}, [router.query])

	async function searchContract() {
		if (!contractAddress) return
		try {
			// const response = await Registery_Contract?.getContractRecord(
			//   contractAddress
			// );

			console.log(contractAddress, 'contract addres:')

			const response = await getItemByAddress(contractAddress)

			toast({
				title: 'Address fetched!!!',
				status: 'success',
				duration: 2000,
				isClosable: true
			})
			// console.log(response);
			if (!response?.address) {
				toast({
					title: 'Contract does not exist',
					description: 'This contract does not exist in our registry',
					status: 'error',
					duration: 2000,
					isClosable: true
				})
				// console.log("Contract does not exist");
				setContractExists(false)
				return
				/// notify that Contract doesnot Exists
			}
			setIpfsURI(response.IPFSURL)
			setContractExists(true)
			fetchContractData(response.IPFSURL)
		} catch (error: any) {
			toast({
				title: `${error.reason}`,
				status: 'error',
				duration: 2000,
				isClosable: true
			})
			console.log(error)
		}
	}

	async function fetchContractData(ipfsURL: string) {
		const contractData = await (await fetch(ipfsURL)).json()
		// console.log(contractData);

		if (!contractData) {
			toast({
				title: 'Contract Data not found',
				status: 'error',
				duration: 2000,
				isClosable: true
			})
			return
		}

		setContractData(contractData)
		setShowType('source')
		setIsSourceCodeActive(true)
		setIsReadActive(false)
		setIsWriteActive(false)
		getData(contractData.abi)
	}

	async function getData(abi: any[]) {
		const data = await analyzeABI(abi)
		setReadFunctions(data?.read)
		setWriteFunctions(data?.write)

		console.log(data, 'getData')
	}
	console.log(contractData)

	return (
		<>
			<Navbar />
			<main className='bg-black min-h-[77.6vh]'>
				<h1 className='bg-black text-white text-center text-3xl sm:text-4xl pt-10 pb-14'>
					Explore here
				</h1>
				<div className='mx-auto max-w-xl mb-10 px-4'>
					<p className='pb-3 text-white text-xl'>Paste Contract Address here</p>
					<Input
						input={contractAddress}
						setInput={setContractAddress}
						search={searchContract}
					/>
					<div className='flex justify-evenly py-10'>
						<button
							className={`text-white text-lg focus:border-t-2 ${
								isReadActive ? 'border-t-2 border-[#ed4e33]' : 'none'
							}`}
							onClick={() => {
								setShowType('read')
								setIsReadActive(true)
								setIsWriteActive(false)
								setIsSourceCodeActive(false)
							}}
						>
							Read Contract
						</button>
						<button
							className={`text-white text-lg focus:border-t-2 ${
								isWriteActive ? 'border-t-2 border-[#ed4e33]' : 'none'
							}`}
							onClick={() => {
								setShowType('write')
								setIsWriteActive(true)
								setIsReadActive(false)
								setIsSourceCodeActive(false)
							}}
						>
							Write Contract
						</button>
						<button
							className={`text-white text-lg focus:border-t-2 ${
								isSourceCodeActive ? 'border-t-2 border-[#ed4e33]' : 'none'
							}`}
							onClick={() => {
								setShowType('source')
								setIsSourceCodeActive(true)
								setIsReadActive(false)
								setIsWriteActive(false)
							}}
						>
							Source Code
						</button>
					</div>
				</div>
				{showType == 'read' && (
					<div className='flex items-center justify-evenly flex-wrap'>
						{readFunctions &&
							readFunctions.map((readFunction, key) => {
								return (
									<ReturnedFunction
										functionData={readFunction}
										key={key}
										contractAddress={contractAddress}
									/>
								)
							})}
					</div>
				)}
				{showType == 'write' && (
					<div className='grid grid-cols-3 m-auto gap-3'>
						{writeFunctions &&
							writeFunctions.map((writeFunction, key) => {
								return (
									<ReturnedFunction
										functionData={writeFunction}
										key={key}
										contractAddress={contractAddress}
									/>
								)
							})}
					</div>
				)}
				{showType == 'source' && (
					<div>
						{contractData && (
							<div>
								<ReturnedSourceCode sourceCode={contractData.code} />
							</div>
						)}
					</div>
				)}
			</main>
		</>
	)
}

export default Explorer
