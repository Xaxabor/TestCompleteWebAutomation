function HandlingCookiesPopup(){
  let browser = Aliases.browser;
  let page = browser.HomePage
  if(page.YourCookieSettingsModalText.Exists){
    page.YesIAcceptButton.ClickButton();
    Log.Message("Cookies Setting Accepted");
  }else{
    Log.Message("Cookies Popup is not shown");
  }
}

function SignOut(){
  let browser = Aliases.browser;
  if(browser.LoggedInUserAccountTab.Exists){
    browser.LoggedInUserAccountTab.ScrollIntoView(true);
    browser.LoggedInUserAccountTab.HoverMouse();
    aqUtils.Delay(2000);
    browser.LoggedInUserAccountTab.SignOutButton.Click();
  }
}

function ClickOnSpecificButton(button){
  button.Click();
}

module.exports = {
  HandlingCookiesPopup : HandlingCookiesPopup,
  ClickOnSpecificButton : ClickOnSpecificButton,
  SignOut : SignOut
};