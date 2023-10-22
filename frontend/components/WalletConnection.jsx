import React, { useState, useEffect } from 'react';
import { connectWallet, getWalletAddress } from './walletAPI.js'; // Placeholder API methods

const WalletConnection = ({ onWalletConnected }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);

    // On component mount, check if wallet is already connected
    useEffect(() => {
        const fetchWalletAddress = async () => {
            const address = await getWalletAddress();
            if (address) {
                setWalletAddress(address);
                setIsConnected(true);
            }
        };
        fetchWalletAddress();
    }, []);

    const handleConnect = async () => {
        const connected = await connectWallet(); // Placeholder method
        if (connected) {
            const address = await getWalletAddress(); // Placeholder method to fetch connected wallet address
            setWalletAddress(address);
            setIsConnected(true);

            // Notify parent components about the connected wallet
            onWalletConnected(address);
        } else {
            alert('Failed to connect wallet.');
        }
    };

    return (
        <div className="wallet-connection">
            {!isConnected ? (
                <button onClick={handleConnect}>Connect Wallet</button>
            ) : (
                <div>
                    <span>Connected: {walletAddress}</span>
                </div>
            )}
        </div>
    );
};

export default WalletConnection;
