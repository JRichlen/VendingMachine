'use strict';

class VendingMachine {
    constructor() {
        this.products = {};
        this.storedCoins = [];
        this.insertedCoins = [];
    }

    displayInsertCoin() {
        return 'insert coin';
    }

    get display() {
        return this.displayInsertCoin();
    }

    isCoin(coin, expectedWeight, expectedDiameter) {
        return coin.weight == expectedWeight & coin.diameter == expectedDiameter;
    }

    isQuarter(coin) {
        return this.isCoin(coin, 5.67, 24.26);
    }
    
}
module.exports = VendingMachine;