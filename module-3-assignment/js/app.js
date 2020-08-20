(
    function () {
        "use strict";

        angular.module("NarrowItDownApp", [])
            .controller("NarrowItDownController", NarrowItDownController)
            .service("MenuSearchService", MenuSearchService)
            .directive("foundItems", FoundItemsDirective)
            .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


        function FoundItemsDirective() {
            var ddo = {
                templateUrl: './foundList.html',
                scope: {
                    items: '<',
                    onRemove: '&'
                },
                controller: NarrowItDownListDirectiveController,
                controllerAs: 'list',
                bindToController: true,
                link: NarrowItDownListDirectiveLink,
                transclude: true
            };

            return ddo;
        }

        function NarrowItDownListDirectiveLink(scope, element, attrs, controller) {
            scope.$watch("list.notFound()", function (newValue, oldValue) {
                if (newValue === true) {
                    displayWarning();
                }
                else {
                    removeWarning();
                }
            });

            function displayWarning() {
                // Using Angular jqLite
                // var warningElem = element.find("div");
                // warningElem.css('display', 'block');

                // If jQuery included before Angular
                var warningElem = element.find("div.error");
                warningElem.slideDown(900);
            }

            function removeWarning() {
                // Using Angular jqLite
                // var warningElem = element.find('div');
                // warningElem.css('display', 'none');

                // If jQuery included before Angular
                var warningElem = element.find('div.error');
                warningElem.slideUp(900);
            }
        }


        function NarrowItDownListDirectiveController() {
            var list = this;

            list.notFound = function () {
                if (list.items === undefined || list.items.length == 0) {
                    return true;
                } else {
                    return false;
                }
            };

        }


        MenuSearchService.$inject = ["$http", "ApiBasePath"];

        function MenuSearchService($http, ApiBasePath) {
            var service = this;

            service.getMatchedMenuItems = function (searchTerm) {
                var foundItems = [];
                if (searchTerm !== "") {
                    return $http({
                        method: "GET",
                        url: (ApiBasePath + "/menu_items.json"),
                    }).then(
                        function (result) {
                            var mItems = result.data.menu_items;
                            for (let index = 0; index < mItems.length; index++) {
                                const element = mItems[index];
                                var n = element.description.toLowerCase().includes(searchTerm.toLowerCase());
                                if (n == true) {
                                    // console.log(element.name);
                                    foundItems.push(element);
                                }
                            }

                            // if (foundItems.length === 0) {
                            //     console.log("Not found");
                            // } else {
                            //     console.log("Items Found : " + foundItems.length);
                            // }
                            return foundItems;
                        },
                    ).catch(function (error) {
                        console.error(error);
                    });
                } else {
                    return [];
                }
            };
        }


        NarrowItDownController.$inject = ["MenuSearchService"];

        function NarrowItDownController(MenuSearchService) {

            var narrow = this;

            narrow.searchTerm = "";
            narrow.warning = "";
            narrow.found = [];

            narrow.loading = false;

            narrow.narrowitdown = function () {
                if (narrow.searchTerm === "") {
                    narrow.warning = "Nothing found!";
                    // console.log("empty");
                }
                else {
                    try {
                        narrow.loading = true;
                        narrow.warning = "";
                        console.log("Getting data...");
                        var response = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
                        response.then(
                            function (result) {
                                narrow.found = result;
                                if (result.length == 0) {
                                    narrow.warning = "Nothing found!"
                                    narrow.loading = false;
                                } else {
                                    narrow.warning = "";
                                }
                                // console.log(narrow.found);  // this is array of objs
                            }
                        );
                    } catch (error) {
                        console.error(error);
                    }
                }
            };

            narrow.removeItem = function (itemIndex) {
                narrow.found.splice(itemIndex, 1);
            };

        }
    }
)();