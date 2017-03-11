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
    describe('#acceptCoin', function () {
        it('should recognize a coin', function () {
            var vendor = new VendingMachine();
            var coin = new Quarter();
            assert(vendor.isCoin(coin, coin.weight, coin.diameter))
        });
        it('should recognize that a quarter is not a nickel', function () {
            var vendor = new VendingMachine();
            var quarter = new Quarter();
            var nickel = new Nickel();
            assert.equal(vendor.isCoin(quarter, nickel.weight, nickel.diameter), false);
        })
    });
});
