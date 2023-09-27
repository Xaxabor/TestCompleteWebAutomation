function AddItemToCart(page, item){
  let element = page.FindChildByXPath("//div[@data-test='list-Products']//div[text()=\""+ item +"\"]");
  if (!(element.Exists)) {
    let addToBasketElement = page.FindChildByXPath("//div[@data-test='list-Products']//div[text()=\""+ item +"\"]/../..//div[text()='Add to basket']");
    //addToBasketElement.ScrollIntoView(true);
    //Log.Message("Scrolled to the "+item+" successfully.");
    addToBasketElement.click();
    Log.Message(item+ " is added to the Basket.");
  } else {
    Log.Warning(item +" not found");
  }
}

function GetItemPrice(page, item){
  let priceElement = page.FindChildByXPath("//div[@data-test='list-Products']//div[text()=\""+ item +"\"]/../..//div[(contains(@class, 'ProductCard-module_price_')) or (contains(@class, 'ProductCard-module_finalPrice_'))]");
  if (!(priceElement === null)){
    priceElement.ScrollIntoView(true);
    return priceElement.innerText;
  }
}

function FilterWithCatagory(page, catagory){
  element = page.FindChildByXPath("//label[text()='"+catagory+"']/..//input");
  Log.Message("Filtering with "+ catagory);
  if (!(element === null) && (element.Exists)) {
    element.ScrollIntoView(true);
    Log.Message("Scrolled to '"+ catagory +"' checkbox successfully.");
    element.click();
    Log.Message("'"+ catagory +"' checkbox is checked");
  }else{
    Log.Warning("'"+ catagory +"' checkbox is not found");
  }
}

module.exports ={
  AddItemToCart : AddItemToCart,
  GetItemPrice : GetItemPrice,
  FilterWithCatagory : FilterWithCatagory
};