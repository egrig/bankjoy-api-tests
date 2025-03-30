# Bank of Canada Forex API Test Framework

This project implements a simple API test framework for the Bank of Canada's Forex rates using Node.js, Axios, and Chai.

## Introduction

The tests are designed to verify the fetching and calculation of exchange rates from the Bank of Canada's API for various currency pairs.

## Prerequisites

- Node.js and npm installed
- Internet connection for API requests

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies:

   ```bash
   npm install

## Running the Tests
To execute the tests, run the following command:

npm test

## Observations
The API responses contain exchange rates nested within a v property for each date.
Tests cover basic functionalities such as fetching rates, graceful failover for invalid inputs, and calculation of average rates.
