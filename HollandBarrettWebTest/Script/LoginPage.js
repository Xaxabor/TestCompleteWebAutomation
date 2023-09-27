function Login(email, password){
  let browser = Aliases.browser;
  aqObject.CheckProperty(browser.SignInPage.SignInToYourAccountText, "contentText", cmpEqual, "Sign in to your account, for the best experience");
  browser.SignInPage.EmailAddressTextField.SetText(email);
  browser.SignInPage.PasswordField.SetText(password);
  browser.SignInPage.SignInButton.Click();
}

function ValidateUserIsLoggedIn(){
  let browser = Aliases.browser;
  aqObject.CheckProperty(browser.RegisterPage.AccountCreatedText , "contentText", cmpEqual, "Account created");
  aqObject.CheckProperty(browser.RegisterPage.AccountCreatedSubtext, "contentText", cmpEqual, "Your account and Rewards For Life membership are ready. Sign in to your account and start browsing.");
}

module.exports = {
  Login : Login,
  ValidateUserIsLoggedIn : ValidateUserIsLoggedIn,
};