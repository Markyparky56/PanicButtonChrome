$(emergency).click(
    function()
    {
        chrome.storage.sync.get({
            religiousEnabled: false
        }, function(items) {
            $.get("http://emergency.nofap.com/director.php", {cat:"em", religious:items.religiousEnabled ? "true" : "false", platform:"extension"}, function(e){chrome.tabs.update({url: e})});
        });        
    }
);

$(depression).click(
    function()
    {
        chrome.storage.sync.get({
            religiousEnabled: false
        },function(items) {
            $.get("http://emergency.nofap.com/director.php", {cat:"dep", religious:items.religiousEnabled ? "true" : "false", platform:"extension"}, function(e){chrome.tabs.update({url: e})});
        });
    }
);

$(rejection).click(
    function()
    {
        chrome.storage.sync.get({
            religiousEnabled: false
        },function(items) {
            $.get("http://emergency.nofap.com/director.php", {cat:"rej", religious:items.religiousEnabled ? "true" : "false", platform:"extension"}, function(e){chrome.tabs.update({url: e})});
        });
    }
);

$(relapsed).click(
    function()
    {
        chrome.storage.sync.get({
            religiousEnabled: false
        },function(items) {
            $.get("http://emergency.nofap.com/director.php", {cat:"rel", religious:items.religiousEnabled ? "true" : "false", platform:"extension"}, function(e){chrome.tabs.update({url: e})});
        });        
    }
);