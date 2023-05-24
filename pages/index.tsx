import Head from 'next/head'
import Explorer from './Explorer'

const metadata = {
	title: 'EVMOS Explorer',
	description: '[EVMOS] EVM Extensions Hackathon'
}

export default function Home() {
	return (
		<>
			<Head>
				<title>{metadata.title}</title>
				<meta name='description' content={metadata.description} />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Explorer />
		</>
	)
}
