// ==UserScript==
// @name         古诗文网增强
// @namespace    https://github.com/tfia
// @version      0.4
// @description  屏蔽古诗文网登录弹窗，移除阅读页全部广告，自动展开折叠的文本（可选择仅展开译文或全部展开），一键折叠全部文本
// @author       RhDu
// @match        https://so.gushiwen.cn/*
// @icon         https://www.google.com/s2/favicons?domain=https://so.gushiwen.cn
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// ==/UserScript==
 
var id;
var isTranslationOnly = GM_getValue("isTranslationOnly", false);
 
function registerMenuCommand()
{
    if(isTranslationOnly == false) id=GM_registerMenuCommand("❌ 仅自动展开译文", reverseTranslation, "t");
    else id=GM_registerMenuCommand("✅ 仅自动展开译文", reverseTranslation, "t");
}
 
function reverseTranslation()
{
    GM_setValue("isTranslationOnly", !isTranslationOnly);
    isTranslationOnly = GM_getValue("isTranslationOnly", false);
    GM_unregisterMenuCommand(id);
    registerMenuCommand();
    Swal.fire
    ({
        toast: true,
        position: 'top-right',
        iconColor: '#f8bb86',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        icon: 'success',
        title: '操作成功 刷新页面生效'
    })
}
 
function foldAll()
{
    for(var i=0;i < $("a:contains(▲)").length;i++) $("a:contains(▲)")[i].click();
    Swal.fire
    ({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        icon: 'success',
        title: '已全部折叠'
    })
}
 
(function()
{
    'use strict';
    //添加菜单选项
    registerMenuCommand();
    GM_registerMenuCommand("#️⃣ 一键折叠所有内容", foldAll, "f");
    //移除登录弹窗
    var object = $("#hide-center2")[0];
    if (object != null) object.parentNode.removeChild(object);
    //消除侧边广告
    $(".right")[1].remove();
    //消除底部广告
    $('#btmwx').remove();
    //自动展开所有折叠的文本
    if(isTranslationOnly == true) $("a:contains(展开)")[0].click();
    else for(var i=0;i < $("a:contains(展开)").length;i++) $("a:contains(展开)")[i].click();
})();