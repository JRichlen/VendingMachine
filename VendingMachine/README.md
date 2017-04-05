# VendingMachine

A simple vending machine that vends chips, cola, or candy.

## Installation

npm install

## Usage
```
var vendor = new VendingMachine();
vendor.display(); // "insert coin"
var coin = new Quarter();
vendor.acceptCoin(coin);
vendor.selectProduct('chips');
vendor.display(); // "$0.50" required funds for product
vendor.display(); // "$0.25" inserted funds
vendor.acceptCoin(new Quarter());
vendor.acceptCoin(new Dime());
vendor.selectProduct('chips'); // returns "bag of chips"
vendor.display(); // "insert coins"
```

`index.html` can be opened in an ES6 compatible browser for an interactive user interface. 

## Tests
```
npm test
```