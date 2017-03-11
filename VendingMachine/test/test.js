﻿var assert = require('assert');
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
        it('should recognize a quarter is a quarter', function () {
            var vendor = new VendingMachine();
            assert(vendor.isQuarter(new Quarter()));
        });
        it('should recognize a nickel is not a quarter', function () {
            var vendor = new VendingMachine();
            assert.equal(vendor.isQuarter(new Nickel()), false);
        })
        it('should recognize a dime is not a quarter', function () {
            var vendor = new VendingMachine();
            assert.equal(vendor.isQuarter(new Dime()), false);
        })
        it('should recognize a penny is not a quarter', function () {
            var vendor = new VendingMachine();
            assert.equal(vendor.isQuarter(new Penny()), false);
        })
    });
});
