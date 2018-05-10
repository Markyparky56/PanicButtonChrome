if(typeof panicbutton == "undefined")
{
  var panicbutton = {};
}

panicbutton.SetReligiousSetting = function()
{
  let value = document.getElementById("religiousEnabledCheckbox").checked;
  chrome.storage.sync.set({
    religiousEnabled: value
  });
}

panicbutton.GetNewUrlAndUpdateTab = function(category)
{
  chrome.storage.sync.get({
    religiousEnabled: false
  }, (items) => {    
    let religiousEnabled = items.religiousEnabled;
    let params = {
      cat:        category,
      religious:  religiousEnabled,
      platform:   "extension"
    };
    let esc = encodeURIComponent;
    let query = Object.keys(params)
                      .map(k => esc(k) + '=' + esc(params[k]))
                      .join('&');
    fetch("https://emergency.nofap.com/director.php?" + query, {method: 'GET'})
    .then((response) => { console.log(response); return response.text(); })
    .then((newUrl) => { window.parent.location.replace(newUrl); })
    .catch((err)=>{console.error("NoFap Panic Button PopupBox Error:", err);});
  });  
}

document.getElementById("religiousSetting").addEventListener("click", (e) => {
  if(e.target.id == "religiousEnabledCheckbox") return; // It can handle itself
  let checkbox = document.getElementById("religiousEnabledCheckbox"); checkbox.checked = !checkbox.checked; panicbutton.SetReligiousSetting();
});
document.getElementById("religiousEnabledCheckbox").addEventListener("change", () => {});
document.getElementById("pbembtn").addEventListener("click", () => {panicbutton.GetNewUrlAndUpdateTab("em");});
