if(typeof panicbutton == "undefined")
{
    var panicbutton = {};
}

panicbutton.popuppanicbuttonstr =
    '<div class="pbpb panicbuttonpopupbox">' +
      '<style>'+
        '.pbpb{all:initial;z-index:99999;left:0;color:#fff}.panicbuttonpopupbox,.panicbuttonpopupbox:hover{width:250px;position:fixed;transition:top .5s ease-in-out;border-style:outset;border-bottom-width:0;padding:0}.panicbuttonpopupbox{top:calc(100% - 29px);user-select:none;border-top-left-radius:10%;border-top-right-radius:10%;background:#c8c8c8}.panicbuttonpopupbox:hover{top:calc(100% - 278px);display:block}.panicbuttonpopupboxtop{color:#000;font:400 13.33px Arial;width:100%;text-align:center;padding:5px 0 6px;display:flex;flex-direction:column;align-content:stretch;align-items:stretch}.panicbutton,.religiousSettingText{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif!important}.panicbutton{width:250px!important;padding:0;color:#fff!important;border:0!important;border-radius:0!important;font-size:16px;height:38px;position:inherit;font-weight:400!important;margin:0;letter-spacing:normal!important;text-transform:none!important}.emergencybutton{order:0;background:#e74c3c;font-size:36px;height:126px;display:flex;flex-direction:column;align-items:center;justify-content:center}.emergencybutton:hover{background:red}.depressionbutton{order:1;background:#2980b9;font-size:24px;height:48px}.depressionbutton:hover{background:#3498db}.rejectionbutton{order:2;background:#27ae60}.rejectionbutton:hover{background:#2ecc71}.relapsedbutton{order:3;background:#8e44ad}.relapsedbutton:hover{background:#9b59b6}.panicbuttonarrows{position:absolute;left:215px}.panicbuttonicon{position:absolute;padding:0 4px 8px 8px}.religiousSetting{position:absolute;top:11%;left:2%;background:#73716e;border-radius:3px;display:flex;align-items:center;justify-content:center;padding-right:4px}.religiousSetting:hover{background:#8B8986}.religiousSettingText{font-size:13px;color:#fff;text-align:center;position:relative;display:table-cell;vertical-align:middle}#religiousEnabledCheckbox{-webkit-appearance:checkbox!important;height:initial!important;width:initial!important;margin:5px 3px 3px 4px}input#religiousEnabledCheckbox:before{content:none!important}input#religiousEnabledCheckbox:focus{box-shadow:initial!important}span#emText{color:#fff}'+
      '</style>'+
      '<div class="panicbuttonpopupboxtop">Panic Button <img class="panicbuttonicon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSUlEQVQ4T52TPW7CQBCFv70EBVKUQ8QgIWiTKCdAQuKngyYlFFAABRRQpoHOBgmJE0RJWkQBziGiiCJwiEXL2o7jXUdKtrHnzby387eCxJFS3gCPwAOQCdxH4Bl4EkK8xykibkgpX4C7pGjCfhVC3IdYJCCl/ACuAI21WrBe67hyGWazkCOBTyHEtQIuwcHNtxFZgb0ejMea1O3CaPQjWeBNZSKCmn0j7eEQBgMNq2+/b6vMUQIuUDe80yl0OhqeTKDdtgl4SuAr1u3vIM+DRkPbrgt18w7gqARUU8yzXEKtpvHFAqpVa1i6wH4P+bwm7XaQy6UK2EvYbqFY1CT1XyjYBC4l2Jt4OkEmWMTDAbLZ1Caq1TXH6Puw2WhSqQSOYx+jQq2L9PsUVOP1IoWyxiqvVtBsavd8DpVKFGqsckzk/48pJvKn53wGTMCDb5/+8g4AAAAASUVORK5CYII="><img class="panicbuttonarrows" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACzElEQVQ4T3WTTWgTURDH39vsV3abD0mjLhF6CoRF/CiCWKQJIhQVbS82t0phEw8K4qGee/VSSlFq2oUeCiJexFJrUUFWqr0oFTQohoKKYqCBZLtJX5Lu2ycTmiC2Xdg9vDfzm//8ZxajfR7TNHsYY6twjTE+YxjGj71C8V6H4+PjXCwW+ylJUsx1XUQp/R0KhXqGh4fp//G7AFNTU5Lf738vCMJRURRb8c1mE21vb+d5nj81Ojpa/xeyCzAzM7Moy/Iln8+HVFVFgiCgzc1NAADouWEYF/cFmKY5KQjCLZ7nUSgUQoFA4ANYUC6Xe7e2ttpK7mcymZttSEeBaZrXOY57IMsyJKJgMFjEGB+DQMbYJ8dxDoESQgjyPO92JpOZbBkMH9M0LyOEFhRFaSc3XdfVC4WCBPe6rgPko+M4QqVSQfV6HSDpbDb7GM/NzR12XbegKIoajUaxKIquIAh9+Xxewxg/3ZE6lEgkip7nvXUcx2fbNiOEEIxxvKVgfn6+NxKJvFZVNcgYu5HP59+JorgGU+A4DjUaDTCxV9f1PsbYvVKpVKOUDqXT6VcdDyzLijcajRPr6+uWz+f7pqpqCOAA8DwPIDYhJBGPx89DOwMDA587HrQdzeVyCsdxvxRFOQBjjEQisIVoY2OjBSGEVMrl8pGxsbHarilMTEz4u7q6VmVZPg5JsVgM8Tx/x/M87Lru3WKx2IJVq1WofDqbzYIHrNPC7OzsI0EQ0jDG7u5uSF5MJpNXoJJlWc8opRdACax2vV5fMAxjsNUC7L2maQ9FUUxLkoQ0TYNKb5LJZAoq7OwBZ1mW5XneWdu2EbzNZvNJOBy+iqenpw/KsvwCpEejUaj8nTF2MpVK2f8A8MrKSphSukYp7SmVSqhWq30hhJxrtbC0tCRRSnOBQGCQ4zi9v7//z15/6fLysiaK4tdqtfqyUqlcGxkZqf0FJW5N6bFeI8UAAAAASUVORK5CYII="></div>' +
      '<div class="panicbuttonhiddenpopupbox">'+
        '<div class="religiousSetting">'+
          '<input id="religiousEnabledCheckbox" type="checkbox">'+
          '<div class="religiousSettingText">'+
            'Religious'+
          '</div>'+
        '</div>'+
        '<button type="submit" value="Emergency" id="pbembtn" class="panicbutton emergencybutton"><img id="emIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADkUlEQVR4Xu1bO44UQQx9DjgBRAsJIQGwCUh8BATAEZiQI5AQIBKIEAEJN2BD9ghAAIhlJUj4BIQksBGcAGmM3Kqa7Zntnm5Xl90l9XQ2mvrYr1yvbJeLYPwx8x0AZwCcBnAXAAOglmnjfzsAfgL4QUS7liK2CTJoTmZ+AuAagCuDBjrsvAfgPRE9zDTeYphsADDzBQD3AciKr1vlVB3imGIRz4joc+pA9X6DAQiKPwdwKYdAijH2AdwbCkQSAMxMRMTM/ArALYXQFk1fE9HtKJN2glQAzgP4YmTqWh3i1tgmoq/azmoAmPktgOvaiZzavyOiG5q5VAAwsyB8ds0xppnboq1Yw3ciEgvt9XUCIHsLwPFg8lspygth9JJmpZGQTEI/6XMAYBvAX+GqdWN0CsbMJ8KAxxKEqbo4AxDF/Adgi4j+DAXgF4CTqcqPCIBM/ZuITiUDkGvPj2QBoncnJ7RugcD24s52bpMu6xgRgAiCuNGNp8MR5QLpnQuk16Vb7/+1ICQS4Dp5hBS/rZJi4+oaTK4mQi8ZmixA3NubOUy/vhwFWIDwwRtxm5fkqv8Igc2n3nataFgAAFHai/UAaskCmPmjVVRXEAD7RHQ5orEAwHL1U3wBCw6oGezCCuoAvAzJDIVh929akAWI0LtENKsWJqpgjHgRp0ATKVcAhBzeg9zMX9gpsMT3AJ5KjjEC8CFjArNxXxS2BUTGPSK6GgFICTv7E0BCRGi9JSMxS2JPsrhCgKZfgRYg+s4EgEcAHptqX6gFiN4CwItwY2OKQaEWsFPltk01D4MXCgAEgLnl8bdwOZV5QaeF4Y0FOCFdnCe4sMwNAE4kqIkIvRalksl1sp5E6CqT62SFAuByDBa6BfyOwUIBqDjAxRUuFIDKFXYJhgoFoAqGXMLhQgGYuSVESgRAAjS3lJgKgPmckVZToQlsl1JiUthomhRVAWDvnUoK4DApGjLD5nmBvjkBD+csyuJ2MaKxTYe2jRcjUupqcjHqoJB2iqNXY2EbTPdyNABgZgV9939cSkMeaL8eDyBMt0DCEv0SLKBJhk2RVBt95iyT0zhBBlYo/k3/Mrk6ILkKJUcEIL1QsrYSg0tlRwRgWKlsOBUGF0uPBEC2YunB5fLOAOQtl7fiBK3v2rN9555fHUddCD3pJzM1Ypzuo6lAjNN+NrfCCxJATevhZBMhTfbpbAsY03s8vSamKPr5/H/QUiENVqRpfQAAAABJRU5ErkJggg=="><span id="emText">Emergency</span></button>'+
        '<button type="submit" value="Depression" id="pbdepbtn" class="panicbutton depressionbutton"><span id="emText">Depression</span></button>'+
        '<button type="submit" value="Rejection" id="pbrejbtn" class="panicbutton rejectionbutton"><span id="emText">Rejection</span></button>'+
        '<button type="submit" value="Relapsed" id="pbrelbtn" class="panicbutton relapsedbutton"><span id="emText">Relapsed</span></button>'+
      '</div>'+
    '</div>';

