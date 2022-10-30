import './styles/App.css';
import globe from './assets/globe-internet.svg';
import { useEffect, useState } from 'react'
import ConnectBtn from './components/ConnectBtn';
import MintBtn from './components/MintBtn';
import { connectWallet } from './utils/walletFuncs';
import { contractEventListener, mintNft } from './utils/contractFuncs';

const App = () => {
  const [currAct, setCurrAct] = useState('');

  const CONTRACT_ADDRESS = "0x6f065500e03DA700eCEA94827B3FD52CC9994242";
  const OPENSEA_URL =`https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}`;

  useEffect(() => {
    connectWallet(setCurrAct);
    contractEventListener(CONTRACT_ADDRESS, OPENSEA_URL);
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">NFT Collection</p>
          <p className="sub-text">
            Pseudo-Random. Persistent. Non-Fungible.
          </p>
          {!currAct ? (<ConnectBtn handleClick={connectWallet} />
          ) : (<MintBtn handleClick={() => mintNft(CONTRACT_ADDRESS)} />)}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={globe} />
          <a
            className="footer-text"
            href='https://twitter.com/_buildspace'
            target="_blank"
            rel="noreferrer"
          >{`inspired by @_buildspace`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
