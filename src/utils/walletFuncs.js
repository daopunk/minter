import { ethers } from 'ethers';

const isConnected = async () => {
	return (await window.ethereum.request({ method: 'eth_accounts' })).length !== 0;
}

const correctChainId = async () => {
	return (await window.ethereum.request({ method: 'eth_chainId' })) === ethers.utils.hexValue(80001);
}

// connectNetwork not exported
const connectNetwork = async () => {
	if (!await correctChainId()) {
		const target = ethers.utils.hexValue(80001)
		await window.ethereum.request({ 
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: target}],
		});
		window.location.reload();
	} else {
		console.log('Mumbai connected');
	}
}

const connectWallet = async (callback, ) => {
	if (window.ethereum) {
		if (await isConnected()) {
			console.log('already connected');
			const accounts = await window.ethereum.request({ method: 'eth_accounts' });
			callback(accounts[0]);
			connectNetwork();
		} else {
			try {
				console.log('connecting');
				const accountsReq = await window.ethereum.request({ method: 'eth_requestAccounts' });
				callback(accountsReq[0]);
				connectNetwork();
			} catch (error) {
				console.log(error);
			}
		}
	} else throw new Error("No Browser Wallet Detected");
}

export { isConnected, correctChainId, connectWallet };