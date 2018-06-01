if(typeof panicbutton == "undefined")
{
  var panicbutton = {};
}

panicbutton.itemCache = {};
chrome.storage.sync.get({
  nsfwguardEnabled: true,
  safehavenUrl: "https://www.reddit.com/r/NoFap"
}, function(items) {
  for(var item in items)
  {
    panicbutton.itemCache[item] = items[item];
  }
});
chrome.storage.local.get({
  subredditDB: {}
}, function(db) {
  panicbutton.itemCache.subredditDB = db.subredditDB;
});
panicbutton.itemCacheSync = function(changed, areaName)
{
  switch(areaName)
  {
  case "sync":
  case "local":  
  {
    for(var item in changed)
    {
      panicbutton.itemCache[item] = changed[item].newValue;
    }
  }
  default:
  break;
  }
}
chrome.storage.onChanged.addListener(panicbutton.itemCacheSync);

panicbutton.nsfwguardListener = function(details)
{
  if(panicbutton.itemCache.nsfwguardEnabled)
  {
    // Check the requested url's about.json to determine if it is NSFW
    let todo = panicbutton.processUrl(details.url);
    switch(todo)
    {
    case "checkdb":
    {
      // Check the subredditDB to see if we know if this subreddit is safe
      let subredditRegex = /\/r\/[a-zA-Z0-9-_]+/; // Matches the subreddit in the url
      let subreddit = subredditRegex.exec(panicbutton.url);
      if(subreddit != null) subreddit = subreddit[0];
      if(panicbutton.itemCache.subredditDB[subreddit] == true) // NSFW
      {
        return {
          redirectUrl: panicbutton.itemCache.safehavenUrl
        };
      }
    }
    break;
    case "redirect":
    {
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
  // Check for a subreddit address
  let regex = /^https?:\/\/[a-zA-Z0-9-]*\.?reddit.com\/r\/[a-zA-Z0-9-_]+\/?/
  let regexResult = regex.exec(panicbutton.url);
  if(regexResult != null)
  {
    panicbutton.url = regexResult[0];

    // Check if we need to add a '/' to the end of the url
    if(panicbutton.url.slice(-1) != "/")
    {
      panicbutton.url += "/";
    }
    // a bunch of meta subreddits are "meta"-subreddits which combine multiple subreddits
    // which we can't check explictly
    if(~panicbutton.url.indexOf("/r/all/")
    || ~panicbutton.url.indexOf("/r/random/")
    || ~panicbutton.url.indexOf("/r/popular/")
    || ~panicbutton.url.indexOf("/r/mod"))
    {
      return "ignore";
    }
    else if(~panicbutton.url.indexOf("/r/randnsfw")) // Catch randnsfw and redirect straight away
    {
      return "redirect";
    }

    return "checkdb";
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
