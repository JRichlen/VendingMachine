'use strict';
var Quarter = require('./coins/quarter.js');
var Dime = require('./coins/dime.js');
var Nickel = require('./coins/nickel.js');
var Penny = require('./coins/penny.js');

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

    _isCoin(coin, expectedWeight, expectedDiameter, coinValue) {
        if (coin.weight == expectedWeight & coin.diameter == expectedDiameter) {
            if (coinValue) coin.value = coinValue;
            return true;
        }
        else return false;
    }

    _isQuarter(coin) {
        return this._isCoin(coin, 5.67, 24.26, 0.25);
    }

    _isDime(coin) {
        return this._isCoin(coin, 2.268, 17.91, 0.10);
    }

    _isNickel(coin) {
        return this._isCoin(coin, 5, 21.21, 0.05);
    }

    _isAcceptedCoin(coin) {
        return this._isQuarter(coin) || this._isNickel(coin) || this._isDime(coin) || false; 
    }

    _addCoinToInsertedCoins(coin) {
        this.insertedFunds += coin.value;
        this.insertedCoins.push(coin);
    }

    acceptCoin(coin) {
        if (this._isAcceptedCoin(coin)) {
            this._addCoinToInsertedCoins(coin);
            return null;
        }
        else {
            return coin;
        }
    }

    _availableCoins() {
        var coins = {
            quarters: [],
            dimes: [],
            nickels: []
        };
        var availableCoins = []
            .concat(this.insertedCoins)
            .concat(this.storedCoins);
        availableCoins.forEach(function (coin) {
            if (coin instanceof Quarter) coins.quarters.push(coin)
            else if (coin instanceof Dime) coins.dimes.push(coin)
            else if (coin instanceof Nickel) coins.nickels.push(coin);
        });
        return coins;
    }

    _makeChange(selectedProduct) {
        var changeFundsNeeded = this.insertedFunds - selectedProduct.unitPrice;
        var availableCoins = this._availableCoins();
        var changeCoins = [];
        var remainingCoins = [];
        var coinCount = availableCoins.quarters.length;
        for (var i = 0; i < coinCount; i++) {
            if (changeFundsNeeded < 0.25) {
                remainingCoins.push(availableCoins.quarters.splice(0, 1));
            } 
            else {
                changeFundsNeeded -= 0.25;
                changeCoins.push(availableCoins.quarters.splice(0, 1));
            }
        }
        coinCount = availableCoins.dimes.length;
        for (var i = 0; i < coinCount; i++) {
            if (changeFundsNeeded < 0.10) {
                remainingCoins.push(availableCoins.dimes.splice(0, 1));
            }
            else {
                changeFundsNeeded -= 0.10;
                changeCoins.push(availableCoins.dimes.splice(0, 1));
            }
            
        }
        coinCount = availableCoins.nickels.length;
        for (var i = 0; i < coinCount; i++) {
            if (changeFundsNeeded < 0.05) {
                remainingCoins.push(availableCoins.nickels.splice(0, 1)); 
            }
            else {
                changeFundsNeeded -= 0.05;
                changeCoins.push(availableCoins.nickels.splice(0, 1));
            }
        }
        this.storedCoins = remainingCoins;
        this.insertedCoins = changeCoins;
        this.returnCoins();
        if (changeFundsNeeded > 0) {
            this.temporaryDisplayMessage = "exact change only";
            return false;
        }
        else {
            return true;
        }
        
    }

    returnCoins() {
        this.coinReturn = this.insertedCoins;
        this.insertedCoins = [];
        this.insertedFunds = 0;
        
    }

    _hasEnoughFundsInserted(selectedProduct) {
        return this.insertedFunds >= selectedProduct.unitPrice;
    }

    selectProduct(product) {
        var selectedProduct = this.products[product];
        if (this._hasEnoughFundsInserted(selectedProduct)) {
            if (this._makeChange(selectedProduct)) {
                selectedProduct.unitCount--;
                this.temporaryDisplayMessage = 'thank you';
                return selectedProduct.unit;
            }
        }
        else {
            this.temporaryDisplayMessage = '$' + selectedProduct.unitPrice;
            return null;
        } 
        
    }
}
module.exports = VendingMachine;