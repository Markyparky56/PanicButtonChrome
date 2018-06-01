// Load the nsfwguard_subredditdb.json file into storage on install
chrome.runtime.onInstalled.addListener((details) => {
  fetch(chrome.runtime.getURL("nsfwguard_subredditdb.json"))
  .then((file) => {
    return file.json();
  })
  .then((json) => {
    chrome.storage.local.get({
      subredditDB: {}
    }, (db) => {
      // Copy json entry by entry to avoid erasing any preexisting subreddits
      // This should hopefully future proof the db incase we ever increase the shipped 
      // db size, and avoid erasing the db when we update for any reason
      for(var item in json)
      {
        db.subredditDB[item] = json[item];
      }
      chrome.storage.local.set({
        subredditDB: db.subredditDB
      });
    });
  });
});
