// ==UserScript==
// @name         Celigo GitHub Toolkit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto create href links to jira trackers in PR title
// @author       https://github.com/sachingodishela
// @match        https://github.com/celigo/*/pull/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  var parent_div = document.getElementsByClassName('js-issue-title markdown-title')[0]
  var original_pr_title = parent_div.childNodes[0].textContent
  var reg_exp = /(IO-|CS-|io-|cs-)\d+/g
  var jira_id = original_pr_title.match(reg_exp)
  if (!jira_id) return
  else jira_id = jira_id[0]
  var splitted_pr_title = original_pr_title.replaceAll(reg_exp, '@@sachin@@beaches_be_tripping@@sachin@@').split('@@sachin@@')
  parent_div.removeChild(parent_div.childNodes[0])
  var aElement = document.createElement('a')
  var text = document.createTextNode(jira_id)
  aElement.appendChild(text)
  aElement.title = jira_id
  aElement.href = 'https://celigo.atlassian.net/browse/' + jira_id
  splitted_pr_title.forEach(entry => {
    if (entry !== 'beaches_be_tripping') {
      parent_div.appendChild(document.createTextNode(entry))
    } else {
      parent_div.appendChild(aElement)
    }
  })
})()
