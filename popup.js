if(typeof panicbutton == "undefined")
{
    var panicbutton = {};
}

panicbutton.GetNewUrlAndUpdateTab = function(category)
{
  let params = {
    cat:        category,
    religious:  panicbutton.itemCache.religiousEnabled,
    platform:   "extension"
  };
  let esc = encodeURIComponent;
  let query = Object.keys(params)
                    .map(k => esc(k) + '=' + esc(params[k]))
                    .join('&');
  fetch("https://emergency.nofap.com/director.php?" + query, {method: 'GET'})
  .then((response) => { return response.text(); })
  .then((newUrl) => { chrome.tabs.update({url: newUrl}); })
  .catch((err)=>{console.error("NoFap Panic Button PopupBox Error:", err);});
}

panicbutton.UpdateReligiousCheckbox = function()
{
  document.getElementById("religiousEnabledCheckbox").checked = panicbutton.itemCache.religiousEnabled;
}

panicbutton.SetReligiousSetting = function(valueToSet)
{
  chrome.storage.sync.set({
    religiousEnabled: valueToSet
  });
}

document.getElementById("emergency").addEventListener("click", (e) => { panicbutton.GetNewUrlAndUpdateTab("em"); });
document.getElementById("depression").addEventListener("click", (e) => { panicbutton.GetNewUrlAndUpdateTab("dep"); });
document.getElementById("rejection").addEventListener("click", (e) => { panicbutton.GetNewUrlAndUpdateTab("rej"); });
document.getElementById("relapsed").addEventListener("click", (e) => { panicbutton.GetNewUrlAndUpdateTab("rel"); });

document.getElementById("religiousSetting").addEventListener("click", (e) => {
  if(e.target.id == "religiousEnabledCheckbox") return; // It can handle itself
  panicbutton.SetReligiousSetting(!document.getElementById("religiousEnabledCheckbox").checked);
});
document.getElementById("religiousEnabledCheckbox").addEventListener("change", () => {panicbutton.SetReligiousSetting(document.getElementById("religiousEnabledCheckbox").checked);});


panicbutton.itemCache = {};
chrome.storage.sync.get({
  religiousEnabled: false
}, (items) => {
  panicbutton.itemCache = items;
  document.getElementById("religiousEnabledCheckbox").checked = items.religiousEnabled;
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
      if(item == "religiousEnabled")
      {
        panicbutton.UpdateReligiousCheckbox();
      }
    }
  }
  default:
  break;
  }
}
chrome.storage.onChanged.addListener(panicbutton.itemCacheSync);
