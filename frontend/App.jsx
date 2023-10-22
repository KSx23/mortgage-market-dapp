import React, { useState } from 'react';

// Components and API utility methods
import { connectWallet, getNFTsForUser, requestLoan } from './apiUtils.js';
import MapsIntegration from './mapsIntegration.js';
import CreditScore from './creditScoreAPI.js';

const App = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [location, setLocation] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [nfts, setNfts] = useState([]); // List of user's NFTs
    const [creditScore, setCreditScore] = useState(null);

    const handleConnectWallet = async () => {
        const address = await connectWallet();
        setWalletAddress(address);

        // Fetch NFTs associated with this wallet upon connecting
        const userNFTs = await getNFTsForUser(address);
        setNfts(userNFTs);
    };

    const handleMintNFT = async (locationData) => {
        // The minting logic might require more info than just location
        const nft = await mintNFT(walletAddress, locationData);
        setNfts([...nfts, nft]);
    };

    const handleRequestLoan = async (tokenId) => {
        // You might also consider the credit score in the loan request logic
        await requestLoan(walletAddress, tokenId, loanAmount, creditScore);
    };

    return (
        <div>
            {!walletAddress ? (
                <button onClick={handleConnectWallet}>Connect Wallet</button>
            ) : (
                <>
                    <h3>Wallet Address: {walletAddress}</h3>

                    <MapsIntegration 
                        onLocationSelect={setLocation}
                        onMintNFT={handleMintNFT}
                    />

                    <h3>My NFTs</h3>
                    {nfts.map(nft => (
                        <div key={nft.tokenId}>
                            <p>{nft.location}</p>
                            <button onClick={() => handleTransferNFT(nft.tokenId, 'NEW_ADDRESS_TODO')}>Transfer</button>
                            <button onClick={() => handleRequestLoan(nft.tokenId)}>Request Loan</button>
                        </div>
                    ))}

                    <CreditScore 
                        onFetch={setCreditScore}
                        walletAddress={walletAddress}
                    />

                    <h3>Request Loan</h3>
                    <input 
                        value={loanAmount} 
                        onChange={e => setLoanAmount(e.target.value)} 
                        placeholder="Enter Loan Amount" 
                    />
                    <button onClick={handleRequestLoan}>Request</button>
                </>
            )}
        </div>
    );
};

export default App;
