// If the webrequest listener doesn't have the visited subreddit in its database
// it falls back to this content script to check the subreddits about.json and
// update the database
// This content script also checks comment pages about.json and redirects away
// if they are tagged as nsfw

if(typeof panicbutton == "undefined")
{
  var panicbutton = {};
}

panicbutton.NSFWGuardCheck = function()
{
  // Get DB
  chrome.storage.local.get({subredditDB:{}}, (local) => {
    panicbutton.subredditDB = local.subredditDB;
    // Check the url
    panicbutton.url = window.location;
    let subredditRegex = /\/r\/[a-zA-Z0-9-_]+/;
    let subreddit = subredditRegex.exec(panicbutton.url);
    if(subreddit != null) subreddit = subreddit[0];
    // Is this subreddit in the db?  
    if(panicbutton.subredditDB[subreddit] === undefined)  
    {
      // If not check about.json and update db
      fetch("https://www.reddit.com" + subreddit + "/about.json")
      .then((ret) => {
        return ret.json();
      })
      .then((json) => {
        if(typeof json.data != "undefined")
        {
          // Update db
          panicbutton.subredditDB[subreddit] = json.data.over18;
          chrome.storage.local.set({subredditDB: panicbutton.subredditDB});
          if(json.data.over18) // Get us out of here!
          {
            window.location.replace(panicbutton.safehavenUrl);
          }
        }
      });
    }
    else if(panicbutton.nsfwguard_redirectOnNSFWComments)
    {
      // If yes, check if this is a comment page
      let commentPageRegex = /^https?:\/\/[a-zA-Z0-9-]*\.?reddit.com\/r\/[a-zA-Z0-9-]+\/comments\/[a-zA-Z0-9-\/_]*/;
      let commentPageUrl = commentPageRegex.exec(panicbutton.url);
      if(commentPageUrl != null)
      {
        commentPageUrl = commentPageUrl[0];
        // Add a '/' if needed
        if(commentPageUrl.slice(-1) != "/") commentPageUrl += "/";
        // Check about.json and react accordingly      
        fetch(commentPageUrl + "about.json")
        .then((ret) => {
          return ret.json();
        })
        .then((json) => {
          if(typeof json[0].data.children[0] != "undefined")
          {
            if(json[0].data.children[0].data.over_18) // ABORT! ABORT!
            {
              window.location.replace(panicbutton.safehavenUrl);
            }
          }
        })
      }
    }
  });
}

chrome.storage.sync.get({
  nsfwguardEnabled: true,
  nsfwguard_redirectOnNSFWComments: true,
  safehavenUrl: "https://www.reddit.com/r/NoFap"
}, (items) => {
  if(items.nsfwguardEnabled)
  {
    panicbutton.nsfwguardEnabled = items.nsfwguardEnabled;
    panicbutton.nsfwguard_redirectOnNSFWComments = items.nsfwguard_redirectOnNSFWComments;
    panicbutton.safehavenUrl = items.safehavenUrl;
    panicbutton.NSFWGuardCheck();
  }
  else return; // Exit, don't run nsfwguard script
});
