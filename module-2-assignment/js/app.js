(
    function () {
        'use strict';

        angular.module("ShoppinhListCheckOff", [])
            .controller("ToBuyController", ToBuy)
            .controller("AlreadyBoughtController", AlreadyBought)
            .service("ShoppingListCheckOffService", ShoppingListCheckOff)
            ;

        ToBuy.$inject = ["ShoppingListCheckOffService"];

        function ToBuy(ShoppingListCheckOffService) {
            var toBuy = this;

            toBuy.itemName = "";
            toBuy.itemQuantity = "";

            toBuy.addItem = function () {
                ShoppingListCheckOffService.buyItem(toBuy.itemName, toBuy.itemQuantity);
                checkBought();
            }

            toBuy.bought = function (index) {
                ShoppingListCheckOffService.boughtItem(index);
                checkBought();
            }

            toBuy.items = ShoppingListCheckOffService.getToBuyItems();

            function checkBought() {
                if (toBuy.items.length == 0) {
                    toBuy.show = true;
                }
                else {
                    toBuy.show = false;
                }
            }

        }


        AlreadyBought.$inject = ["ShoppingListCheckOffService"];

        function AlreadyBought(ShoppingListCheckOffService) {
            var alreadyBought = this;

            alreadyBought.getBoughtItems = ShoppingListCheckOffService.getBoughtItems();

            alreadyBought.removeBoughtItems = function (index) {
                ShoppingListCheckOffService.removeBought(index);
            }

            alreadyBought.boughtAtleastOne = function () {
                return ShoppingListCheckOffService.bought();
            }

        }

        function ShoppingListCheckOff() {
            var service = this;

            var toBuy = [
                {
                    name: "Cookies",
                    quantity: "1 Bag"
                },
                {
                    name: "Coke",
                    quantity: "10 bottles"
                },
                {
                    name: "Chips",
                    quantity: "7 Bag"
                },
                {
                    name: "Chocolate",
                    quantity: "1 Bar"
                },
                {
                    name: "Pizza",
                    quantity: "1 Box"
                },
                {
                    name: "Jelly",
                    quantity: "1 Cup"
                },
            ];
            var alreadyBought = [];

            service.bought = function () {
                return false;
            };

            service.buyItem = function (itemName, quantity) {
                var item = {
                    name: itemName,
                    quantity: quantity
                };
                toBuy.push(item);
            };

            service.getToBuyItems = function () {
                return toBuy;
            };

            service.getBoughtItems = function () {
                return alreadyBought;
            }

            service.boughtItem = function (indexId) {
                service.bought = function () {
                    return true;
                };
                alreadyBought.push(toBuy[indexId]);
                toBuy.splice(indexId, 1);
            };

            service.removeBought = function (indexId) {
                alreadyBought.splice(indexId, 1);
            }
        }

    }
)();