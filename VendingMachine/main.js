$(function () {
    var vendor = new VendingMachine();
    var $vendor = $('#vendingMachine');
    var $display = $vendor.find('#display');
    var $coinReturn = $vendor.find('#coinReturn');

    function insertCoin(event) {
        var coin = event.target.dataset.coin;
        if (coin == 'quarter') coin = new Quarter()
        else if (coin == 'dime') coin = new Dime()
        else if (coin == 'nickel') coin = new Nickel()
        else if (coin == 'penny') coin = new Penny();
        vendor.acceptCoin(coin);
        checkDisplay();
    }

    function checkDisplay() {
        $display.text(vendor.display());
    }

    function returnCoins() {
        vendor.returnCoins();
        displayReturnCoins();
        checkDisplay();
    }
    function displayReturnCoins() {
        var coins = vendor.coinReturn.slice();
        var coinsStr = "";
        coins.forEach(function (coin) {
            coinsStr += '<tr><td>' + JSON.stringify(coin) + '</td></tr>';
        });
        console.log(coinsStr);
        $coinReturn.html(coinsStr);
    }

    function selectProduct(event) {
        var product = event.target.dataset.product;
        vendor.selectProduct(product);
        displayReturnCoins();
        checkDisplay();
    }

    $vendor.on('click', '.insertCoin', insertCoin);
    $vendor.on('click', '#returnCoins', returnCoins);
    $vendor.on('click', '.selectProduct', selectProduct);
    $vendor.on('click', '#checkDisplay', checkDisplay);
})