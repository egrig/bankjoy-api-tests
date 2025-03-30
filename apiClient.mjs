import axios from "axios";

const BASE_URL = "https://www.bankofcanada.ca/valet/observations"; // Corrected the typo

export async function getForexRates(series) {
    try {
        const response = await axios.get(`${BASE_URL}/${series}/json`);
        if (!response.data || !response.data.observations) { // Corrected the typo
            throw new Error("Invalid response structure");
        }
        return response.data;
    } catch (error) {
        throw new Error(`API request failed: ${error.message?.status || error.message}`);
    }
}

export function calculateAverageRate(observations, key) {
    const rates = observations.map((obs) => {
        const rate = parseFloat(obs[key]?.v);
        if (isNaN(rate)) {
            throw new Error(`Rate not found for key: ${key}`);
        }
        return rate;
    });
    return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
}