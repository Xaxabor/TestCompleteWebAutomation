let browserAction = require("BrowserActions");
let appAction = require("ApplicationActions");
let registrationPage = require("RegistrationPage");
let util = require("Util");

function TestCase1(){
  
  Log.AppendFolder("Open the website.");
  let url, page;
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
  
  Log.AppendFolder("Click on Rewards section");
  let browser = Aliases.browser;
  Log.Message("Clicking on "+ browser.RewardsNavigationButton.contentText+ " navigation button from top");
  appAction.ClickOnSpecificButton(browser.RewardsNavigationButton);
  page.Wait();
  Log.PopLogFolder();
  
  Log.AppendFolder("Click on account and then \"Create account\"");
  aqObject.CheckProperty(browser.SignInPage.SignInToYourAccountText, "contentText", cmpEqual, "Sign in to your account, for the best experience");
  aqObject.CheckProperty(browser.SignInPage.DontHaveAnAccountYetText, "contentText", cmpEqual, "Don't have an account yet ?");
  Log.Message("Clicking on "+ browser.SignInPage.SignUpLink.contentText+ " link");
  appAction.ClickOnSpecificButton(browser.SignInPage.SignUpLink);
  page.Wait();
  Log.PopLogFolder();
  
  Log.AppendFolder("Create account");
  const randomString = util.GenerateRandomString(8);
  const fname = "F"+randomString;
  const lname = "L"+randomString;
  const email = randomString + "@gmail.com";
  Project.Variables.$set("VariableByName", "Email", email);
  Log.Message(Project.Variables.Email);
  const password = Project.Variables.Password;
  registrationPage.RegisterToApplication(fname, lname, email, password);
  page.Wait();
  registrationPage.ValidateAccountCreated();
  browser.RegisterPage.SignInButton.Click();
  page.Wait();
  browserAction.CloseBrowser();
  Log.PopLogFolder();
}

