import React from 'react';
import { Link } from 'react-router-dom';

// Ensure that the WalletConnection component exists in the specified path.
// If not, update the path to the correct location or create the component.
import WalletConnection from './WalletConnection.jsx';

const Navbar = ({ onWalletConnected }) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Mortgage Market dApp</Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/nfts">NFTs</Link>
                    <Link to="/marketplace">Marketplace</Link>
                    <Link to="/finance">Finance</Link>
                    <Link to="/credit">Credit Score</Link>
                </div>
                <div className="navbar-end">
                    <WalletConnection onWalletConnected={onWalletConnected} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
