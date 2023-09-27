function FindElements_Example()
{
  let browser = Sys.Browser();
  let page = browser.Page("*");
  let articles = page.FindElements("//article");

  if (articles.length > 0)
  {
    for (let i = 0; i < articles.length; i++)
    {
      Log.Message(articles[i].innerText);
    }
  }
  else
  {
    Log.Message("No ARTICLE element is found on the page.");
  }
}

function SendEmail(mFrom, mTo, mSubject, mBody, mAttach)
{
  let schema, mConfig, mMessage;
  try
  {
    schema = "http://schemas.microsoft.com/cdo/configuration/";
    mConfig = getActiveXObject("CDO.Configuration");
    mConfig.Fields.$set("Item", schema + "sendusing", 2); // cdoSendUsingPort
    mConfig.Fields.$set("Item", schema + "smtpusessl", 1); // Use SSL
    mConfig.Fields.$set("Item", schema + "smtpserver", "ServerName"); // SMTP server
    mConfig.Fields.$set("Item", schema + "smtpserverport", 465); // Port number

    // If you use Gmail --
    // Enable the Allow less secure apps option for your account
    // mConfig.Fields.$set("Item", schema + "smtpserver", "smtp.gmail.com");
    // mConfig.Fields.$set("Item", schema + "smtpserverport", 465);

    // If you use Outlook --
    // mConfig.Fields.$set("Item", schema + "smtpserver", "smtp-mail.outlook.com");
    // mConfig.Fields.$set("Item", schema + "smtpserverport", 587);

    // If you use Office365 --
    // mConfig.Fields.$set("Item", schema + "smtpserver", "smtp.office365.com");
    // mConfig.Fields.$set("Item", schema + "smtpserverport", 587);

    mConfig.Fields.$set("Item", schema + "smtpauthenticate", 1); // Authentication mechanism

    // User name (if needed)
    // mConfig.Fields.$set("Item", schema + "sendusername", "support@mycompany.com");

    // User password (if needed)
    // mConfig.Fields.$set("Item", schema + "sendpassword", "********");

    mConfig.Fields.Update();

    mMessage = getActiveXObject("CDO.Message");
    mMessage.Configuration = mConfig;
    mMessage.From = mFrom;
    mMessage.To = mTo;
    mMessage.Subject = mSubject;
    mMessage.HTMLBody = mBody;

    aqString.ListSeparator = ",";
    for(let i = 0; i < aqString.GetListLength(mAttach); i++)
      mMessage.AddAttachment(aqString.GetListItem(mAttach, i));
    mMessage.Send();
  }
  catch (exception)
  {
    Log.Error("Email cannot be sent", exception.message);
    return false;
  }
  Log.Message("Message to <" + mTo + "> was successfully sent");
  return true;
}

function SendMailTest()
{
  if (SendMail("ClareJ@clarejeffersoncorp.com", "mail.johnsmithcorp.com", "John Smith", "JohnS@johnsmithcorp.com", "Notification", "Hello Clare, Your application is nice.", "C:\\File1.txt", "C:\\File2.txt"))
    Log.Message("Mail was sent");
  else
    Log.Warning("Mail was not sent");
}

function TestControlsAndDialogs(BrowserName)
{
  // Launch the browser
  Browsers.Item(BrowserName).Run("http://smartbear.com");

  // Test the web site


  // Close the browser
  Aliases.browser.BrowserWindow.Close();
}

function TestSite()
{
  //Test Controls and Dialogs
  TestControlsAndDialogs(Browsers.btIExplorer);
  TestControlsAndDialogs(Browsers.btFirefox);
  TestControlsAndDialogs(Browsers.btChrome);
  TestControlsAndDialogs(Browsers.btEdge);
}


function PracticeBlock(){
  
  if(!Sys.WaitBrowser("firefox").Exists){
    Log.Message("Not Running !!!")
  }else{
    Log.Message("Running !!!")
  }

}