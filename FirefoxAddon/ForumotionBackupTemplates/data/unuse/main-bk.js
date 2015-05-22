var opt = require("sdk/self").data;

var tabs = require("sdk/tabs");

var ss = require("sdk/simple-storage");

var options = require("sdk/panel").Panel({
    contentURL: opt.url("options.html"),
    contentStyleFile: opt.url("options.css"),
    contentScriptFile: opt.url("options.js"),
});

var buttons = require("sdk/ui/button/action");

var button = buttons.ActionButton({
    id: "mozilla-link",
    label: "Visit Mozilla",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: handleClick
});

function handleClick(state) {
    if (!ss.storage.fmURL) {
        options.show();
    } else {
        tabs.open(ss.storage.fmURL + "/admin/index.forum?mode=export&part=themes&sub=styles");
    }
}

options.on("show", function () {
    options.port.emit("show");
});

options.port.on("text-entered", function (text) {
    ss.storage.fmURL = text;
    tabs.open(text + "/admin/index.forum?mode=export&part=themes&sub=styles");
    options.hide();
});