panicbutton.SetReligiousSetting = function()
{
  let value = document.getElementById("religiousEnabledCheckbox").checked;
  chrome.storage.sync.set({
    religiousEnabled: value
  });
}

panicbutton.GetReligiousSetting = function()
{
  
}

panicbutton.GetNewUrlAndUpdateTab = function(category)
{
  chrome.storage.sync.get({
    religiousEnabled: false
  }, function(items) {    
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
    .then((response) => { return response.text(); })
    .then((newUrl) => { window.location.replace(newUrl); })
    .catch((err)=>{console.error("NoFap Panic Button PopupBox Error:", err);});
  });
  
}

panicbutton.popupboxInit = function() 
{
  // Don't run in iframes
  if(window.top === window.self)
  {
    let footer = document.querySelector('footer');
    if(footer === null || footer.parentNode.tagName !== "HTML")
    {
        footer = document.createElement('footer');
        footer.setAttribute("id", "popuppanicbuttonfooter");
        // Insert at very end of page, this avoids being overridden by any styles which may be added later, like stylish
        document.documentElement.appendChild(footer);
    }

    footer.insertAdjacentHTML('beforeend', panicbutton.popuppanicbuttonstr);
    document.getElementById("religiousEnabledCheckbox").addEventListener("change", () => {panicbutton.SetReligiousSetting();});
    document.getElementById("pbembtn").addEventListener("click", () => {panicbutton.GetNewUrlAndUpdateTab("em");});
    document.getElementById("pbdepbtn").addEventListener("click", () => {panicbutton.GetNewUrlAndUpdateTab("dep");});
    document.getElementById("pbrejbtn").addEventListener("click", () => {panicbutton.GetNewUrlAndUpdateTab("rej");});
    document.getElementById("pbrelbtn").addEventListener("click", () => {panicbutton.GetNewUrlAndUpdateTab("rel");});

    panicbutton.religiousEnabled = false;
    chrome.storage.sync.get({
      religiousEnabled: false
    }, function(items) { 
      panicbutton.religiousEnabled = items.religiousEnabled; 
      if(panicbutton.religiousEnabled)
      {
        document.getElementById("religiousEnabledCheckbox").checked = true;
      }
    });    
  }
}
panicbutton.popupboxInit();