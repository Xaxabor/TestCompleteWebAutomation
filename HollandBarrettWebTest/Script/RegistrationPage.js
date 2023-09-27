function RegisterToApplication(fname, lname, email, password){
  let browser = Aliases.browser;
  aqObject.CheckProperty(browser.RegisterPage.CreateAnAccountText, "contentText", cmpEqual, "Create an account");
  browser.RegisterPage.FirstNameTextField.SetText(fname);
  browser.RegisterPage.LastNameTextField.SetText(lname);
  browser.RegisterPage.EmailAddressTextField.SetText(email);
  browser.RegisterPage.ConfirmEmailAddressTextField.SetText(email);
  browser.RegisterPage.CreateAPasswordField.SetText(password);
  browser.RegisterPage.TermsAndConditionsCheckbox.ClickChecked(true);
  aqObject.CheckProperty(browser.RegisterPage.CreateAnAccountButton, "Enabled", cmpEqual, true);
  browser.RegisterPage.CreateAnAccountButton.Click();
}

function ValidateAccountCreated(){
  let browser = Aliases.browser;
  aqObject.CheckProperty(browser.RegisterPage.AccountCreatedText , "contentText", cmpEqual, "Account created");
  aqObject.CheckProperty(browser.RegisterPage.AccountCreatedSubtext, "contentText", cmpEqual, "Your account and Rewards For Life membership are ready. Sign in to your account and start browsing.");
}

module.exports = {
  RegisterToApplication : RegisterToApplication,
  ValidateAccountCreated : ValidateAccountCreated,
};