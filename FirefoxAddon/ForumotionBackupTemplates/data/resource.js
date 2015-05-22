/**
 * Nhúng các file script vào trang quản lý giao diện của Forumotion
 * @param {String} nameJS Tên file script cần nhúng
 */
function includeJS(nameJS) {
    var po = document.createElement('script');
    po.type = "text/javascript";
    po.async = true;
    po.src = self.options[nameJS];
    var s = document.getElementsByTagName('script')[1];
    s.parentNode.insertBefore(po, s);
}

// Lấy icon trong thư mục data, tạo biến và nhúng vào trang
var goodIcon = self.options.good,
    badIcon = self.options.bad,
    disableIcon = self.options.disable,
    errorIcon = self.options.error,
    infoIcon = self.options.info,
    loadIcon = self.options.load,
    successIcon = self.options.success;
(function () {
    var po = document.createElement('script');
    po.type = "text/javascript";
    po.innerHTML = "goodIcon = '" + goodIcon + "'; badIcon = '" + badIcon + "'; disableIcon = '" + disableIcon + "'; errorIcon = '" + errorIcon + "'; infoIcon = '" + infoIcon + "'; loadIcon = '" + loadIcon + "'; successIcon = '" + successIcon + "';";
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

includeJS("jszip");
includeJS("jszipUtils");
includeJS("FileSaver");
includeJS("FBT");
