if(typeof panicbutton == "undefined")
{
    var panicbutton = {};
}

panicbutton.panicbuttonSideLeft = true;

panicbutton.GetPopupPanicButtonString = function()
{
  let str = '<div id="popuppanicbutton" class="pboverride pbpb ' + (panicbutton.panicbuttonSideLeft ? 'pbpbLeft' : 'pbpbRight') + ' panicbuttonpopupbox">' +
            '<style>'+
              '.pbpb,.religiousSetting,.religiousSetting:hover{z-index:99999!important}.pbpbLeft{left:0!important}.pbpbRight{right:0!important}div.pboverride{width:250px;margin:0;padding:0;background-color:initial;border-radius:0;position:initial}span#emText{color:#fff!important}#religiousEnabledCheckbox{-webkit-appearance:checkbox!important;height:initial!important;width:initial!important;margin:5px 3px 3px 4px!important}input#religiousEnabledCheckbox:focus{box-shadow:initial!important}input#religiousEnabledCheckbox:before{content:none!important}.religiousSetting{position:absolute!important;top:11%!important;left:2%!important;background:#73716e!important;border-radius:3px!important;display:flex!important;align-items:center!important;justify-content:center!important;padding-right:4px!important;width:78.48px!important}.religiousSetting:hover{background:#8B8986!important}.panicbuttonpopupbox{top:calc(100% - 29px)!important;user-select:none!important;border-top-left-radius:10%!important;border-top-right-radius:10%!important;background:#c8c8c8!important}.panicbuttonpopupbox:hover{top:calc(100% - 278px)!important;display:block!important}.panicbuttonpopupbox,.panicbuttonpopupbox:hover{width:250px!important;position:fixed!important;transition:top .5s ease-in-out!important;border-style:outset!important;border-width:3px 3px 0;padding:0!important;box-sizing:content-box}.panicbuttonarrows,.panicbuttonicon{position:absolute!important;top:5px!important;margin:0!important}.panicbuttonpopupboxtop{color:#000!important;font:400 13.33px Arial!important;width:100%!important;height:15px!important;text-align:center!important;padding:5px 0 6px!important;display:flex!important;flex-direction:column!important;align-content:stretch!important;align-items:stretch!important}.emergencybutton{order:0!important;background:#e74c3c!important;font-size:36px!important;height:126px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;line-height:normal!important}.panicbuttonicon{content:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSUlEQVQ4T52TPW7CQBCFv70EBVKUQ8QgIWiTKCdAQuKngyYlFFAABRRQpoHOBgmJE0RJWkQBziGiiCJwiEXL2o7jXUdKtrHnzby387eCxJFS3gCPwAOQCdxH4Bl4EkK8xykibkgpX4C7pGjCfhVC3IdYJCCl/ACuAI21WrBe67hyGWazkCOBTyHEtQIuwcHNtxFZgb0ejMea1O3CaPQjWeBNZSKCmn0j7eEQBgMNq2+/b6vMUQIuUDe80yl0OhqeTKDdtgl4SuAr1u3vIM+DRkPbrgt18w7gqARUU8yzXEKtpvHFAqpVa1i6wH4P+bwm7XaQy6UK2EvYbqFY1CT1XyjYBC4l2Jt4OkEmWMTDAbLZ1Caq1TXH6Puw2WhSqQSOYx+jQq2L9PsUVOP1IoWyxiqvVtBsavd8DpVKFGqsckzk/48pJvKn53wGTMCDb5/+8g4AAAAASUVORK5CYII=);right:59.22px!important;padding:0 4px 8px 8px!important}.panicbuttonarrows{content:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACzElEQVQ4T3WTTWgTURDH39vsV3abD0mjLhF6CoRF/CiCWKQJIhQVbS82t0phEw8K4qGee/VSSlFq2oUeCiJexFJrUUFWqr0oFTQohoKKYqCBZLtJX5Lu2ycTmiC2Xdg9vDfzm//8ZxajfR7TNHsYY6twjTE+YxjGj71C8V6H4+PjXCwW+ylJUsx1XUQp/R0KhXqGh4fp//G7AFNTU5Lf738vCMJRURRb8c1mE21vb+d5nj81Ojpa/xeyCzAzM7Moy/Iln8+HVFVFgiCgzc1NAADouWEYF/cFmKY5KQjCLZ7nUSgUQoFA4ANYUC6Xe7e2ttpK7mcymZttSEeBaZrXOY57IMsyJKJgMFjEGB+DQMbYJ8dxDoESQgjyPO92JpOZbBkMH9M0LyOEFhRFaSc3XdfVC4WCBPe6rgPko+M4QqVSQfV6HSDpbDb7GM/NzR12XbegKIoajUaxKIquIAh9+Xxewxg/3ZE6lEgkip7nvXUcx2fbNiOEEIxxvKVgfn6+NxKJvFZVNcgYu5HP59+JorgGU+A4DjUaDTCxV9f1PsbYvVKpVKOUDqXT6VcdDyzLijcajRPr6+uWz+f7pqpqCOAA8DwPIDYhJBGPx89DOwMDA587HrQdzeVyCsdxvxRFOQBjjEQisIVoY2OjBSGEVMrl8pGxsbHarilMTEz4u7q6VmVZPg5JsVgM8Tx/x/M87Lru3WKx2IJVq1WofDqbzYIHrNPC7OzsI0EQ0jDG7u5uSF5MJpNXoJJlWc8opRdACax2vV5fMAxjsNUC7L2maQ9FUUxLkoQ0TYNKb5LJZAoq7OwBZ1mW5XneWdu2EbzNZvNJOBy+iqenpw/KsvwCpEejUaj8nTF2MpVK2f8A8MrKSphSukYp7SmVSqhWq30hhJxrtbC0tCRRSnOBQGCQ4zi9v7//z15/6fLysiaK4tdqtfqyUqlcGxkZqf0FJW5N6bFeI8UAAAAASUVORK5CYII=)}.sideswitch{left:16px!important}.pointRight{transform:rotate(90deg)!important}.pointLeft{transform:rotate(-90deg)!important}.rejectionbutton:hover{background:#2ecc71!important}.pbIcon{content:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADkUlEQVR4Xu1bO44UQQx9DjgBRAsJIQGwCUh8BATAEZiQI5AQIBKIEAEJN2BD9ghAAIhlJUj4BIQksBGcAGmM3Kqa7Zntnm5Xl90l9XQ2mvrYr1yvbJeLYPwx8x0AZwCcBnAXAAOglmnjfzsAfgL4QUS7liK2CTJoTmZ+AuAagCuDBjrsvAfgPRE9zDTeYphsADDzBQD3AciKr1vlVB3imGIRz4joc+pA9X6DAQiKPwdwKYdAijH2AdwbCkQSAMxMRMTM/ArALYXQFk1fE9HtKJN2glQAzgP4YmTqWh3i1tgmoq/azmoAmPktgOvaiZzavyOiG5q5VAAwsyB8ds0xppnboq1Yw3ciEgvt9XUCIHsLwPFg8lspygth9JJmpZGQTEI/6XMAYBvAX+GqdWN0CsbMJ8KAxxKEqbo4AxDF/Adgi4j+DAXgF4CTqcqPCIBM/ZuITiUDkGvPj2QBoncnJ7RugcD24s52bpMu6xgRgAiCuNGNp8MR5QLpnQuk16Vb7/+1ICQS4Dp5hBS/rZJi4+oaTK4mQi8ZmixA3NubOUy/vhwFWIDwwRtxm5fkqv8Igc2n3nataFgAAFHai/UAaskCmPmjVVRXEAD7RHQ5orEAwHL1U3wBCw6oGezCCuoAvAzJDIVh929akAWI0LtENKsWJqpgjHgRp0ATKVcAhBzeg9zMX9gpsMT3AJ5KjjEC8CFjArNxXxS2BUTGPSK6GgFICTv7E0BCRGi9JSMxS2JPsrhCgKZfgRYg+s4EgEcAHptqX6gFiN4CwItwY2OKQaEWsFPltk01D4MXCgAEgLnl8bdwOZV5QaeF4Y0FOCFdnCe4sMwNAE4kqIkIvRalksl1sp5E6CqT62SFAuByDBa6BfyOwUIBqDjAxRUuFIDKFXYJhgoFoAqGXMLhQgGYuSVESgRAAjS3lJgKgPmckVZToQlsl1JiUthomhRVAWDvnUoK4DApGjLD5nmBvjkBD+csyuJ2MaKxTYe2jRcjUupqcjHqoJB2iqNXY2EbTPdyNABgZgV9939cSkMeaL8eDyBMt0DCEv0SLKBJhk2RVBt95iyT0zhBBlYo/k3/Mrk6ILkKJUcEIL1QsrYSg0tlRwRgWKlsOBUGF0uPBEC2YunB5fLOAOQtl7fiBK3v2rN9555fHUddCD3pJzM1Ypzuo6lAjNN+NrfCCxJATevhZBMhTfbpbAsY03s8vSamKPr5/H/QUiENVqRpfQAAAABJRU5ErkJggg==);margin:0!important}.uphint{left:215px!important}.relapsedbutton:hover{background:#9b59b6!important}.relapsedbutton{order:3!important;background:#8e44ad!important}.rejectionbutton{order:2!important;background:#27ae60!important}.depressionbutton:hover{background:#3498db!important}.depressionbutton{order:1!important;background:#2980b9!important;font-size:24px!important;height:48px!important}.emergencybutton:hover{background:red!important}.panicbutton{width:250px!important;padding:0!important;color:#fff!important;border:0!important;border-radius:0!important;font-size:16px;height:38px;position:inherit!important;font-weight:400!important;margin:0!important;letter-spacing:normal!important;text-transform:none!important;min-height:0!important;opacity:1!important}.panicbutton,.religiousSettingText{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif!important}.religiousSettingText{font-size:13px!important;color:#fff!important;text-align:center!important;position:relative!important;display:table-cell!important;vertical-align:middle!important;text-shadow:0 1px 0 rgba(0,0,0,.3)!important}.hastooltip span{visibility:hidden;position:absolute;top:-25px;left:0;right:0;width:fit-content;background-color:#999;color:#fff;text-align:center;padding:3px;border-radius:6px;z-index:inherit;opacity:0;transition-property:opacity;transition-delay:.8s;transition-duration:.6s}.hastooltip:hover .tooltiptext{visibility:visible;opacity:1}span.tooltiptext::after{content:"";position:absolute;top:100%;left:25;margin-left:-5px;border-width:5px;border-style:solid;border-color:#999 transparent transparent}'+
            '</style>'+
            '<div class="pboverride panicbuttonpopupboxtop">' +
              '<div class="hastooltip">' +
                '<img id="pbsideswitch" class="panicbuttonarrows sideswitch ' + (panicbutton.panicbuttonSideLeft ? 'pointRight' : 'pointLeft') + '">' +
                '<span class="tooltiptext">Click To Swap Sides</span>' +
              '</div>' +
              '<span id="topboxtext">Panic Button</span>' +
              '<img class="panicbuttonicon">' + 
              // '<div class="hastooltip">' + 
              //   '<img class="panicbuttonarrows uphint">' + 
              //   '<span class="tooltiptext">Mouse Over To Open</span>' +
              // '</div>' +
            '</div>' +
            '<div class="pboverride panicbuttonhiddenpopupbox">'+
              '<div id="religiousSetting" class="pboverride religiousSetting">'+
                '<input id="religiousEnabledCheckbox" class="pboverride" type="checkbox">'+
                '<div class="pboverride religiousSettingText">'+
                  'Religious'+
                '</div>'+
              '</div>'+
              '<button type="submit" value="Emergency" id="pbembtn" class="pboverride panicbutton emergencybutton"><img class="pbIcon" id="emIcon"><span id="emText">Emergency</span></button>'+
              '<button type="submit" value="Depression" id="pbdepbtn" class="pboverride panicbutton depressionbutton"><span id="emText">Depression</span></button>'+
              '<button type="submit" value="Rejection" id="pbrejbtn" class="pboverride panicbutton rejectionbutton"><span id="emText">Rejection</span></button>'+
              '<button type="submit" value="Relapsed" id="pbrelbtn" class="pboverride panicbutton relapsedbutton"><span id="emText">Relapsed</span></button>'+
            '</div>'+
          '</div>';
  return str;
}

