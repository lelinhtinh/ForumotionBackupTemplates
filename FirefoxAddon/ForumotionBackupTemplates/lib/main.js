var tabs = require("sdk/tabs");
var self = require("sdk/self"),
    data = self.data;
var prefs = require("sdk/simple-prefs").prefs;
var pageMod = require("sdk/page-mod");
var buttons = require("sdk/ui/button/action");


var prefsTab = {};

/**
 * Mở trang tùy chỉnh của addon Forumotion Backup Templates
 */
function openPrefPage() {
    prefsTab.attach({
        contentScriptWhen: "end",
        contentScript: "AddonManager.getAddonByID('" + self.id + "', function(aAddon) {unsafeWindow.gViewController.commands.cmd_showItemDetails.doCommand(aAddon, true);});"
    });
    // prefsTab.pin();
    prefsTab.activate();
}

/**
 * Mở trang quản lý addon của Firefox
 */
function openAddonPage() {
    if (!prefsTab.id) {
        tabs.open({
            url: "about:addons",
            onReady: function (tab) {
                prefsTab = tab;
                openPrefPage();
            }
        });
    } else {
        openPrefPage();
    }
}

var backupTab = {};

/**
 * Xử lý khi click vào nút chức năng
 */
function handleClick() {
    var setURL = prefs.fmURL;
    if (!setURL) {
        openAddonPage();
    } else {
        if (!backupTab.id) {
            var patt = /http:\/\/(www\.)?([^\/\s\n\?\&\:\+\%\!\#\.\@]+\.){1,2}\w{2,4}/; // Lọc tên miền trong URL nhập vào
            if (patt.test(setURL)) {
                prefsTab.close();
                setURL = setURL.match(patt)[0];
                tabs.open({
                    url: setURL + "/admin/index.forum?mode=export&part=themes&sub=styles",
                    onReady: function (tab) {
                        backupTab = tab;
                    }
                });
                prefs.fmURL = setURL;
            } else {
                prefs.fmURL = "";
                openAddonPage();
            }
        } else {
            var backupURL = setURL + "/admin/index.forum?mode=export&part=themes&sub=styles";
            if (backupTab.url.indexOf(backupURL) !== 0) {
                backupTab.url = backupURL;
            }
            backupTab.activate();
        }
    }
}

buttons.ActionButton({
    id: "forumotion_backup_templates_button",
    label: "Forumotion Themes management",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: handleClick
});

pageMod.PageMod({
    include: /http:\/\/(www\.)?([^\/\s\n\?\&\:\+\%\!\#\.\@]+\.){1,2}\w{2,4}\/admin\/index\.forum\?mode\=export\&.*/,
    contentStyleFile: data.url("fbtStyle.css"),
    contentScriptFile: data.url("resource.js"),
    contentScriptOptions: {
        "good": data.url("icons/good.png"),
        "bad": data.url("icons/bad.png"),
        "disable": data.url("icons/disable.png"),
        "error": data.url("icons/error.gif"),
        "info": data.url("icons/info.png"),
        "load": data.url("icons/load.gif"),
        "success": data.url("icons/success.gif"),

        "jszip": data.url("jszip.min.js"),
        "jszipUtils": data.url("jszip-utils.min.js"),
        "FileSaver": data.url("FileSaver.min.js"),
        "FBT": data.url("ForumotionBackupTemplates.js")
    }
});