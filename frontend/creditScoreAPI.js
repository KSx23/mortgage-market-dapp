const axios = require('axios');

class CreditScoreAPI {
    constructor(baseURL) {
        this.baseURL = baseURL; // Mock credit score API endpoint
    }

    // Fetch the credit score of a user based on their unique ID
    async getCreditScore(userId) {
        try {
            const response = await axios.get(`${this.baseURL}/creditScore/${userId}`);
            return response.data.creditScore; // Assuming the API returns a field called "creditScore"
        } catch (error) {
            throw new Error('Error fetching credit score: ' + error.message);
        }
    }

    // Possibly extend with other credit-related functionalities, e.g., fetching detailed credit reports, historical data, etc.

    // Fetch historical credit scores of a user for loan analysis
    async getHistoricalCreditScores(userId) {
        try {
            const response = await axios.get(`${this.baseURL}/creditHistory/${userId}`);
            return response.data.scores; // Assuming the API returns a list of historical scores in a field named "scores"
        } catch (error) {
            throw new Error('Error fetching historical credit scores: ' + error.message);
        }
    }

    // ... More methods related to credit functionalities ...
}

module.exports = CreditScoreAPI;
