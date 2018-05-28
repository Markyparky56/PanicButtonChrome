if(typeof panicbutton == "undefined")
{
    var panicbutton = {};
}

panicbutton.UpdatePopupFrameSide = function()
{
  panicbutton.popupboxFrame.classList.remove(((panicbutton.panicbuttonSideLeft) ? "pbpbRight" : "pbpbLeft"));
  panicbutton.popupboxFrame.classList.add(((panicbutton.panicbuttonSideLeft) ? 'pbpbLeft' : 'pbpbRight'));
}

panicbutton.popupboxInit = function() 
{
  // Don't run in iframes
  if(window.top === window.self)
  {    
    // Create a link element to our popupbox stylesheet and add it to the body
    let popupboxStyle = document.createElement("link");
    popupboxStyle.rel = "stylesheet";
    popupboxStyle.type = "text/css";
    popupboxStyle.href = chrome.runtime.getURL("popupbox.css");
    document.body.appendChild(popupboxStyle);

    // Create the iframe element our popup box will reside within
    panicbutton.popupboxFrame = document.createElement("iframe");
    panicbutton.popupboxFrame.src = chrome.runtime.getURL("popupbox.html");
    panicbutton.popupboxFrame.classList.add("pboverride", "pbpb", "panicbuttonpopupbox");
    panicbutton.popupboxFrame.scrolling="no";
    panicbutton.popupboxFrame.id = "pbFrame";
    panicbutton.popupboxFrame.height = "276px";
    panicbutton.popupboxFrame.width = "250px";
    document.body.appendChild(panicbutton.popupboxFrame);

    panicbutton.popupboxFrame.classList.add(((panicbutton.panicbuttonSideLeft == true) ? 'pbpbLeft' : 'pbpbRight'));

    // Setup listener for messages from iframe
    window.addEventListener("message", (e) => {
      let key = e.message ? 'message' : 'data';
      let data = e[key];
      if(data == "pbSideSwitchClick")
      {
        chrome.storage.sync.set({
          popupSide: (panicbutton.panicbuttonSideLeft == true) ? "right" : "left"
        });
      }
    });
  }
}

// Setup listener for storage change
panicbutton.itemCache = {};
chrome.storage.sync.get({
  popupEnabled: true,
  popupBlacklist: ["www.example.com"],
  religiousEnabled: false,
  popupSide: "left"
}, (items) => {
  panicbutton.itemCache = items;
  // Convert "popupSide" to a boolean value for easier switching
  panicbutton.panicbuttonSideLeft = (panicbutton.itemCache.popupSide == "left") ? true : false;

  if(panicbutton.itemCache.popupEnabled)
  {
    // Check if the page we're on is blacklisted
    // Construct a regex from the provided addresses in the blacklist
    for(addr in items.popupBlacklist)
    {
      let address = items.popupBlacklist[addr];
      // Replace wildcards with letter catchalls
      let regAddr = address.replace(/\*/g, "[-a-zA-Z0-9@:%_\+.~#?&=]{0,256}");
      let regex = RegExp(regAddr);
      if(regex.exec(window.location.href))
      {
        // Address is on blacklist, end search, don't add to page
        return;
      }
      else continue;
    }
    // If we didn't return above we're safe to add the popup box to the page
    panicbutton.popupboxInit();
  }
});
panicbutton.itemCacheSync = function(changed, areaName)
{
  switch(areaName)
  {
  case "sync":
  {
    for(var item in changed)
    {
      panicbutton.itemCache[item] = changed[item].newValue;
      if(item == "popupSide")
      {
        panicbutton.panicbuttonSideLeft = (panicbutton.itemCache.popupSide == "left") ? true : false;
        panicbutton.UpdatePopupFrameSide();
      }
    }
  }
  default:
  break;
  }
}
chrome.storage.onChanged.addListener(panicbutton.itemCacheSync);
