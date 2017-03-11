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
            var coin = {
                weight: 1,
                diameter: 1
            };
            var vendor = new VendingMachine();
            assert(vendor.isCoin(coin, 1, 1))
        })
    });
});
