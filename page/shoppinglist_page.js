//declare a new function and assign result of function to shoppinglist page variable
var shoppinglist_page = function(){

    //declare local variables for all functional webelements in the page
    var addButton = element(by.buttonText('Add'))
    var updateButton = element(by.buttonText('Update'));
    var deleteButton = element(by.buttonText('Delete'));
    var clearButton = element(by.buttonText('Clear'));
    var nameField = element(by.id('name'));
    var amountField = element(by.id('amount'));
    var shoppingListItems = element.all(by.css('.list-group-item'));

    //declare method to click Add button
    this.addButton = function(){
        addButton.click();
    };

    //declare method to click Update button
    this.updateButton = function(){
        updateButton.click();
    };

    //declare method to click Delete button
    this.deleteButton = function(){
        deleteButton.click();
    };

    //declare method to click Clear button
    this.clearButton = function(){
        clearButton.click();
    };
    
    //declare method to add new shopping list name and amount
    this.enterNameAndAmount = function(nameValue, amountValue){
        //enter new name
        nameField.sendKeys(nameValue);
        //enter new value
        amountField.sendKeys(amountValue);
        //wait for 2 sceonds
        browser.driver.sleep(2000);
    };

    //declare method to select a required shopping list
    this.selectshoppinglistItem = function(index){
        shoppingListItems.get(index).click();
    };

    //declare method to update shopping list name
    this.updateName = function(newNameValue){
        //clear the existing name that is shown on selecting
        nameField.clear();
        //wait for 2 sceonds
        browser.driver.sleep(2000);
        //insert the new name
        nameField.sendKeys(newNameValue);
        //wait for 2 sceonds
        browser.driver.sleep(2000);
    };

    //declare method to update amount
    this.updateAmount = function(newAmountValue){
        //clear the existing name that is shown on selecting
        amountField.clear();
        browser.driver.sleep(2000);
         //insert the new value
        amountField.sendKeys(newAmountValue);
        browser.driver.sleep(2000);
    };

};
//to export the page as a shopping list page
module.exports = new shoppinglist_page();