'use strict';

class VendingMachine {
    constructor() {
        this.products = {
            candy: {
                unitCount: 3,
                unitPrice: 0.65,
                unit: 'piece of candy'
            },
            chips: {
                unitCount: 3,
                unitPrice: 0.50,
                unit: 'bag of chips'
            },
            cola: {
                unitCount: 3,
                unitPrice: 1.00,
                unit: 'bottle of cola'
            }
        };
        this.storedCoins = [];
        this.insertedCoins = [];
        this.storedFunds = 0.00;
        this.insertedFunds = 0.00;
        this.temporaryDisplayMessage = '';
        this.coinReturn = [];
    }

    display() {
        if (this.temporaryDisplayMessage.length) {
            var message = this.temporaryDisplayMessage;
            this.temporaryDisplayMessage = '';
            return message;
        }
        else if (this.insertedFunds > 0) {
            return '$' + String(this.insertedFunds)
        }
        else return 'insert coin';
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

    makeChange() {

    }

    returnCoins() {
        this.coinReturn = this.insertedCoins;
        this.insertedCoins = [];
        this.insertedFunds = 0;
    }

    hasEnoughFundsInserted(selectedProduct) {
        return this.insertedFunds >= selectedProduct.unitPrice;
    }

    selectProduct(product) {
        var selectedProduct = this.products[product];
        if (this.hasEnoughFundsInserted(selectedProduct)) {
            selectedProduct.unitCount--;
            return selectedProduct.unit;
        }
        else {
            this.temporaryDisplayMessage = '$' + selectedProduct.unitPrice;
            return null;
        } 
        
    }
}
module.exports = VendingMachine;