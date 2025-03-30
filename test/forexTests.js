const { expect } = require("chai");
const { getForexRates } = require("../apiClient");
const { calculateAverageRate } = require("../apiClient");

describe("Bank of Canada Forex API", function () {
    this.timeout(10000);    //Increase timeout for API calls

    it("should fetch CAD to USD conversion rates for the last 10 weeks", async function () {
        const data = await getForexRates("FXUSDCAD");
        expect(data).to.have.property("observations").that.is.an("array");
        expect(data.observations).to.have.length.greaterThan(0);
    });

    it("should fail gracefully when requesting an invalid currency pair", async function () {
        try {
            await getForexRates("INVALID_PAIR");
        } catch (error) {
            expect(error.message).to.equal("API request failed.");
        }
    })

    it("should calculate the average CAD to USD rate for the last 10 weeks", async function () {
        const data = await getForexRates("FXUSDCAD");
        const avgRate = calculateAverageRate(data.observations, "FXUSDCAD");
        expect(avgRate).to.be.a("number"). that.is.greaterThan(0);
    });

    it("should return an error for an empty response", async function () {
        try {
            await getForexRates("");
        } catch (error) {
            expect(error.message).to.include("API request failed");
        }
    })

    const currencyPairs = ["FXUSDCAD", "FXEURCAD", "FXGBPCAD"];

    currencyPairs.forEach((pair) => {
        it(`should fetch and calculate average for ${pair}`, async function () {
            const data = await getForexRates(pair);
            const avgRate = calculateAverageRate(data.observations, pair);
            expect(avgRate).to.be.a("number").that.is.greaterThan(0);
        });
    });
})