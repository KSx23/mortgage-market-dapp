import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Importing hypothetical API utility methods
import { connectWallet, mintNFT, transferNFT, requestLoan } from './apiUtils.js';

const App = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [location, setLocation] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [nfts, setNfts] = useState([]); // List of user's NFTs

    const handleConnectWallet = async () => {
        const address = await connectWallet(); // Connect and return address
        setWalletAddress(address);
    };

    const handleMintNFT = async () => {
        const nft = await mintNFT(walletAddress, location);
        setNfts([...nfts, nft]);
    };

    const handleTransferNFT = async (tokenId, newAddress) => {
        await transferNFT(tokenId, newAddress);
        // Updating frontend logic after transfer can be added here
    };

    const handleRequestLoan = async (tokenId) => {
        await requestLoan(walletAddress, tokenId, loanAmount);
    };

    return (
        <div>
            {!walletAddress ? (
                <button onClick={handleConnectWallet}>Connect Wallet</button>
            ) : (
                <div>
                    <h3>Wallet Address: {walletAddress}</h3>
                    <h3>Mint a Property NFT</h3>
                    <input 
                        value={location} 
                        onChange={e => setLocation(e.target.value)} 
                        placeholder="Enter Property Location" 
                    />
                    <button onClick={handleMintNFT}>Mint NFT</button>

                    <h3>My NFTs</h3>
                    {nfts.map(nft => (
                        <div key={nft.tokenId}>
                            <p>{nft.location}</p>
                            <button onClick={() => handleTransferNFT(nft.tokenId, 'NEW_ADDRESS_TODO')}>Transfer</button>
                            <button onClick={() => handleRequestLoan(nft.tokenId)}>Request Loan</button>
                        </div>
                    ))}

                    <h3>Request Loan</h3>
                    <input 
                        value={loanAmount} 
                        onChange={e => setLoanAmount(e.target.value)} 
                        placeholder="Enter Loan Amount" 
                    />
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
