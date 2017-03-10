var Coin = require('./coin.js');
class Penny {
    constructor() {
        this.weight = 2.5;
        this.diameter = 19.05;
    }
}
Object.setPrototypeOf(Penny.prototype, Coin);
module.exports = Penny;