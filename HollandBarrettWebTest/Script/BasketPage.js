function ValidatingItemIsPresentInTheBasket(page, item){
  let element = page.FindChildByXPath("//h3[@data-test='title' and text()=\""+ item +"\"]");
  if(!(element === null)){
    aqObject.CheckProperty(element, "contentText", cmpEqual, item);
  }else{
    Log.Warning(item+ " is not found in Basket");
  }
}

function ValidatingItemPriceInTheBasket(page, item, itemPrice){
  let element = page.FindChildByXPath("//h3[@data-test='title' and text()=\""+ item +"\"]/../../following-sibling::div//div[contains(@class,'product__price-now animate')]");
  if(!(element === null)){
    aqObject.CheckProperty(element, "contentText", cmpEqual, itemPrice);
  }else{
    Log.Warning(item+ " price is not found in Basket");
  }
}

function ValidatingItemAmountInTheBasket(page, item, amount){
  let element = page.FindChildByXPath("//h3[@data-test='title' and text()=\""+ item +"\"]/../../../..//input");
  if(!(element === null)){
    aqObject.CheckProperty(element, "getAttribute(\"value\")", cmpEqual, amount);
  }else{
    Log.Warning(item+ " amount is not found in Basket");
  }
}

function DeletingSpecificItemFromBasket(page, item){
  let element = page.FindChildByXPath("//h3[@data-test='title' and text()=\""+ item +"\"]/../../../..//button[@data-test='remove']");
  if(!(element === null)){
    element.ScrollIntoView(true);
    element.click();
    Log.Message(item+ " removed from Basket");
    page.Wait();
  }else{
    Log.Warning(item+ " is not found in Basket");
  }

}

function DeletingAllItemFromBasket(){
  Aliases.browser.BasketNavigationButton.Click();
  page = Sys.Browser().Page("*");
  page.Wait();
  let locator = "//h3[@data-test='title']/../../../..//button[@data-test='remove']";
  element = page.FindChildByXPath(locator);  
  
  while(!(element === null)){
    //element.ScrollIntoView(true);
    element.click();
    page.Wait();
    element = page.FindChildByXPath(locator);
  }
}

module.exports = {
  ValidatingItemIsPresentInTheBasket : ValidatingItemIsPresentInTheBasket,
  ValidatingItemPriceInTheBasket : ValidatingItemPriceInTheBasket,
  ValidatingItemAmountInTheBasket : ValidatingItemAmountInTheBasket,
  DeletingSpecificItemFromBasket : DeletingSpecificItemFromBasket,
  DeletingAllItemFromBasket : DeletingAllItemFromBasket
};