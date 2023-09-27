let browserAction = require("BrowserActions");
let appAction = require("ApplicationActions");
let loginPage = require("LoginPage");
let itemsSubmenuPages = require("ItemsSubmenuPages");
let basketPage = require("BasketPage");

function VitaminCTestDataRetrieve(list){
  DDT.ExcelDriver("TestData.xlsx", "Sheet1");
  while (! DDT.CurrentDriver.EOF()){
    list.push(DDT.CurrentDriver.Value("VitaminC Item"));
    DDT.CurrentDriver.Next();
  }
}

function ChocolateTestDataRetrieve(list){
  DDT.ExcelDriver("TestData.xlsx", "Sheet2");
  while (! DDT.CurrentDriver.EOF()){
    list.push(DDT.CurrentDriver.Value("Vegan Chocolate Item"));
    DDT.CurrentDriver.Next();
  }
}

function TestCase3(){
  let url, page;
  let actualSubtotal, actualDelivery, actualSavings, actualTotal, expectedSubtotal, expectedTotal, subTotalWithSaving = 0;
  let browser = Aliases.browser;
  const vitaminC = [];
  const chocolates =[];
  const vitaminPrice = [];
  const chocolatePrice =[];
  VitaminCTestDataRetrieve(vitaminC);
  ChocolateTestDataRetrieve(chocolates);
  Log.Message(vitaminC);
  Log.Message(chocolates);

  Log.AppendFolder("Open the website.");
  browserAction.LauchEdgeBrowser();
  url = Project.Variables.HomePageUrl;
  browserAction.NavigateToUrl(url);
  page = Sys.Browser().Page("*");
  page.Wait();
  appAction.SignOut();
  page.Wait();
  appAction.HandlingCookiesPopup();
  page.Wait();
  Log.PopLogFolder();
  
  Log.AppendFolder("Login with the registered user");
  Log.Message("Clicking on "+ browser.RewardsNavigationButton.contentText+ " navigation button from top");
  browser.RewardsNavigationButton.Click();
  page.Wait();
  loginPage.Login(Project.Variables.Email, Project.Variables.Password)
  Log.PopLogFolder();

  Log.AppendFolder("Clearing Basket ...");
  basketPage.DeletingAllItemFromBasket();
  Log.PopLogFolder();

  Log.AppendFolder("Add any 2 Vitamin C products from 'Vitamins & Supplements' to the basket.");
  let menu = browser.VitaminsSupplementsMenu;
  let submenu = menu.VitaminCSubMenu;
  Log.Message("Navigating to '"+ menu.innerText +"' > '"+submenu.innerText+"' submenu");
  menu.HoverMouse();
  aqUtils.Delay(2000);
  submenu.Click();
  page.Wait();
  for (let i = 0; i < vitaminC.length; i++) {
    Log.AppendFolder("Adding "+ vitaminC[i] +" Product in Basket");
    itemsSubmenuPages.AddItemToCart(page, vitaminC[i]);
    page.Wait();
    let price = itemsSubmenuPages.GetItemPrice(page, vitaminC[i]);
    vitaminPrice.push(price);
    subTotalWithSaving = subTotalWithSaving + parseFloat(price.replace(/[^\d.-]/g, ''));
    Log.PopLogFolder();
  }
  Log.Message(vitaminPrice);
  Log.PopLogFolder();
  
  Log.AppendFolder("Add any 3 Vegan Chocolate products from 'Vegan' to the basket.");
  menu = browser.FoodDrinkMenu;
  submenu = menu.ChocolateCakesBiscuitsSubmenu;
  Log.Message("Navigating to '"+ menu.innerText +"' > '"+submenu.innerText+"' submenu");
  menu.HoverMouse();
  aqUtils.Delay(2000);
  submenu.Click();
  page.Wait();
  itemsSubmenuPages.FilterWithCatagory(page, "Vegan");
  page.Wait();
  for (let i = 0; i < chocolates.length; i++) {
    Log.AppendFolder("Adding "+ chocolates[i] +" Product in Basket");
    itemsSubmenuPages.AddItemToCart(page, chocolates[i]);
    page.Wait();
    let price = itemsSubmenuPages.GetItemPrice(page, chocolates[i]);
    chocolatePrice.push(price);
    subTotalWithSaving = subTotalWithSaving + parseFloat(price.replace(/[^\d.-]/g, ''));
    Log.PopLogFolder();
  }
  Log.Message(chocolatePrice);
  Log.PopLogFolder();
  
  Log.AppendFolder("Verify all the products are added to the basket.");
  browser.BasketNavigationButton.Click();
  page.Wait();
  for (let i = 0; i < vitaminC.length; i++) {
    basketPage.ValidatingItemIsPresentInTheBasket(page, vitaminC[i]);
    basketPage.ValidatingItemPriceInTheBasket(page, vitaminC[i], vitaminPrice[i]);
    basketPage.ValidatingItemAmountInTheBasket(page, vitaminC[i], 1);
  }
  for (let i = 0; i < chocolates.length; i++) {
    basketPage.ValidatingItemIsPresentInTheBasket(page, chocolates[i]);
    basketPage.ValidatingItemPriceInTheBasket(page, chocolates[i], chocolatePrice[i]);
    basketPage.ValidatingItemAmountInTheBasket(page, chocolates[i], 1);
  }
  Log.PopLogFolder();
  
  Log.AppendFolder("Verify the subtotal of the products (quantity * price) and total of the basket.");  
  let elementSavings = page.FindChildByXPath("//div[text()='Savings']/following-sibling::div");
  actualSavings = parseFloat((elementSavings.contentText).replace(/[^\d.-]/g, ''));
  let elementDelivery = page.FindChildByXPath("//div[text()='Default Delivery']/following-sibling::div");
  actualDelivery = parseFloat((elementDelivery.contentText).replace(/[^\d.-]/g, ''));
  let elementActualSubtotal = page.FindChildByXPath("//div[text()='Subtotal']/following-sibling::div");
  actualSubtotal = parseFloat((elementActualSubtotal.contentText).replace(/[^\d.-]/g, ''));
  let elementActualTotal = page.FindChildByXPath("//div[text()='Total']/following-sibling::div");
  actualTotal = parseFloat((elementActualTotal.contentText).replace(/[^\d.-]/g, ''));
  
  Log.Message("Saving: " + actualSavings);
  Log.Message('Default Delivery: ' + actualDelivery);
  Log.Message('Actual Subtotal: ' + actualSubtotal);
  Log.Message("Actual total: " + actualTotal);
  
  expectedSubtotal= (subTotalWithSaving - actualSavings).toFixed(2);
  expectedTotal = (subTotalWithSaving + actualDelivery).toFixed(2);
  Log.Message("Expected subtotal: "+ expectedSubtotal);
  Log.Message("Expected total: "+ expectedTotal);
  
  if(expectedSubtotal === actualSubtotal.toFixed(2)){
    Log.Message(actualSubtotal + " actual subtotal price is same as expected subtotal price "+ expectedSubtotal);
  }else{
    Log.Warning(actualSubtotal + " actual subtotal price is NOT same as expected subtotal price "+ expectedSubtotal);
  }
  if(expectedTotal === actualTotal.toFixed(2)){
    Log.Message(actualTotal + " actual total price is same as expected Total price "+ expectedTotal);
  }else{
    Log.Warning(actualTotal + " actual total price is NOT same as expected Total price "+ expectedTotal);
  }
  Log.PopLogFolder();
  
  Log.AppendFolder("Clearing the basket, Signing out and Closing Browser");
  for (let i = 0; i < vitaminC.length; i++) {
    basketPage.DeletingSpecificItemFromBasket(page, vitaminC[i]);
  }
  for (let i = 0; i < chocolates.length; i++) {
    basketPage.DeletingSpecificItemFromBasket(page, chocolates[i]);
  }
  appAction.SignOut();
  page.Wait();
  browserAction.CloseBrowser();
  Log.PopLogFolder();
}