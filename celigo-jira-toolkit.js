// ==UserScript==
// @name         Celigo JIRA Toolkit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Sachin Godishela
// @grant        GM_openInTab
// @match        https://celigo.atlassian.net/browse/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// ==/UserScript==

function main_ok (e) {
    'use strict';
    if (e.key !== '`') return
    var regex = /https:\/\/github.com\/celigo\/[A-Za-z0-9\-\/]*\b/g
    var entireHTMLSource = document.documentElement.innerHTML
    var matches = entireHTMLSource.match(regex)
    matches?.forEach(url => GM_openInTab(url, { active: true, insert: true, setParent: true }))
}


document.addEventListener('keyup', main_ok, false)
