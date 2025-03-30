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

function calculateAverageRate(observarions, key) {
    const rates = observarions.map((obs) => parseFloat(obs[key]));
    return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
}

module.exports = { getForexRates, calculateAverageRate };