// NoFap Panic Button NSFWGuard script
// Based on the Reddit - Block NSFW userscript by /u/Mitttttens
// (https://greasyfork.org/en/scripts/17493-reddit-block-nsfw)

console.log("NSFWGuard says hi!");

if(typeof panicbutton == "undefined")
{
  var panicbutton = {};
}

// Check if NSFWGuard is enabled or not
chrome.storage.sync.get({
  nsfwguardEnabled: true,
  safehavenUrl: "https://www.reddit.com/r/nofap/"
}, function(items) {
  panicbutton.nsfwguardEnabled = items.nsfwguardEnabled;
  panicbutton.safehavenUrl = items.safehavenUrl;
  console.log("NSFWGuard Enabled:", panicbutton.nsfwguardEnabled);
  if(panicbutton.nsfwguardEnabled)
  {
      panicbutton.checkForNSFW();
  }
});

panicbutton.processUrl = function()
{
  panicbutton.url = window.location.href;
  // Check for NSFW Subreddit
  var regex = /^https?:\/\/[^\.]*\.?reddit.com\/r\/[^\/]+\/?/
  let regexResult = regex.exec(panicbutton.url);
  console.log(regexResult);
  if(regexResult != null)
  {
    panicbutton.url = regexResult[0];
    // Check if we need to add a '/' to the end
    if(panicbutton.url.slice(-1) != "/")
    {
      panicbutton.url += "/";
    }
    if(panicbutton.url == "https://www.reddit.com/r/all/") return false; // No about.json for r/all

    // Append the about.json we want to check
    panicbutton.jsonUrl = panicbutton.url + "about.json";
    return true;
  }
  else // Check for an over18 page
  {
    let regex = /^https?:\/\/[^\.]*\.?reddit.com\/over18\?.*/
    let regexResult = regex.exec(panicbutton.url)
    if(regexResult != null)
    {
      // Caught an over18 access page, redirect to the safe haven
      window.location.replace(panicbutton.safehavenUrl);
      return true;
    }
    return false;
  }
}

panicbutton.checkForNSFW = function()
{
  if(panicbutton.processUrl())
  {
    fetch(panicbutton.jsonUrl, {method: 'GET'})
    .then((response) => { return response.json(); })
    .then((json) => {
      console.log(json);
      if(typeof json != "undefined")
      {
        if(json.data.over18)
        {
          window.location.replace(panicbutton.safehavenUrl);
        }
      }
      else if(typeof json[0].data.children[0] != "undefined") // Might be a comments page
      {
        if(json[0].data.children.data.over_18)
        {
          window.location.replace(panicbutton.safehavenUrl);
        }
      }
      else
      {
        console.log("NSFW Guard Is Confused! Please contact app@nofap.com");
      }
    })
    .catch((err) => { console.error(err); });
  }
}
