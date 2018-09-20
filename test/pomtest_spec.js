//create a test suite
describe('recipe app tests',function(){

    //this code will run before each test
    beforeEach(function(){
        //open the url
        browser.get('https://receipe-app.herokuapp.com/recipes');
    });

    afterEach(function(){
        //clear browser cache and cookies
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    //import homepage functions
    var homepage = require('../page/home_page.js');

    //Test case 1
    it('TC1-Verify if website opened or not', function(){
        expect(browser.getCurrentUrl()).toEqual("https://receipe-app.herokuapp.com/recipes");
    });

    //Test case 2
    it('TC2-Verify all receipes in the recipe page', function(){
        //verify presense of chinese chicken recipe
        homepage.selectChineseChicken();
        expect(element(by.cssContainingText('h1','Chinese Chicken')).isPresent()).toBe(true);
        
        //verify presense of sausage casserole recipe
        homepage.selectSausageCasserole();
        expect(element(by.cssContainingText('h1','Sausage Casserole')).isPresent()).toBe(true);
        
        //verify presense of taco meat recipe
        homepage.selectTacoMeatReceipe();
        expect(element(by.cssContainingText('h1','Taco Meat Recipe')).isPresent()).toBe(true);
        
        //verify presense of egg delight recipe
        homepage.selectEggDelight();
        expect(element(by.cssContainingText('h1','Egg delight')).isPresent()).toBe(true);
        
        //verify presense of fried egg plant recipe
        homepage.selectFriedEggPlant();
        expect(element(by.cssContainingText('h1','Fried EggPlant')).isPresent()).toBe(true);
    });

    //Test case 3
    it('TC3-Verify shopping page list is opened or not',function(){
        //call method to select recipe
        homepage.selectChineseChicken();
        //call method to click Manage Recipe button
        homepage.manageRecipes();
        //call method to click the add to shopping list menu drop down
        var shoppinglist_page = homepage.addToShoppingList();
        //verify result
        expect(browser.getCurrentUrl()).toEqual("https://receipe-app.herokuapp.com/shopping-list");
    });

    //Test case 4
    it('TC4-Verify adding new shopping item name and amount to the chinese chicken shopping list',function(){
        //call method to select recipe
        homepage.selectChineseChicken();
        //call method to click Manage Recipe button
        homepage.manageRecipes();
        //call method to click the add to shopping list menu drop down
        var shoppinglist_page = homepage.addToShoppingList();
        //call method to enter new shopping item and amount
        shoppinglist_page.enterNameAndAmount('Onions','5');
        //call method to click add button to add new shopping item and amount to shopping list
        shoppinglist_page.addButton();
        //verify result
        expect(element(by.cssContainingText('.list-group-item','Onions (5)')).isPresent()).toBe(true);
    });
    
    //Test case 5
    it('TC5-Verify to update item name in shopping list of Sausage Casserole recipe',function(){
        //call method to select recipe
        homepage.selectSausageCasserole();
        //call method to click Manage Recipe button
        homepage.manageRecipes();
        //call method to click the add to shopping list menu drop down
        var shoppinglist_page = homepage.addToShoppingList();
        //Call method to select firt record of the shopping list
        shoppinglist_page.selectshoppinglistItem(0);
        //call method to update name of the selected shopping item
        shoppinglist_page.updateName('Chicken Sausage');
        //call method to click update button
        shoppinglist_page.updateButton();
        //verify result
        expect(element(by.cssContainingText('.list-group-item','Chicken Sausage')).isPresent()).toBe(true);
        //Call method to select second record of the shopping list
        shoppinglist_page.selectshoppinglistItem(1);
        //call method to update name of the selected shopping item
        shoppinglist_page.updateName('tomatoes');
        //call method to click update button
        shoppinglist_page.updateButton();
        //verify result
        expect(element(by.cssContainingText('.list-group-item','tomatoes')).isPresent()).toBe(true);
    });

    //Test case 6
    it('TC6-Verify to update item amount in shopping list of Taco Meat recipe',function(){
        //call method to select recipe
        homepage.selectTacoMeatReceipe();
        //call method to click Manage Recipe button
        homepage.manageRecipes();
        //call method to click the add to shopping list menu drop down
        var shoppinglist_page = homepage.addToShoppingList();
        //Call method to select firt record of the shopping list
        shoppinglist_page.selectshoppinglistItem(0);
        //call method to update amount of the selected shopping item
        shoppinglist_page.updateAmount('5');
        //call method to click update button
        shoppinglist_page.updateButton();
        //verify result
        expect(element(by.cssContainingText('.list-group-item','(5)')).isPresent()).toBe(true);
    });

    //Test case 7
    it('TC7-Verify to delete item in shopping list of Egg delight recipe',function(){
        //call method to select recipe
        homepage.selectEggDelight();
        //call method to click Manage Recipe button
        homepage.manageRecipes();
        //call method to click the add to shopping list menu drop down
        var shoppinglist_page = homepage.addToShoppingList();            
        //Call method to select firt record of the shopping list
        shoppinglist_page.selectshoppinglistItem(0);
        //call method to delete the selected record
        shoppinglist_page.deleteButton();
    });

    //Test case 8
    it('TC8-Verify Clear button in shopping list of Fried EggPlant recipe',function(){
        //call method to select recipe
        homepage.selectFriedEggPlant();
        //call method to click Manage Recipe button
        homepage.manageRecipes();
        //call method to click the add to shopping list menu drop down
        var shoppinglist_page = homepage.addToShoppingList();            
        //Call method to select firt record of the shopping list
        shoppinglist_page.selectshoppinglistItem(1);
        //call method to clear the selected record
        shoppinglist_page.clearButton();
        //verify result
        element(by.id('name')).getText().then(function(text){
            expect(text).toEqual('');
        });
    });
});