//import the shpooinglist page that is linked to the homepage
require ('./shoppinglist_page.js');

//declare a new function and assign result of function to homepage variable
var home_page = function(){
    
    //declare local variables for all functional webelements in the page
    var chineseChicken = element(by.cssContainingText('.media-heading ','Chinese Chicken'));
    var sausageCasserole = element(by.cssContainingText('.media-heading ','Sausage Casserole'));
    var tacoMeatReceipe = element(by.cssContainingText('.media-heading ','Taco Meat Recipe'));
    var eggDelight = element(by.cssContainingText('.media-heading ','Egg delight'));
    var friedEggPlant = element(by.cssContainingText('.media-heading ','Fried EggPlant'));
    var manageRecipeButton = element(by.buttonText('Manage Recipes'));
    var addToShoppingListdd = element(by.xpath('//*[@id="dropdown"]/li[1]/button'));

    //declare method to view chinese chicken receipe
    this.selectChineseChicken = function(){ 
        chineseChicken.click();
    };

    //declare method to view sausage casserole receipe
    this.selectSausageCasserole = function(){
        sausageCasserole.click();
    };

    //declare method to view taco meat receipe
    this.selectTacoMeatReceipe = function(){
        tacoMeatReceipe.click();
    };

    //declare method to view egg delight receipe
    this.selectEggDelight = function(){
        eggDelight.click();
    };

    //declare method to view fried edd plan receipe
    this.selectFriedEggPlant = function(){
        friedEggPlant.click();
    };

    //declare method click manage recipe button
    this.manageRecipes = function(){
        manageRecipeButton.click();
        //wait for 2 seconds
        browser.driver.sleep(2000);
    };

    //declare a method to select Add to Shopping List from dropdown menu
    this.addToShoppingList = function(){
        addToShoppingListdd.click();
        //return a reference of the other page
        return require('./shoppinglist_page.js');
    };
};
//to export the page as a home page
module.exports= new home_page();