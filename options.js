//Save options
function save_options()
{
    var religious = document.getElementById("religious").checked;
    console.log("religious = " + religious);
    chrome.storage.sync.set({
        religiousEnabled: religious 
    }, function() {
        // Update status
        var status = document.getElementById("status");
        status.textContent = "Options saved.";
        console.log("Saved!");
        setTimeout(function() {
            status.textContent = "";
        }, 750);
    });
}

// Restores checkbox state using preferences
function restore_options()
{
    // Default to off
    chrome.storage.sync.get({
        religiousEnabled: false
    }, function(items) {
        document.getElementById("religious").checked = items.religiousEnabled;
    });
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);