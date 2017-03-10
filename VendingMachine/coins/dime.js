var Coin = require('./coin.js');
class Dime {
    constructor() {
        this.weight = 2.268;
        this.diameter = 17.91;
    }
}
Object.setPrototypeOf(Dime.prototype, Coin);
module.exports = Dime;