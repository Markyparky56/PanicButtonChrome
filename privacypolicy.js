function restore()
{
  chrome.storage.sync.get({
    nsfwguardEnabled: true,
    popupEnabled: true
  }, function(items) {
    document.getElementById("nsfwguard").checked = items.nsfwguardEnabled;
    document.getElementById("popup").checked = items.popupEnabled
  });
}

function save()
{
  chrome.storage.sync.set({
    nsfwguardEnabled: document.getElementById("nsfwguard").checked,
    popupEnabled: document.getElementById("popup").checked
  }, function() {
    let status = document.getElementById("status");
    status.textContent = "Preferences Saved.";
    setTimeout(function() {
      status.textContent = "";
    }, 750);
  })
}

document.addEventListener("DOMContentLoaded", restore);
document.getElementById("save").addEventListener("click", save);