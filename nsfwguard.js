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
    panicbutton.url = window.location.href;
    var regex = /(^https?:\/\/[^\.]+\.reddit.com\/r\/[^\/]+\/?)/
    panicbutton.url = regex.exec(panicbutton.url)[0];

    // Check if we need to add a '/' to the end
    if(panicbutton.url.slice(-1) != "/")
    {
        panicbutton.url +=  "/";
    }

    // Append the about.json we want to check
    panicbutton.jsonUrl = panicbutton.url + "about.json";
}

panicbutton.checkForNSFW = function()
{
    panicbutton.processUrl();

    $.get(panicbutton.jsonUrl, function(json)
    {
        if(typeof json.data != "undefined")
        {
            if(json.data.over18)
            {
                window.location.replace(panicbutton.safehavenUrl);
            }
        }
        else if(typeof json[0].data.children[0] != "undefined") // Might be a comments page
        {
            if(json[0].data.children[0].data.over_18)
            {
                window.location.replace(panicbutton.safehavenUrl);
            }
        }
        else
        {
            console.log("Confused!");
        }
    });
}
