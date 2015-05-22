self.port.on("show", function() {
    document.getElementById("enterURL").focus();
    document.getElementById("enterURL").addEventListener("submit", function (e) {
        e.preventDefault();

        var fmurl = document.getElementById("url").value;
        fmurl = fmurl.match(/http:\/\/(www\.)?([^\/\s\n\?\&\:\+\%\!\#\.\@]+\.){1,2}\w{2,4}/)[0];
        document.getElementById("url").value = fmurl;

        var status = document.getElementById("status");
        status.textContent = "Options saved!";

        self.port.emit("text-entered", fmurl);
    });
});
