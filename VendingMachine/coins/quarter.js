var Coin = require('./coin.js');
class Quarter {
    constructor() {
        this.weight = 5.67;
        this.diameter = 24.26; 
    }
}
Object.setPrototypeOf(Quarter.prototype, Coin);
module.exports = Quarter;