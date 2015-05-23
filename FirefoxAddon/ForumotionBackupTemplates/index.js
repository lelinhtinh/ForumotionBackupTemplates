require("sdk/preferences/service").set("extensions.sdk.console.logLevel", "debug");


var tabs = require("sdk/tabs");
var self = require("sdk/self"),
    data = self.data;
var prefs = require("sdk/simple-prefs").prefs;
var pageMod = require("sdk/page-mod");
var buttons = require("sdk/ui/button/action");

var patt = /http:\/\/(www\.)?([^\/\s\n\?\&\:\+\%\!\#\.\@]+\.){1,2}\w{2,4}/; // Lọc tên miền trong URL nhập vào
var listTabsId = [],
    activeTabId = 0,
    prefsTab = {},
    backupTab = {};

/**
 * Mở trang tùy chỉnh của addon Forumotion Backup Templates
 */
function openPrefPage() {
    prefsTab.attach({
        contentScriptWhen: "end",
        contentScript: "AddonManager.getAddonByID('" + self.id + "', function(aAddon) {unsafeWindow.gViewController.commands.cmd_showItemDetails.doCommand(aAddon, true);});"
    });

    if (prefsTab.id !== activeTabId.id) {
        prefsTab.activate();
    }
}


/**
 * Xử lý khi click vào nút chức năng
 */
function handleClick() {
    activeTabId = tabs.activeTab.id; // Lấy id tab đang mở

    // Cập nhật danh sách tab id
    listTabsId = [];
    for (let tab of tabs) {
        listTabsId.push(tab.id);
    }

    var setURL = prefs.fmURL;
    // console.log(setURL);
    if (!patt.test(setURL)) { // Nếu thiết lập URL chưa đúng hoặc chưa thiết lập
        prefs.fmURL = "";

        if (listTabsId.indexOf(prefsTab.id) === -1) { // Không có tab thiết lập URL
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

    } else {

        if (listTabsId.indexOf(prefsTab.id) !== -1) { // Nếu tab thiết lập URL đang mở
            prefsTab.close();
        }

        if (listTabsId.indexOf(backupTab.id) === -1) { // Không có tab Themes management

            setURL = setURL.match(patt)[0]; // Cập nhật URL, chỉ lấy phần protocol + host

            tabs.open({
                url: setURL + "/admin/index.forum?mode=export&part=themes&sub=styles",
                onReady: function (tab) {
                    backupTab = tab;
                    if (prefs.fmPin) {
                        backupTab.pin();
                    }
                }
            });
            prefs.fmURL = setURL;

        } else {
            var backupURL = setURL + "/admin/index.forum?mode=export&part=themes&sub=styles";
            if (backupTab.url.indexOf(backupURL) !== 0) {
                backupTab.url = backupURL;
            }
            backupTab.activate();
            if (prefs.fmPin) {
                backupTab.pin();
            }
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
