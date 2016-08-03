//Save options
function save_options()
{
    var religious = document.getElementById("religious").checked;
    var nsfwguard = document.getElementById("nsfwguard").checked;
    var safehaven = document.getElementById("nsfwguard-safehaven").value;
    chrome.storage.sync.set({
        religiousEnabled: religious,
        nsfwguardEnabled: nsfwguard,
        safehavenUrl: safehaven
    }, function() {
        // Update status
        var status = document.getElementById("status");
        status.textContent = "Options saved.";
        setTimeout(function() {
            status.textContent = "";
        }, 750);
    });
}

// Restores checkbox state using preferences
function restore_options()
{
    // Default religious off, nsfwguard to on and safehaven to /r/nofap
    chrome.storage.sync.get({
        religiousEnabled: false,
        nsfwguardEnabled: true,
        safehavenUrl: "https://www.reddit.com/r/nofap/"
    }, function(items) {
        document.getElementById("religious").checked = items.religiousEnabled;
        document.getElementById("nsfwguard").checked = items.nsfwguardEnabled;
        document.getElementById("nsfwguard-safehaven").value = items.safehavenUrl;
        if(!items.nsfwguardEnabled) { document.getElementById("nsfwguard-safehaven").disabled=true; }
    });
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
document.addEventListener("DOMContentLoaded", function(event) {
    var selector = document.querySelector("input[name=nsfwguard]");
    var safehavenInput = document.querySelector("input[name=nsfwguard-safehaven]");
    selector.addEventListener("change", function(event) {
        if(selector.checked) { safehavenInput.disabled=false; }
        else { safehavenInput.disabled=true; }
    });
});
