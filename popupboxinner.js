if(typeof panicbutton == "undefined")
{
  var panicbutton = {};
}

panicbutton.UpdateSideSwitch = function()
{
  let sideswitch = document.getElementById("pbsideswitch");
  sideswitch.classList.remove((panicbutton.panicbuttonSideLeft ? 'pointLeft' : 'pointRight'));
  sideswitch.classList.add((panicbutton.panicbuttonSideLeft ? 'pointRight' : 'pointLeft'));
}

panicbutton.UpdateReligiousCheckbox = function()
{
  document.getElementById("religiousEnabledCheckbox").checked = panicbutton.itemCache.religiousEnabled;
}

// Setup listener for storage change
panicbutton.itemCache = {};
chrome.storage.sync.get({
  religiousEnabled: false,
  popupSide: "left"
}, (items) => {
  panicbutton.itemCache = items;
  // Convert "popupSide" to a boolean value for easier switching
  panicbutton.panicbuttonSideLeft = (panicbutton.itemCache.popupSide == "left") ? true : false;
  panicbutton.UpdateSideSwitch();
  panicbutton.UpdateReligiousCheckbox();
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
        panicbutton.UpdateSideSwitch();
      }
      else if(item == "religiousEnabled")
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

panicbutton.SetReligiousSetting = function(valueToSet)
{
  chrome.storage.sync.set({
    religiousEnabled: valueToSet
  });
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
  .then((newUrl) => { window.parent.location.replace(newUrl); })
  .catch((err)=>{console.error("NoFap Panic Button PopupBox Error:", err);});
}

document.getElementById("religiousSetting").addEventListener("click", (e) => {
  // The checkbox has a listener because it toggles itself, we have to take the !check value and 
  // pass it when the user clicks the div to achieve the same effect
  if(e.target.id == "religiousEnabledCheckbox") return; 
  panicbutton.SetReligiousSetting(!document.getElementById("religiousEnabledCheckbox").checked);
});
document.getElementById("religiousEnabledCheckbox").addEventListener("change", () => {
  panicbutton.SetReligiousSetting(document.getElementById("religiousEnabledCheckbox").checked);
});
document.getElementById("pbembtn").addEventListener("click", () => {panicbutton.GetNewUrlAndUpdateTab("em");});
document.getElementById("pbdepbtn").addEventListener("click", () => {panicbutton.GetNewUrlAndUpdateTab("dep");});
document.getElementById("pbrejbtn").addEventListener("click", () => {panicbutton.GetNewUrlAndUpdateTab("rej");});
document.getElementById("pbrelbtn").addEventListener("click", () => {panicbutton.GetNewUrlAndUpdateTab("rel");});
document.getElementById("pbsideswitch").addEventListener("click", (e) => {
  window.parent.postMessage("pbSideSwitchClick", "*");
  panicbutton.UpdateSideSwitch();
});
