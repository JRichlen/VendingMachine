var assert = require('assert');
var VendingMachine = require('../app.js');
describe('VendingMachine', function () {
    var vendor = new VendingMachine();

    describe('#display', function () {
        it('should return "insert coin"', function () {
            assert.equal('insert coin', vendor.display);
        })

    });

})