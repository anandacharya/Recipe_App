var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "TC1-Verify if website opened or not|recipe app tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b18e1c0b27b2b8e7da85ea9ebede59b0",
        "instanceId": 544,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/recipes - Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://d3udvtnhu4gqbm.cloudfront.net/wp-content/uploads/Italian-Sausage.jpg'. This content should also be served over HTTPS.",
                "timestamp": 1537468900475,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/recipes - Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/efdcvsbnlily8s1damfz/taco-meat-leftovers-recipes'. This content should also be served over HTTPS.",
                "timestamp": 1537468900475,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/recipes - Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/v1/msi/ivenjnophdgmridughl3/dinner-recipes-under-300-calories'. This content should also be served over HTTPS.",
                "timestamp": 1537468900476,
                "type": ""
            }
        ],
        "screenShotFile": "0097002f-0036-0081-00fc-00b2007d00b9.png",
        "timestamp": 1537468874123,
        "duration": 29341
    },
    {
        "description": "TC2-Verify all receipes in the recipe page|recipe app tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b18e1c0b27b2b8e7da85ea9ebede59b0",
        "instanceId": 544,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://d3udvtnhu4gqbm.cloudfront.net/wp-content/uploads/Italian-Sausage.jpg'. This content should also be served over HTTPS.",
                "timestamp": 1537468906633,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/efdcvsbnlily8s1damfz/taco-meat-leftovers-recipes'. This content should also be served over HTTPS.",
                "timestamp": 1537468906641,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/v1/msi/ivenjnophdgmridughl3/dinner-recipes-under-300-calories'. This content should also be served over HTTPS.",
                "timestamp": 1537468906646,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes/1' was loaded over HTTPS, but requested an insecure image 'http://d3udvtnhu4gqbm.cloudfront.net/wp-content/uploads/Italian-Sausage.jpg'. This content should also be served over HTTPS.",
                "timestamp": 1537468908215,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes/2' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/efdcvsbnlily8s1damfz/taco-meat-leftovers-recipes'. This content should also be served over HTTPS.",
                "timestamp": 1537468908745,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes/3' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/v1/msi/ivenjnophdgmridughl3/dinner-recipes-under-300-calories'. This content should also be served over HTTPS.",
                "timestamp": 1537468909296,
                "type": ""
            }
        ],
        "screenShotFile": "003c0079-0008-003d-00c1-001000e600cd.png",
        "timestamp": 1537468905335,
        "duration": 4683
    },
    {
        "description": "TC3-Verify shopping page list is opened or not|recipe app tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b18e1c0b27b2b8e7da85ea9ebede59b0",
        "instanceId": 544,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://d3udvtnhu4gqbm.cloudfront.net/wp-content/uploads/Italian-Sausage.jpg'. This content should also be served over HTTPS.",
                "timestamp": 1537468916773,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/efdcvsbnlily8s1damfz/taco-meat-leftovers-recipes'. This content should also be served over HTTPS.",
                "timestamp": 1537468916780,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/v1/msi/ivenjnophdgmridughl3/dinner-recipes-under-300-calories'. This content should also be served over HTTPS.",
                "timestamp": 1537468916785,
                "type": ""
            }
        ],
        "screenShotFile": "00b900b6-0010-0056-00f9-00eb00a600e6.png",
        "timestamp": 1537468914575,
        "duration": 5970
    },
    {
        "description": "TC4-Verify adding new shopping item name and amount to the chinese chicken shopping list|recipe app tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b18e1c0b27b2b8e7da85ea9ebede59b0",
        "instanceId": 544,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://d3udvtnhu4gqbm.cloudfront.net/wp-content/uploads/Italian-Sausage.jpg'. This content should also be served over HTTPS.",
                "timestamp": 1537468922885,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/efdcvsbnlily8s1damfz/taco-meat-leftovers-recipes'. This content should also be served over HTTPS.",
                "timestamp": 1537468922889,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/v1/msi/ivenjnophdgmridughl3/dinner-recipes-under-300-calories'. This content should also be served over HTTPS.",
                "timestamp": 1537468922893,
                "type": ""
            }
        ],
        "screenShotFile": "0012006e-00c7-0068-00d2-00c300a50037.png",
        "timestamp": 1537468920968,
        "duration": 8639
    },
    {
        "description": "TC5-Verify to update item name in shopping list of Sausage Casserole recipe|recipe app tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b18e1c0b27b2b8e7da85ea9ebede59b0",
        "instanceId": 544,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://d3udvtnhu4gqbm.cloudfront.net/wp-content/uploads/Italian-Sausage.jpg'. This content should also be served over HTTPS.",
                "timestamp": 1537468931861,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/efdcvsbnlily8s1damfz/taco-meat-leftovers-recipes'. This content should also be served over HTTPS.",
                "timestamp": 1537468931865,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/v1/msi/ivenjnophdgmridughl3/dinner-recipes-under-300-calories'. This content should also be served over HTTPS.",
                "timestamp": 1537468931871,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes/1' was loaded over HTTPS, but requested an insecure image 'http://d3udvtnhu4gqbm.cloudfront.net/wp-content/uploads/Italian-Sausage.jpg'. This content should also be served over HTTPS.",
                "timestamp": 1537468932730,
                "type": ""
            }
        ],
        "screenShotFile": "006800a0-0097-001d-007b-007700530024.png",
        "timestamp": 1537468929961,
        "duration": 15758
    },
    {
        "description": "TC6-Verify to update item amount in shopping list of Taco Meat recipe|recipe app tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b18e1c0b27b2b8e7da85ea9ebede59b0",
        "instanceId": 544,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/recipes - Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://d3udvtnhu4gqbm.cloudfront.net/wp-content/uploads/Italian-Sausage.jpg'. This content should also be served over HTTPS.",
                "timestamp": 1537468948527,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/recipes - Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/efdcvsbnlily8s1damfz/taco-meat-leftovers-recipes'. This content should also be served over HTTPS.",
                "timestamp": 1537468948527,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/recipes - Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/v1/msi/ivenjnophdgmridughl3/dinner-recipes-under-300-calories'. This content should also be served over HTTPS.",
                "timestamp": 1537468948527,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes/2' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/efdcvsbnlily8s1damfz/taco-meat-leftovers-recipes'. This content should also be served over HTTPS.",
                "timestamp": 1537468949192,
                "type": ""
            }
        ],
        "screenShotFile": "0008008f-003c-00b7-00bb-007d00920020.png",
        "timestamp": 1537468946107,
        "duration": 11048
    },
    {
        "description": "TC7-Verify to delete item in shopping list of Egg delight recipe|recipe app tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b18e1c0b27b2b8e7da85ea9ebede59b0",
        "instanceId": 544,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://d3udvtnhu4gqbm.cloudfront.net/wp-content/uploads/Italian-Sausage.jpg'. This content should also be served over HTTPS.",
                "timestamp": 1537468959404,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/efdcvsbnlily8s1damfz/taco-meat-leftovers-recipes'. This content should also be served over HTTPS.",
                "timestamp": 1537468959408,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/v1/msi/ivenjnophdgmridughl3/dinner-recipes-under-300-calories'. This content should also be served over HTTPS.",
                "timestamp": 1537468959412,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes/3' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/v1/msi/ivenjnophdgmridughl3/dinner-recipes-under-300-calories'. This content should also be served over HTTPS.",
                "timestamp": 1537468959963,
                "type": ""
            }
        ],
        "screenShotFile": "008d007e-00d3-007d-005d-002900ea0027.png",
        "timestamp": 1537468957501,
        "duration": 5682
    },
    {
        "description": "TC8-Verify Clear button in shopping list of Fried EggPlant recipe|recipe app tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b18e1c0b27b2b8e7da85ea9ebede59b0",
        "instanceId": 544,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://d3udvtnhu4gqbm.cloudfront.net/wp-content/uploads/Italian-Sausage.jpg'. This content should also be served over HTTPS.",
                "timestamp": 1537468965777,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/efdcvsbnlily8s1damfz/taco-meat-leftovers-recipes'. This content should also be served over HTTPS.",
                "timestamp": 1537468965784,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://receipe-app.herokuapp.com/vendor.f065990f82689f46d80f.bundle.js 0 Mixed Content: The page at 'https://receipe-app.herokuapp.com/recipes' was loaded over HTTPS, but requested an insecure image 'http://cdn.skim.gs/images/v1/msi/ivenjnophdgmridughl3/dinner-recipes-under-300-calories'. This content should also be served over HTTPS.",
                "timestamp": 1537468965787,
                "type": ""
            }
        ],
        "screenShotFile": "004c0004-0069-00a0-0089-00cb008d0063.png",
        "timestamp": 1537468963723,
        "duration": 6277
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
