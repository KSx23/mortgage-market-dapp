// axios.js

const axios = {
    async post(url, data) {
        // Simulating an API call with axios.post
        console.log(`Making a POST request to ${url} with data:`, data);

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating async delay

        return {
            data: {
                success: true,
                message: "Mocked response from axios post",
                ...data
            }
        };
    },

    // Add other axios methods like get, put, delete if you need them.
};

export default axios;
