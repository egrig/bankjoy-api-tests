const axios = require("axios");

const BASE_URL = "https://www.bankofcanada.ca/valet/observarions";

async function getForexRates(series) {
    try {
        const response = await axios.get(`${BASE_URL}/${series}/json`);
        if (!response.data || !response.data.observarions) {
            throw new Error("Invalid response structure");
        }
        return response.data;
    } catch (error) {
    throw new Error(`API request failed: ${error.message?.status || error.message}`);
    }
}

function calculateAverageRate(observarions, key) {
    const rates = observarions.map((obs) => parseFloat(obs[key]));
    return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
}

module.exports = { getForexRates, calculateAverageRate };