panicbutton.SetReligiousSetting = function()
{
  let value = document.getElementById("religiousEnabledCheckbox").checked;
  chrome.storage.sync.set({
    religiousEnabled: value
  });
}

panicbutton.SetPBSideSetting = function()
{
  let value = (panicbutton.panicbuttonSideLeft ? "left" : "right");
  chrome.storage.sync.set({
    popupSide: value
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
    .then((response) => { return response.text(); })
    .then((newUrl) => { window.location.replace(newUrl); })
    .catch((err)=>{console.error("NoFap Panic Button PopupBox Error:", err);});
  });  
}

panicbutton.popupboxInit = function(religiousEnabled) 
{
  // Don't run in iframes
  if(window.top === window.self)
  {
    // Try and fit ourselves in a footer, if one doesn't exists create our own
    // Also ensure the footer is a footer at the bottom of the HTML block, since 
    // some sites use them inside the document
    let footer = document.querySelector('footer');
    if(footer === null || footer.parentNode.tagName !== "HTML")
    {
        footer = document.createElement('footer');
        footer.setAttribute("id", "popuppanicbuttonfooter");
        // Insert at very end of page, this avoids being overridden by any styles which may be added later, like stylish
        document.documentElement.appendChild(footer);
    }

    //footer.insertAdjacentHTML('beforeend', panicbutton.GetPopupPanicButtonString());
    
    // Create a link element to our popupbox stylesheet
    let popupboxStyle = document.createElement("link");
    popupboxStyle.rel = "stylesheet";
    popupboxStyle.type = "text/css";
    popupboxStyle.href = chrome.runtime.getURL("popupbox.css");
    footer.appendChild(popupboxStyle);

    // Create the iframe element our popup box will reside within
    let popupboxFrame = document.createElement("iframe");
    popupboxFrame.src = chrome.runtime.getURL("popupbox.html");
    popupboxFrame.classList.add("pboverride", "pbpb", "panicbuttonpopupbox");
    popupboxFrame.scrolling="no";
    popupboxFrame.id = "pbFrame";
    popupboxFrame.height = "276px"
    footer.appendChild(popupboxFrame);

    // let frameDoc = popupboxFrame.contentWindow.document;

    // console.log(frameDoc);
    // frameDoc.getElementById("religiousSetting").addEventListener("click", (e) => {
    //   if(e.target.id == "religiousEnabledCheckbox") return; // It can handle itself
    //   let checkbox = frameDoc.getElementById("religiousEnabledCheckbox"); checkbox.checked = !checkbox.checked; panicbutton.SetReligiousSetting();
    // });
    // frameDoc.getElementById("religiousEnabledCheckbox").addEventListener("change", () => {panicbutton.SetReligiousSetting();});
    // frameDoc.getElementById("pbembtn").addEventListener("click", () => {panicbutton.GetNewUrlAndUpdateTab("em");});
    // frameDoc.getElementById("pbdepbtn").addEventListener("click", () => {panicbutton.GetNewUrlAndUpdateTab("dep");});
    // frameDoc.getElementById("pbrejbtn").addEventListener("click", () => {panicbutton.GetNewUrlAndUpdateTab("rej");});
    // frameDoc.getElementById("pbrelbtn").addEventListener("click", () => {panicbutton.GetNewUrlAndUpdateTab("rel");});
    // frameDoc.getElementById("pbsideswitch").addEventListener("click", () => {
    //   frameDoc.getElementById("pbsideswitch").classList.remove((panicbutton.panicbuttonSideLeft ? "pointRight" : "pointLeft"));
    //   frameDoc.getElementById("pbsideswitch").classList.add((panicbutton.panicbuttonSideLeft ? "pointLeft" : "pointRight"));
    //   frameDoc.getElementById("popuppanicbutton").classList.remove((panicbutton.panicbuttonSideLeft ? "pbpbLeft" : "pbpbRight"));
    //   frameDoc.getElementById("popuppanicbutton").classList.add((panicbutton.panicbuttonSideLeft ? "pbpbRight" : "pbpbLeft"));
    //   panicbutton.panicbuttonSideLeft = !panicbutton.panicbuttonSideLeft;
    //   panicbutton.SetPBSideSetting();
    // });

    // panicbutton.religiousEnabled = religiousEnabled;
    // frameDoc.getElementById("religiousEnabledCheckbox").checked = religiousEnabled;
  }
}

// Check if the user has allowed us to insert the popup box
chrome.storage.sync.get({
  popupEnabled: true,
  popupBlacklist: ["www.example.com"],
  religiousEnabled: false,
  popupSide: "left"
}, (items) => {
  if(items.popupEnabled)
  {
    panicbutton.panicbuttonSideLeft = (items.popupSide == "left") ? true : false;
    // Check if the page we're on is blacklisted
    // Construct a regex from the provided addresses in the blacklist
    for(addr in items.popupBlacklist)
    {
      let address = items.popupBlacklist[addr];
      // Replace wildcards with letter catchalls
      let regAddr = address.replace(/\*/g, "[-a-zA-Z0-9@:%_\+.~#?&=]{2,256}");
      let regex = RegExp(regAddr);
      if(regex.exec(window.location.href))
      {
        // Address is on blacklist, end search, don't add to page
        return;
      }
      else continue;
    }
    // If we didn't return above we're safe to add the popup box to the page
    panicbutton.popupboxInit(items.religiousEnabled);
  }  
});
