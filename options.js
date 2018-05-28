//Save options
function save_options()
{
    let religious = document.getElementById("religious").checked;
    let nsfwguard = document.getElementById("nsfwguard").checked;
    let safehaven = document.getElementById("nsfwguard-safehaven").value;
    let popup = document.getElementById("popup").checked;
    let popupSide = document.querySelector("input[name='popupSide']:checked").value;

    // Get the popup blacklist in text form
    let popupBlacklist = document.getElementById("popupBlacklist").value;
    // Split into a list on semi-colons
    popupBlacklist = popupBlacklist.split(';');
    // Clean out empty values
    for(let i = 0; i < popupBlacklist.length; i++)
    {
      if(popupBlacklist[i] === "")
      {
        popupBlacklist.splice(i, 1);
        i--;
      }
    }

    chrome.storage.sync.set({
        religiousEnabled: religious,
        nsfwguardEnabled: nsfwguard,
        safehavenUrl: safehaven,
        popupEnabled: popup,
        popupBlacklist: popupBlacklist,
        popupSide: popupSide
    }, function() {
        // Update status
        let status = document.getElementById("status");
        status.textContent = "Options saved.";
        setTimeout(function() {
            status.textContent = "";
        }, 750);
    });
}

// Restores setting state using preferences
function restore_options()
{
    // Default religious off, nsfwguard to on and safehaven to /r/nofap
    // Default popup box on, dummy example address for blacklist
    chrome.storage.sync.get({
        religiousEnabled: false,
        nsfwguardEnabled: true,
        safehavenUrl: "https://www.reddit.com/r/nofap/",
        popupEnabled: true,
        popupBlacklist: ["www.example.com"],
        popupSide: "left"
    }, function(items) {
        document.getElementById("religious").checked = items.religiousEnabled;
        document.getElementById("nsfwguard").checked = items.nsfwguardEnabled;
        document.getElementById("nsfwguard-safehaven").value = items.safehavenUrl;
        document.getElementById("popup").checked = items.popupEnabled;
        if(items.popupSide == "left")
        {
          document.getElementById("popupSideLeft").checked = true;
        }
        else
        {
          document.getElementById("popupSideRight").checked = true;
        }

        // Reconstruct black list from array
        let blacklist = items.popupBlacklist.join(';');
        if(blacklist[blacklist.length-1] !== ';') blacklist += ';'; // Append a final semi-colon if there isn't one
        document.getElementById("popupBlacklist").textContent = blacklist;

        // Disable the nsfwguard safehaven for editing if nsfwgaurd is disabled
        if(!items.nsfwguardEnabled) { document.getElementById("nsfwguard-safehaven").disabled=true; }
    });
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
document.addEventListener("DOMContentLoaded", function(event) {
    let selector = document.querySelector("input[name=nsfwguard]");
    let safehavenInput = document.querySelector("input[name=nsfwguard-safehaven]");
    selector.addEventListener("change", function(event) {
        if(selector.checked) { safehavenInput.disabled=false; }
        else { safehavenInput.disabled=true; }
    });
});
