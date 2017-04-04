# VendingMachine
==========

A simple vending machine that vends chips, cola, or candy.

## Installation

	npm install

## Usage
```
	var vendor = new VendingMachine();
	vendor.display(); // "insert coin"
	var coin = new Quarter();
	vendor.acceptCoin(coin);
	vendor.display(); // "$0.25"
```
## Tests
```
	npm test
```