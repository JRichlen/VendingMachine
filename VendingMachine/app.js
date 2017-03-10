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
    
}
module.exports = VendingMachine;