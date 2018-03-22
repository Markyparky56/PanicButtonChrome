function GetNewUrlAndUpdateTab(category)
{
  chrome.storage.sync.get({religiousEnabled: false},
    function(result) {
      let params = {
        cat:        category,
        religious:  ((result.religiousEnabled) ? "true" : "false"),
        platform:   "extension"
      };
      let esc = encodeURIComponent;
      let query = Object.keys(params)
                        .map(k => esc(k) + '=' + esc(params[k]))
                        .join('&');
      fetch("https://emergency.nofap.com/director.php?" + query, {method: 'GET'})
      .then((response) => { return response.text(); })
      .then((newUrl) => { chrome.tabs.update({url: newUrl}); })
      .catch((err) => {console.error(err);});
    }
  ); 
}

SetReligiousSetting = function()
{
  let value = document.getElementById("religiousEnabledCheckbox").checked;
  chrome.storage.sync.set({
    religiousEnabled: value
  });
}

document.getElementById("emergency").addEventListener("click", (e) => { GetNewUrlAndUpdateTab("em"); });
document.getElementById("depression").addEventListener("click", (e) => { GetNewUrlAndUpdateTab("dep"); });
document.getElementById("rejection").addEventListener("click", (e) => { GetNewUrlAndUpdateTab("rej"); });
document.getElementById("relapsed").addEventListener("click", (e) => { GetNewUrlAndUpdateTab("rel"); });

document.getElementById("religiousSetting").addEventListener("click", (e) => {
  if(e.target.id == "religiousEnabledCheckbox") return; // It can handle itself
  let checkbox = document.getElementById("religiousEnabledCheckbox"); checkbox.checked = !checkbox.checked; SetReligiousSetting();
});
document.getElementById("religiousEnabledCheckbox").addEventListener("change", () => {SetReligiousSetting();});

chrome.storage.sync.get({religiousEnabled: false},
  function(result){
    document.getElementById("religiousEnabledCheckbox").checked = result.religiousEnabled;
  }
);
