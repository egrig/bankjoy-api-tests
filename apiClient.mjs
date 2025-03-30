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

export function calculateAverageRate(observations, key) { // Corrected the typo
    const rates = observations.map((obs) => parseFloat(obs[key]));
    return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
}