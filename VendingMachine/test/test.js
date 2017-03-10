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
        it('should return "$0.25"');
        it('should return "$0.10"');
        it('should return "$0.05"');
        it('should return the Penny');
        it('should return "$0.65"');
    });
});
