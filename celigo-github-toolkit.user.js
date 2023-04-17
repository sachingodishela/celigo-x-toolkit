// ==UserScript==
// @name         Celigo GitHub Toolkit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto create href links to jira trackers in PR title
// @author       https://github.com/sachingodishela
// @match        https://github.com/celigo/*/pull/*
// @grant        none
// ==/UserScript==

(function () {
'use strict'

  var parent_div = document.getElementsByClassName('js-issue-title markdown-title')[0]
  var original_pr_title = parent_div.childNodes[0].textContent
  var reg_exp = /(io|cs)-\d+/gi
  var tickets = original_pr_title.match(reg_exp).map(ticket => {
      var a = document.createElement('a')
      a.appendChild(document.createTextNode(ticket))
      a.title = ticket
      a.href = 'https://celigo.atlassian.net/browse/' + ticket
      return a
  })
  var occurence = -1
  var splitted_pr_title = original_pr_title.replaceAll(reg_exp, () => {
      occurence = occurence + 1
      return '_lol_$' + occurence + '_lol_'
  }).split('_lol_').filter(a => a)
  parent_div.removeChild(parent_div.childNodes[0])
  splitted_pr_title.forEach(entry => {
      if (!entry.startsWith('$')) {
          parent_div.appendChild(document.createTextNode(entry))
      } else {
          parent_div.appendChild(tickets[Number(entry.substr(1))])
      }
  })
})()
