var assert = require('assert');
var VendingMachine = require('../vendingMachine.js');
var Quarter = require('../coins/quarter.js');
var Dime = require('../coins/dime.js');
var Nickel = require('../coins/nickel.js');
var Penny = require('../coins/penny.js');

describe('VendingMachine', function () {
    var vendor;
    beforeEach(function() {
        vendor = new VendingMachine();
    });
    describe('#display', function () {
        it('should display "insert coin" when no coins are inserted', function () {
            assert.equal(vendor.display(), 'insert coin');
        });
        it('shoud display sum of inserted funds when there are inserted coins', function () {
            vendor.insertedFunds = 0.25;
            assert.equal(vendor.display(), '$0.25');
        })
    })

    describe('#isCoin', function () {
        it('should recognize a coin', function () {
            var coin = new Quarter();
            assert(vendor._isCoin(coin, coin.weight, coin.diameter))
        })

        it('should assign a value to a recognized coin', function () {
            var coin = new Quarter();
            vendor._isCoin(coin, coin.weight, coin.diameter, 0.25);
            assert.equal(coin.value, 0.25, 'failed to assign the coin a value');
        })
    })

    describe('#isQuarter', function () {
        it('should recognize a quarter is a quarter', function () {
            assert.ok(vendor._isQuarter(new Quarter()));
        })
        it('should recognize a nickel is not a quarter', function () {
            assert.equal(vendor._isQuarter(new Nickel()), false);
        })
        it('should recognize a dime is not a quarter', function () {
            assert.equal(vendor._isQuarter(new Dime()), false);
        })
        it('should recognize a penny is not a quarter', function () {
            assert.equal(vendor._isQuarter(new Penny()), false);
        })

        it('should assign quarter a value of 0.25', function () {
            var coin = new Quarter();
            vendor._isQuarter(coin);
            assert.equal(coin.value, 0.25, 'invalid value assigned to quarter');
        })
    })

    describe('#isDime', function () {
        it('should recognize a dime is a dime', function () {
            assert(vendor._isDime(new Dime()));
        })
        it('should recognize a nickel is not a dime', function () {
            assert.equal(vendor._isDime(new Nickel()), false);
        })
        it('should recognize a quarter is not a dime', function () {
            assert.equal(vendor._isDime(new Quarter()), false);
        })
        it('should recognize a penny is not a dime', function () {
            assert.equal(vendor._isDime(new Penny()), false);
        })

        it('should assign dime a value of 0.10', function () {
            var coin = new Dime();
            vendor._isDime(coin);
            assert.equal(coin.value, 0.10, 'invalid value assigned to dime');
        })
    })

    describe('#isNickel', function () {
        it('should recognize a nickel is a nickel', function () {
            assert.ok(vendor._isNickel(new Nickel()));
        })
        it('should recognize a dime is not a nickel', function () {
            assert.equal(vendor._isNickel(new Dime()), false);
        })
        it('should recognize a quarter is not a nickel', function () {
            assert.equal(vendor._isNickel(new Quarter()), false);
        })
        it('should recognize a penny is not a nickel', function () {
            assert.equal(vendor._isNickel(new Penny()), false);
        })

        it('should assign nickel a value of 0.05', function () {
            var coin = new Nickel();
            vendor._isNickel(coin);
            assert.equal(coin.value, 0.05, 'invalid value assigned to nickel');
        })
    }) 

    describe('#isAcceptedCoin', function () {
        it('should accept a quarter', function () {
            var coin = new Quarter();
            assert(vendor._isAcceptedCoin(coin), 'quarter was rejected');
        })
        it('should accept a dime', function () {
            var coin = new Dime();
            assert(vendor._isAcceptedCoin(coin), 'dime was rejected');
        })
        it('should accept a nickel', function () {
            var coin = new Nickel();
            assert(vendor._isAcceptedCoin(coin), 'nickel was rejected' );
        })
        it('should reject a penny', function () {
            var coin = new Penny();
            assert.equal(vendor._isAcceptedCoin(coin), false, 'penny was accepted');
        })
    })

    describe('#addCoinToInsertedCoins', function () {  
        it('should add coin to the inserted coins array', function () {
            var coin = new Quarter();
            vendor._addCoinToInsertedCoins(coin);
            assert.ok(vendor.insertedCoins.length);
        })
        it('should increase inserted funds when coin added to inserted coins', function () {
            var expectedFundsAfterCoinIsInserted;
            var fundsBeforeCoinIsInserted = vendor.insertedFunds;
            var coin = new Quarter();
            vendor._isQuarter(coin);
            expectedFundsAfterCoinIsInserted = coin.value + fundsBeforeCoinIsInserted;
            vendor._addCoinToInsertedCoins(coin);
            assert.equal(vendor.insertedFunds, expectedFundsAfterCoinIsInserted);
        })
        it('should increase inserted funds when multiple coins are inserted', function () {
            var fundsBeforeCoinIsInserted = vendor.insertedFunds;
            var expectedFundsAfterCoinIsInserted = fundsBeforeCoinIsInserted;
            var coin = new Quarter();
            vendor._isQuarter(coin);
            expectedFundsAfterCoinIsInserted += coin.value;
            vendor._addCoinToInsertedCoins(coin);
            coin = new Dime();
            vendor._isDime(coin);
            expectedFundsAfterCoinIsInserted += coin.value;
            vendor._addCoinToInsertedCoins(coin);
            coin = new Nickel();
            vendor._isNickel(coin);
            expectedFundsAfterCoinIsInserted += coin.value;
            vendor._addCoinToInsertedCoins(coin);
            assert.equal(vendor.insertedFunds, expectedFundsAfterCoinIsInserted);
        })
    })

    describe('#acceptCoin', function () {
        it('should return coin if not accepted', function () {
            var coin = new Penny();
            assert.ok(vendor.acceptCoin(coin));
        })
        it('should not return the coin if accepted', function () {
            var coin = new Quarter();
            assert.equal(vendor.acceptCoin(coin), null);
        })
        it('should add accepted coin to inserted coins', function () {
            var coin = new Quarter();
            vendor.acceptCoin(coin);
            assert(vendor.insertedCoins.length);
        })
        it('should add accepted coin\'s value to inserted funds', function () {
            var coin = new Quarter();
            vendor.acceptCoin(coin);
            assert.equal(vendor.insertedFunds, 0.25);
        })
    })

    describe('#returnCoins', function () {
        beforeEach(function() {
            vendor.acceptCoin(new Quarter());
            vendor.acceptCoin(new Dime());
            vendor.acceptCoin(new Nickel());
        })

        it('should return inserted coins to coin return', function () {
            var expectedCoinsToBeReturned = vendor.insertedCoins;
            vendor.returnCoins()
            assert.equal(vendor.coinReturn, expectedCoinsToBeReturned);
        })
        it('should not have any inserted coins after coins are returned', function () {
            vendor.returnCoins();
            assert.equal(vendor.insertedCoins.length, 0);
        })
        it('should not have any inserted funds after coins are returned', function () {
            vendor.returnCoins();
            assert.equal(vendor.insertedFunds, 0);
        })
        it('should display "insert coins" after coins are returned', function () {
            vendor.returnCoins();
            assert.equal(vendor.display(), 'insert coin');
        })
    })

    describe('#hasEnoughFundsInserted', function () {
        it('should return false if not enough funds inserted to purchase selected product', function () {
            var selectedProduct = vendor.products['candy'];
            assert.equal(vendor._hasEnoughFundsInserted(selectedProduct), false);
        })
        it('should return true if enough funds inserted to purchase selected product', function () {
            var vendor = new VendingMachine();
            var selectedProduct = vendor.products['candy'];
            vendor.acceptCoin(new Quarter());
            vendor.acceptCoin(new Quarter());
            vendor.acceptCoin(new Dime());
            vendor.acceptCoin(new Nickel());
            assert.equal(vendor._hasEnoughFundsInserted(selectedProduct), true, vendor.insertedFunds + ' < ' + selectedProduct.unitPrice);
        })
    })

    describe('#availableCoins', function () {
        var coins;
        beforeEach(function() {
            vendor.acceptCoin(new Quarter());
            vendor.storedCoins.push(new Quarter());
            vendor.acceptCoin(new Dime());
            vendor.storedCoins.push(new Dime());
            vendor.acceptCoin(new Nickel());
            vendor.storedCoins.push(new Nickel());
            coins = vendor._availableCoins();
        });

        it('should return count 2 quarters', function () {
            assert.equal(coins.quarters.length, 2);
        })
        it('should return count 2 dimes', function () {
            assert.equal(coins.dimes.length, 2);
        })
        it('should return count 2 nickels', function () {
            assert.equal(coins.nickels.length, 2);
        })
    });



    describe('#makeChange', function () {
        beforeEach(function() {
            vendor.acceptCoin(new Quarter());
            vendor.acceptCoin(new Quarter());
            vendor.acceptCoin(new Quarter());
        })

        it('should not return any coins if change can\'t be made', function () {
            vendor.selectProduct('candy');
            assert.equal(vendor.coinReturn.length, 0);
        })
        it('should display "exact change only"', function () {
            vendor.selectProduct('candy');
            assert.equal(vendor.display(), 'exact change only');
        })
        it('should return 2 extra coins to the coin return', function () {
            vendor.acceptCoin(new Quarter());
            vendor.selectProduct('chips');
            assert.equal(vendor.coinReturn.length, 2);
        })
        it('should put 2 coins into storage', function () {
            vendor.acceptCoin(new Quarter());
            vendor.selectProduct('chips');
            assert.equal(vendor.storedCoins.length, 2);
        })
        it('should display "insert coins"', function () {
            vendor.acceptCoin(new Quarter());
            vendor.selectProduct('chips');
            vendor.display();
            assert.equal(vendor.display(), 'insert coin')
        })
    })

    describe('#selectProduct', function () {
        it('should display price of product if not enough funds are inserted', function () {
            vendor.returnCoins();
            vendor.selectProduct('candy');
            assert.equal(vendor.display(), '$0.65');
        })
        it('should not return any coins if not enough funds are inserted', function () {
            vendor.selectProduct('candy');
            assert.equal(vendor.coinReturn.length, 0);
        })
        it('should display "insert coin" after displaying price of product if no coins inserted', function () {
            vendor.selectProduct('candy');
            vendor.display();
            assert.equal(vendor.display(), 'insert coin');
        })
        it('should display insertedFunds after displaying price of product if coins are inserted', function () {
            vendor.returnCoins();
            vendor.acceptCoin(new Quarter());
            vendor.selectProduct('candy');
            vendor.display();
            assert.equal(vendor.display(), '$0.25');
        })

        beforeEach(function() {
            vendor.acceptCoin(new Quarter());
            vendor.acceptCoin(new Quarter());
            vendor.acceptCoin(new Dime());
            vendor.acceptCoin(new Nickel());
        })

        it('should return a unit of selected product', function () {
            assert.equal(vendor.selectProduct('candy'), 'piece of candy');
        })
        it('should display "thank you" after a product is vended', function () {
            vendor.selectProduct('candy');
            assert.equal(vendor.display(), 'thank you');
        })
        it('should decrease unitCount by 1 when product is selected', function () {
            var unitCountBefore = vendor.products['candy'].unitCount;
            var unitCountAfter;
            vendor.selectProduct('candy');
            unitCountAfter = vendor.products['candy'].unitCount;
            assert.equal(unitCountBefore - unitCountAfter, 1);
        })
        
    })
 });
