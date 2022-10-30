import { ethers } from 'ethers';
import { isConnected, correctChainId } from './walletFuncs';
import NFT from '../abi/NFT.json';

// getContract not exported
const getContract = (address) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	return new ethers.Contract(address, NFT.abi, signer);
}

const contractEventListener = (address, url) => {
	try {
		const nftContract = getContract(address);

		nftContract.on("NftMinted", (from, tokenId) => {
			console.log(from, tokenId.toNumber());
			alert(`Minted NFT available at: ${url}/${tokenId.toNumber()}`);
		});
		console.log('Listening for Mint');
	} catch (error) {
		console.log(`NFT Mint Event Error: ${error}`);
	}
}

const mintNft = async (address) => {
	try {
		if (isConnected() && correctChainId()) {
			const nftContract = getContract(address);

			console.log("Minting NFT");
			let tx = await nftContract.mintFTR();
			await tx.wait();
			console.log(`Transaction Hash: ${tx.hash}`);
		} else {
			alert('Please Connect and Select Mumbai Network');
		}
	} catch (error) {
		console.log(`NFT Mint Error: ${error}`);
	}
}

export { getContract, contractEventListener, mintNft };
