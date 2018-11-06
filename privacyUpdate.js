chrome.runtime.onInstalled.addListener((details) => {
  // Update this each time we release a new version of the privacy policy
  let latestUpdate = new Date("2018-11-06").getTime();
  chrome.storage.sync.get({
    privacypolicydate: 0
  }, (ret) => {
    if(ret.privacypolicydate != latestUpdate)
    {
      chrome.notifications.getPermissionLevel((permissionLevel) => {
        if(permissionLevel == "granted")
        {
          chrome.notifications.create("privacyUpdateNoti", 
          {   type: "basic"
            , title: "We've Updated Our Privacy Policy"
            , message: "Click here to view our new privacy policy!"
            , iconUrl: "/images/NoFapRocket.svg"
          });
          chrome.notifications.onClicked.addListener((notification) => {
            chrome.tabs.create({url: chrome.runtime.getURL("PrivacyPolicy.html")})
            chrome.notifications.clear(notification);
            chrome.storage.sync.set({
              privacypolicydate: latestUpdate
            });
          });
        }
        else
        {
          // Open a web page to the new privacy policy
          chrome.tabs.create({url: chrome.runtime.getURL("PrivacyPolicy.html")})
          chrome.storage.sync.set({
            privacypolicydate: latestUpdate
          });
        }
      })
      
    }
  })
});
