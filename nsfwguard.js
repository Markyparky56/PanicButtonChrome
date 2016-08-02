// NoFap Panic Button NSFWGuard script
// Based on the Reddit - Block NSFW userscript by /u/Mitttttens
// (https://greasyfork.org/en/scripts/17493-reddit-block-nsfw)

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
    if(panicbutton.nsfwguardEnabled)
    {
        panicbutton.checkForNSFW();
    }
});

panicbutton.processUrl = function()
{
    panicbutton.url = document.URL;
    var regex = /([^=]*)\/([^=]*)/; // Capture everything before and after the last '/' and check if it is a recognised sub-page
    var match = regex.exec(panicbutton.url);
    if(match[2] == "hot"
    || match[2] == "new"
    || match[2] == "rising"
    || match[2] == "controversial"
    || match[2] == "top"
    || match[2] == "gilded"
    || match[2] == "promoted")
    {
        // We can cut off the end of this url
        panicbutton.url = match[1];
    }

    // Check if we need to add a '/' to the end
    if(panicbutton.url.substring(panicbutton.url.length-1) != "/")
    {
        panicbutton.url = panicbutton.url + "/"; // +=?
    }

    // Append the about.json we want to check
    panicbutton.jsonUrl = panicbutton.url + "about.json";
}

panicbutton.checkForNSFW = function()
{
    panicbutton.processUrl();

    panicbutton.xhr = new XMLHttpRequest();
    panicbutton.xhr.open("GET", panicbutton.jsonUrl, false); // No Async so the page won't load until we know it's safe
    panicbutton.xhr.onload = function()
    {
        var json = JSON.parse(this.responseText);
        if(typeof json.data != "undefined")
        {
            if(json.data.over18)
            {
                window.location.replace(panicbutton.safehavenUrl);
            }
            // else
            // {
            //     console.log("NSFWGuard finds this subreddit safe!");
            // }
        }
        else if(typeof json[0].data.children[0] != "undefined") // Might be a comments page
        {
            if(json[0].data.children[0].data.over_18)
            {
                window.location.replace(panicbutton.safehavenUrl);
            }
            // else
            // {
            //     console.log("NSFWGuard finds this subreddit safe!");
            // }
        }
        else
        {
            console.log("Confused!");
        }

    }
    panicbutton.xhr.send();
}
