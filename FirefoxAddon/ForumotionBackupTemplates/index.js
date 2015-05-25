// require("sdk/preferences/service").set("extensions.sdk.console.logLevel", "debug");


var tabs = require("sdk/tabs");
var self = require("sdk/self"),
    data = self.data;
var prefs = require("sdk/simple-prefs").prefs;
var pageMod = require("sdk/page-mod");
var buttons = require("sdk/ui/button/action");

var patt = /http:\/\/(www\.)?([^\/\s\n\?\&\:\+\%\!\#\.\@]+\.){1,2}\w{2,4}/; // Lọc tên miền trong URL nhập vào

var listTabs = [],
    listTabsURL = [],
    prefsTabIndex = 0,
    backupTabIndex = 0;

/**
 * Mở trang tùy chỉnh của addon Forumotion Backup Templates
 */
function openPrefPage(tab) {
    tab.attach({
        contentScriptWhen: "end",
        contentScript: "AddonManager.getAddonByID('" + self.id + "', function(aAddon) {unsafeWindow.gViewController.commands.cmd_showItemDetails.doCommand(aAddon, true);});"
    });
    tab.activate();
}


/**
 * Xử lý khi click vào nút chức năng
 */
function handleClick() {

    // Cập nhật danh sách tab và url của nó
    listTabs = [];
    listTabsURL = [];

    for (let tab of tabs) {
        listTabs.push(tab);
        listTabsURL.push(tab.url);
    }

    var setURL = prefs.fmURL;
    // console.log(setURL);

    if (!patt.test(setURL)) { // Nếu thiết lập URL chưa đúng hoặc chưa thiết lập
        prefs.fmURL = "";
        prefsTabIndex = listTabsURL.indexOf("about:addons"); // Lấy index của tab addon

        if (prefsTabIndex === -1) { // Không có tab addon

            tabs.open({
                url: "about:addons",
                onReady: function (tab) {
                    openPrefPage(tab);
                }
            });

        } else {

            openPrefPage(listTabs[prefsTabIndex]);

        }

    } else { // Nếu đã thiết lập URL đúng

        setURL = setURL.match(patt)[0];
        setURL = setURL.match(patt)[0];

        prefs.fmURL = setURL;

        setURL = setURL + "/admin/index.forum?mode=export&part=themes&sub=styles";

        backupTabIndex = listTabsURL.indexOf(setURL); // Lấy index của tab backup

        if (backupTabIndex === -1) { // Không có tab backup

            tabs.open(setURL);

        } else {

            listTabs[backupTabIndex].activate();

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
