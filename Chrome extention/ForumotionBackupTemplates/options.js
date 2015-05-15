// Saves options to chrome.storage
function save_options(e) {
    e.preventDefault();

    var fmurl = document.getElementById('url').value;
    fmurl = fmurl.match(/http:\/\/(www\.)?([^\/\s\n\?\&\:\+\%\!\#\.\@]+\.){1,2}\w{2,4}/)[0];
    document.getElementById('url').value = fmurl;

    chrome.storage.sync.set({
        url: fmurl
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = "Options saved!";
        setTimeout(function () {
            status.textContent = '';
            chrome.tabs.create({
                "url": fmurl + "/admin/index.forum?mode=export&part=themes&sub=styles",
                "active": true
            });
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        url: ''
    }, function (items) {
        document.getElementById('url').value = items.url;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('enterURL').addEventListener('submit', save_options);