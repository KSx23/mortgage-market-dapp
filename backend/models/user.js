const { StacksWallet } = require('./walletAPI.js');
const axios = require('axios');

class User {
    constructor(userId, username) {
        this.userId = userId;
        this.username = username;
        this.wallet = null; // This will be an instance of our StacksWallet class (or similar)
        this.properties = []; // List of property NFTs owned by the user
    }

    // Link a wallet to a user
    linkWallet(walletAddress) {
        // Ensure it's a valid address format
        if (!StacksWallet.isValidAddress(walletAddress)) {
            throw new Error('Invalid wallet address');
        }
        this.wallet = new StacksWallet(walletAddress);
    }

    // Fetch properties owned by user from the blockchain
    async fetchProperties() {
        // This would involve calling relevant blockchain functions 
        // to fetch the list of properties/NFTs owned by this user.
        // Here's a mock:
        try {
            const response = await axios.get(`https://mockblockchainapi.example.com/properties/${this.wallet.getAddress()}`);
            this.properties = response.data.properties;
        } catch (error) {
            throw new Error('Error fetching properties: ' + error.message);
        }
    }

    // Additional functionalities, e.g., updating user details, fetching credit score, etc.
    async getCreditScore(creditScoreAPI) {
        // Using our previously created creditScoreAPI.js
        return await creditScoreAPI.getCreditScore(this.userId);
    }

    // ... more methods as per requirements ...
}

module.exports = User;
