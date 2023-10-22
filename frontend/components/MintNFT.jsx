import React, { useState } from 'react';
import mapsIntegration from '../mapsIntegration.js';  // assuming mapsIntegration exports necessary functions
import governmentAPI from './governmentAPI.js';      // assuming governmentAPI exports a minting approval function

const MintNFT = ({ onNFTMinted }) => {
    const [address, setAddress] = useState('');
    const [locationData, setLocationData] = useState(null);
    const [isPendingApproval, setPendingApproval] = useState(false);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleFetchLocation = async () => {
        const data = await mapsIntegration.fetchLocationData(address);
        setLocationData(data);
    };

    const handleMintNFT = async () => {
        setPendingApproval(true);
        const approval = await governmentAPI.checkMintingApproval(locationData);
        
        if (approval.status === 'approved') {
            // Call your blockchain functions to mint the NFT here.
            // For example: await blockchainAPI.mintNFT(locationData);

            setPendingApproval(false);
            onNFTMinted();  // Inform the parent component or other parts of the app.
        } else {
            alert('Minting not approved by the government agency.');
            setPendingApproval(false);
        }
    };

    return (
        <div className="mint-section">
            <h2>Mint a Location-Based NFT</h2>
            <div className="input-group">
                <label htmlFor="address">Enter Address:</label>
                <input 
                    type="text" 
                    id="address" 
                    value={address} 
                    onChange={handleAddressChange}
                    placeholder="Enter location address"
                />
                <button onClick={handleFetchLocation}>Fetch Location Data</button>
            </div>
            {locationData && (
                <div>
                    <p>Location Details:</p>
                    <pre>{JSON.stringify(locationData, null, 2)}</pre>
                    <button onClick={handleMintNFT} disabled={isPendingApproval}>
                        {isPendingApproval ? 'Waiting for Approval...' : 'Mint NFT'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default MintNFT;
