const nextConfig = {
	reactStrictMode: true,

	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.module.rules.push({
				test: /\.sol$/,
				use: 'solidity-loader'
			})
		}
		return config
	}
}

module.exports = nextConfig
