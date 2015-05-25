// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function () {

    chrome.storage.sync.get({
        url: ""
    }, function (items) {

        var furl = items.url;

        if (furl !== null && furl !== "") {

            var backupUrl = furl + "/admin/index.forum?mode=export&part=themes&sub=styles";

            chrome.tabs.query({
                url: backupUrl
            }, function (tabs) {
                if (tabs.length) {
                    chrome.tabs.update(tabs[0].id, {
                        active: true
                    });
                } else {
                    chrome.tabs.create({
                        url: backupUrl,
                        active: true
                    });
                }
            });

        } else {

            var optionsUrl = chrome.extension.getURL("options.html");

            chrome.tabs.query({
                url: optionsUrl
            }, function (tabs) {
                if (tabs.length) {
                    chrome.tabs.update(tabs[0].id, {
                        active: true
                    });
                } else {
                    chrome.tabs.create({
                        url: optionsUrl,
                        active: true
                    });
                }
            });

            // chrome.tabs.create({
            //     url: "options.html"
            // });
            // chrome.tabs.create({
            //     "url": "chrome://extensions/?options=" + chrome.runtime.id,
            //     "active": true
            // });
        }
    });
});
