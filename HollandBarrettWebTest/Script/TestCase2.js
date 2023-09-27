let browserAction = require("BrowserActions");
let appAction = require("ApplicationActions");
let loginPage = require("LoginPage");
let itemsSubmenuPages = require("ItemsSubmenuPages");
let basketPage = require("BasketPage");

function TestCase2(){
  let url, page;
  let browser = Aliases.browser;
  const vitaminC = ["Holland & Barrett Vitamin C 1000mg 240 Tablets"];
  const vitaminPrice = [];
  const chocolates = ["Raw Halo Vegan Pure Dark Raw Chocolate 70g"];
  const chocolatePrice =[];
  
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

  Log.AppendFolder("Add any Vitamin C products from 'Vitamins & Supplements' to the basket.");
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
    vitaminPrice.push(itemsSubmenuPages.GetItemPrice(page, vitaminC[i]));
    Log.PopLogFolder();
  }
  Log.Message(vitaminPrice);
  Log.PopLogFolder();
  
  Log.AppendFolder("Add any Vegan Chocolate products from 'Vegan' to the basket.");
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
    chocolatePrice.push(itemsSubmenuPages.GetItemPrice(page, chocolates[i]));
    Log.PopLogFolder();
  }
  Log.Message(chocolatePrice);
  Log.PopLogFolder();
  
  Log.AppendFolder("Verify both the products are added to the basket");
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