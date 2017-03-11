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

    }
    
}
module.exports = VendingMachine;