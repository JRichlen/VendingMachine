class Dime {
    constructor() {
        this.weight = 2.268;
        this.diameter = 17.91;
    }
}

class Nickel {
    constructor() {
        this.weight = 5;
        this.diameter = 21.21; 
    }
}

class Penny {
    constructor() {
        this.weight = 2.5;
        this.diameter = 19.05;
    }
}

class Quarter {
    constructor() {
        this.weight = 5.67;
        this.diameter = 24.26; 
    }
}

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

    availableCoins() {
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

    makeChange(selectedProduct) {
        var changeFundsNeeded = this.insertedFunds - selectedProduct.unitPrice;
        var availableCoins = this.availableCoins();
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

    hasEnoughFundsInserted(selectedProduct) {
        return this.insertedFunds >= selectedProduct.unitPrice;
    }

    selectProduct(product) {
        var selectedProduct = this.products[product];
        if (this.hasEnoughFundsInserted(selectedProduct)) {
            if (this.makeChange(selectedProduct)) {
                selectedProduct.unitCount--;
                return selectedProduct.unit;
            }
        }
        else {
            this.temporaryDisplayMessage = '$' + selectedProduct.unitPrice;
            return null;
        } 
        
    }
}