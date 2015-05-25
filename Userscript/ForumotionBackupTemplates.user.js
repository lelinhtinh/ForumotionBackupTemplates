// ==UserScript==
// @name         Forumotion backup templates
// @namespace    http://devs.forumvi.com/
// @version      2.0.1
// @description  Export & Import forumotion Templates
// @copyright    2014+, Zzbaivong
// @icon         http://i19.servimg.com/u/f19/18/83/32/63/icon-610.png
// @match        http://*/admin/index.forum?mode=export*
// @match        http://*/admin/index.forum?*&mode=export*
// @resource     jszip https://openuserjs.org/src/libs/baivong/jszip.js
// @resource     jsziputils https://openuserjs.org/src/libs/baivong/jszip-utils.js
// @resource     filesaver https://openuserjs.org/src/libs/baivong/FileSaver.js
// @resource     zzFmBackup https://openuserjs.org/src/libs/baivong/zzFmBackup.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

/**
 * jsZip (v2.5.0) By Stuart Knightley <http://stuartk.com/jszip>
 * jszip-utils (v0.0.2) By Stuart Knightley, David Duponchel <http://stuk.github.io/jszip-utils>
 * FileSaver (2015-05-07) By Eli Grey <http://eligrey.com>
 * zzFmBackup (v2.0.1) By Zzbaivong <http://www.devs.cf>
 */

function addscript(source) {
    $("<script>", {
        type: "text/javascript",
        text: source
    }).appendTo("head");
}

GM_addStyle("#zzBackup fieldset{counter-reset:section;border:1px solid #07f}#zzBackup legend{color:#e000a2}#zzBackup ol{margin:5px 0 15px;list-style:none outside none}#zzBackup li:before{counter-increment:section;content:counter(section) '.';width:30px;display:inline-block;text-align:right;margin-right:5px}.backupOption{font-size:18px;color:#00a8a1}#importNoti strong{color:#DA4FB8}#zzBackup dt label{display:block;margin-top:10px;color:#777}#zzBackup dt label:hover{color:#111}#zzBackup label input:checked ~ span{color:#0094CA}.buttonOne{display:none;margin-top:10px;padding:7px 20px;background:#f90e5e;color:#FFF;font-weight:700;border:3px solid #DDD}.buttonOne:hover{border-color:#444;cursor:pointer}.buttonOne:active{background:#444}#zzBackup :disabled,#zzBackup :disabled ~ span{color:#999;cursor:not-allowed}");
addscript(GM_getResourceText("jszip"));
addscript(GM_getResourceText("jsziputils"));
addscript(GM_getResourceText("filesaver"));
addscript(GM_getResourceText("zzFmBackup"));
