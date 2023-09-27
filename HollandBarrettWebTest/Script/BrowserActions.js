function LauchEdgeBrowser(){
  Browsers.Item(btEdge).Run();
}

function NavigateToUrl(url){
  let browser = Aliases.browser;
  let browserWindow = browser.BrowserWindow;
  browserWindow.Maximize();
  browser.ToUrl(url);
}

function CloseBrowser() {
  Sys.Browser().BrowserWindow(0).Close();
}

module.exports ={
  LauchEdgeBrowser : LauchEdgeBrowser,
  NavigateToUrl : NavigateToUrl,
  CloseBrowser : CloseBrowser,
};