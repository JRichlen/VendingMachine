var assert = require('assert');
var VendingMachine = require('../app.js');
var Quarter = require('../coins/quarter.js');
var Dime = require('../coins/dime.js');
var Nickel = require('../coins/nickel.js');
var Penny = require('../coins/penny.js');

describe('VendingMachine', function () {

    it('should return "insert coin"', function () {
        var vendor = new VendingMachine();
        assert.equal('insert coin', vendor.display);
    });

    describe('#isCoin', function () {
        var vendor = new VendingMachine();
        it('should recognize a coin', function () {
            var coin = new Quarter();
            assert(vendor.isCoin(coin, coin.weight, coin.diameter))
        })

        it('should assign a value to a recognized coin', function () {
            var coin = new Quarter();
            vendor.isCoin(coin, coin.weight, coin.diameter, 0.25);
            assert.equal(coin.value, 0.25, 'failed to assign the coin a value');
        })
    })

    describe('#isQuarter', function () {
        var vendor = new VendingMachine();
        it('should recognize a quarter is a quarter', function () {
            assert(vendor.isQuarter(new Quarter()));
        })
        it('should recognize a nickel is not a quarter', function () {
            assert.equal(vendor.isQuarter(new Nickel()), false);
        })
        it('should recognize a dime is not a quarter', function () {
            assert.equal(vendor.isQuarter(new Dime()), false);
        })
        it('should recognize a penny is not a quarter', function () {
            assert.equal(vendor.isQuarter(new Penny()), false);
        })

        it('should assign quarter a value of 0.25', function () {
            var coin = new Quarter();
            vendor.isQuarter(coin);
            assert.equal(coin.value, 0.25, 'invalid value assigned to quarter');
        })
    })

    describe('#isDime', function () {
        var vendor = new VendingMachine();
        it('should recognize a dime is a dime', function () {
            assert(vendor.isDime(new Dime()));
        })
        it('should recognize a nickel is not a dime', function () {
            assert.equal(vendor.isDime(new Nickel()), false);
        })
        it('should recognize a quarter is not a dime', function () {
            assert.equal(vendor.isDime(new Quarter()), false);
        })
        it('should recognize a penny is not a dime', function () {
            assert.equal(vendor.isDime(new Penny()), false);
        })

        it('should assign dime a value of 0.10', function () {
            var coin = new Dime();
            vendor.isDime(coin);
            assert.equal(coin.value, 0.10, 'invalid value assigned to dime');
        })
    })

    describe('#isNickel', function () {
        var vendor = new VendingMachine();
        it('should recognize a nickel is a nickel', function () {
            assert(vendor.isNickel(new Nickel()));
        })
        it('should recognize a dime is not a nickel', function () {
            assert.equal(vendor.isNickel(new Dime()), false);
        })
        it('should recognize a quarter is not a nickel', function () {
            assert.equal(vendor.isNickel(new Quarter()), false);
        })
        it('should recognize a penny is not a nickel', function () {
            assert.equal(vendor.isNickel(new Penny()), false);
        })

        it('should assign nickel a value of 0.05', function () {
            var coin = new Nickel();
            vendor.isNickel(coin);
            assert.equal(coin.value, 0.05, 'invalid value assigned to nickel');
        })
    }) 

    describe('#isAcceptedCoin', function () {
        var vendor = new VendingMachine();
        it('should accept a quarter', function () {
            var coin = new Quarter();
            assert(vendor.isAcceptedCoin(coin), 'quarter was rejected');
        })
        it('should accept a dime', function () {
            var coin = new Dime();
            assert(vendor.isAcceptedCoin(coin), 'dime was rejected');
        })
        it('should accept a nickel', function () {
            var coin = new Nickel();
            assert(vendor.isAcceptedCoin(coin), 'nickel was rejected' );
        })
        it('should reject a penny', function () {
            var coin = new Penny();
            assert.equal(vendor.isAcceptedCoin(coin), false, 'penny was accepted');
        })
    })

    describe('#addCoinToInsertedCoins', function () {
        var vendor = new VendingMachine();
        it('should add coin to the inserted coins array', function () {
            var coin = new Quarter();
            vendor.addCoinToInsertedCoins(coin);
            assert(vendor.insertedCoins.length);
        })
    })
 });
