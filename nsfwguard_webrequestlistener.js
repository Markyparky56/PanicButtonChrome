if(typeof panicbutton == "undefined")
{
  var panicbutton = {};
}

panicbutton.itemCache = {};
chrome.storage.sync.get({
  nsfwguardEnabled: true,
  safehavenUrl: "https://www.reddit.com/r/NoFap"
}, function(items) {
  panicbutton.itemCache = items;
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
    }
    console.log("Settings updated", panicbutton.itemCache);
  }
  default:
  break;
  }
}
chrome.storage.onChanged.addListener(panicbutton.itemCacheSync)

panicbutton.nsfwguardListener = function(details)
{
  //console.log("Lemme check that page (" + details.url + ") first...");
  if(panicbutton.itemCache.nsfwguardEnabled)
  {
    // Check the requested url's about.json to determine if it is NSFW
    switch(panicbutton.processUrl(details.url))
    {
    case "checkjson":
    {
      // Use a synchronous httprequest to grab the about.json 
      let xhr = new XMLHttpRequest();
      xhr.open('GET', panicbutton.jsonUrl, false); // sync request
      xhr.send(); 
      console.log(xhr);
      let json = JSON.parse(xhr.responseText); 
      
      console.log("Fetch", panicbutton.jsonUrl);
      if(typeof json.data != "undefined")
      {
        if(json.data.over18)
        {
          console.warn("redirecting because over18 is true", panicbutton.itemCache);
          return {
            redirectUrl: panicbutton.itemCache.safehavenUrl
          };
        }            
      }
      else if(typeof json[0].data.children[0] != "undefined") // Might be a comments page
      {
        if(json[0].data.children[0].data.over_18)
        {
          console.warn("redirecting because over_18 is true", panicbutton.itemCache);                
          return {
            redirectUrl: panicbutton.itemCache.safehavenUrl
          };
        }
      }
    }
    break;
    case "redirect":
    {
      console.warn("redirecting because of over18 check page")
      return {
        redirectUrl: panicbutton.itemCache.safehavenUrl
      };
    }
    break;
    default:
    case "ignore":
    {
      return {};
    }
    break;
    }
  }
}

// Determines if the url is valid for checking, invalid urls might include r/all or mangled/mistyped urls
panicbutton.processUrl = function(url)
{
  panicbutton.url = url;
  // Check for an subreddit address
  let regex = /^https?:\/\/[a-zA-Z0-9-]*\.?reddit.com\/r\/[a-zA-Z0-9-]+\/?/
  let regexResult = regex.exec(panicbutton.url);
  if(regexResult != null)
  {
    // Check if we need to add a '/' to the end of the url
    if(panicbutton.url.slice(-1) != "/")
    {
      panicbutton.url += "/";
    }
    // a bunch of meta subreddits don't have an about.json so we need to exclude it
    if(panicbutton.url == "https://www.reddit.com/r/all/"
    || panicbutton.url == "https://www.reddit.com/r/random/"
    || panicbutton.url == "https://www.reddit.com/r/popular/"
    || panicbutton.url == "https://www.reddit.com/r/mod")
    {
      return "ignore";
    }

    // Append the about.json we want to check
    panicbutton.jsonUrl = panicbutton.url + "about.json";
    return "checkjson";
  }
  else // Check for an over18 page
  {
    let regex = /^https?:\/\/[a-zA-Z0-9-]*\.?reddit.com\/over18\?.*/
    let regexResult = regex.exec(panicbutton.url);
    if(regexResult != null)
    {
      // Caught an over18 access page, redirect to the safe haven
      return "redirect";
    }
    return "ignore";
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  panicbutton.nsfwguardListener,
  {urls: ["*://*.reddit.com/*"], types: ["main_frame", "sub_frame"]},
  ["blocking"]
);

console.log("Hey there!");
