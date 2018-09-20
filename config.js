var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
    
    //the address of the running selenium server
    seleniumAddress: 'http://localhost:4444/wd/hub',
    
    //Spec patters are relative to the current working directory when
    //protractor is called
    specs: ['./test/*_spec.js'],

    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/report/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
           baseDirectory: 'report/screenshots'
        }).getJasmine2Reporter());

        //set defaultTimeoutInterval
        jasmine.getEnv().defaultTimeoutInterval =360000;
     }

    //capabilities to be passed the the webdriver instance.
    //default is chrome
    /*multicapabilities: [{
        browserName: 'firefox'
    }, {
        browserName: 'chrome'
    }]*/
};