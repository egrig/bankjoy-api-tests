const axios = require("axios");

const BASE_URL = "https://www.bankofcanada.ca/valet/observarions";

async function getForexRates(series) {
    try {
        const response = await axios.get(`${BASE_URL}/${series}/json`);
        return response.data;
    } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
    }
}

module.exports = { getForexRates };