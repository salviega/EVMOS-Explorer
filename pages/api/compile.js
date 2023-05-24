import solc from 'solc'
import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
	if (!req.body.sourceCode) {
		return res.status(400).json({ message: 'Input required' })
	}

	const code = req.body.sourceCode

	try {
		// Compile the contracts
		const input = JSON.stringify(prepareInput(code))
		const compiled = solc.compile(input, { import: importFile })
		const output = JSON.parse(compiled) // Add this line

		//console.log("Compiler output:", output);

		// Error handling
		if (output.errors) {
			for (const error of output.errors) {
				if (error.severity === 'warning') {
					console.warn('Compiler warning:', error.formattedMessage)
				} else {
					return res.status(400).json({ output: error.formattedMessage })
				}
			}
		}

		var contractDetails
		for (var contractName in output.contracts['mainContract.sol']) {
			// Use 'mainContract.sol' instead of 'file.sol'
			// preparing the response on successful compilation
			const response = {
				name: contractName,
				abi: output.contracts['mainContract.sol'][contractName].abi, /// get the abi
				bytecode: `0x${output.contracts['mainContract.sol'][contractName].evm.bytecode.object}` // get the bytecode
			}

			contractDetails = response
		}

		res.status(200).json({ output: contractDetails })
	} catch (error) {
		console.error('Error in compilation:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

function getImports(sourceCode) {
	const importRegex = /import\s+['"](.+)['"];/g
	const imports = []
	let match

	while ((match = importRegex.exec(sourceCode))) {
		const importPath = match[1]
		console.log(importPath)
		const importPathParts = importPath.split('/')
		const packageName = importPathParts[0]
		const packagePath = importPathParts.slice(1).join('/')
		const packagePathSplited = packagePath.split('/')
		const packageFullPath = path.join(
			process.cwd(),
			'node_modules',
			packageName,
			...packagePathSplited
		)
		const packageContent = fs.readFileSync(packageFullPath, 'utf8')
		imports.push({ path: importPath, content: packageContent })
	}

	return imports
}

function prepareInput(sourceCode) {
	const imports = getImports(sourceCode)
	const sources = {
		'mainContract.sol': {
			content: sourceCode
		}
	}

	for (const { path, content } of imports) {
		sources[path] = {
			content
		}
	}

	const input = {
		language: 'Solidity',
		sources,
		settings: {
			outputSelection: {
				'*': {
					'*': ['*']
				}
			},
			metadata: {
				useLiteralContent: true
			},
			optimizer: {
				enabled: true,
				runs: 200 // Set the number of optimization runs to 200
			}
		}
	}

	return input
}

function importFile(filePath) {
	try {
		const importPathParts = filePath.split('/')
		const packageName = importPathParts[0]
		const packagePath = importPathParts.slice(1).join('/')
		const packagePathSplited = packagePath.split('/')
		const packageFullPath = path.join(
			process.cwd(),
			'node_modules',
			packageName,
			...packagePathSplited
		)
		const packageContent = fs.readFileSync(packageFullPath, 'utf8')
		return { contents: packageContent }
	} catch (error) {
		return { error: `Error importing file "${filePath}"` }
	}
}
