var Coin = require('./coin.js');
class Nickel {
    constructor() {
        this.weight = 5;
        this.diameter = 21.21; 
    }
}
Object.setPrototypeOf(Nickel.prototype, Coin);
module.exports = Nickel;