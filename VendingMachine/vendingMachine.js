'use strict';

class VendingMachine {
    constructor() {
        this.products = {};
        this.storedCoins = [];
        this.insertedCoins = [];
        this.storedFunds = 0.00;
        this.insertedFunds = 0.00;
    }

    displayInsertCoin() {
        return 'insert coin';
    }

    get display() {
        return this.displayInsertCoin();
    }

    isCoin(coin, expectedWeight, expectedDiameter, coinValue) {
        if (coin.weight == expectedWeight & coin.diameter == expectedDiameter) {
            if (coinValue) coin.value = coinValue;
            return true;
        }
        else return false;
    }

    isQuarter(coin) {
        return this.isCoin(coin, 5.67, 24.26, 0.25);
    }

    isDime(coin) {
        return this.isCoin(coin, 2.268, 17.91, 0.10);
    }

    isNickel(coin) {
        return this.isCoin(coin, 5, 21.21, 0.05);
    }

    isAcceptedCoin(coin) {
        return this.isQuarter(coin) || this.isNickel(coin) || this.isDime(coin) || false; 
    }

    addCoinToInsertedCoins(coin) {
        this.insertedFunds += coin.value;
        this.insertedCoins.push(coin);
    }

    acceptCoin(coin) {
        if (this.isAcceptedCoin(coin)) {
            this.addCoinToInsertedCoins(coin);
            return null;
        }
        else {
            return coin;
        }
    }
}
module.exports = VendingMachine;