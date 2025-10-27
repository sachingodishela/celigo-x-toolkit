// ==UserScript==
// @name         Celigo IO Toolkit
// @version      0.1
// @description  Press ~ to open current resource in JSON view in new tab
// @author       Sachin Godishela
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_openInTab
// @match        https://*.io/*
// @match        http://localhost.io:*/*
// ==/UserScript==

function main_ok (e) {
  'use strict';
  if (e.key !== '`') return
  const parsedURL = new URL(document.URL)
  const baseURI = parsedURL.origin
  const components = parsedURL.pathname.split('/')
  let resource = components[components.length - 2]
  let resourceId
  if (['connections', 'imports', 'exports', 'flowBuilder', 'iClients'].includes(resource)) {
    resourceId = components[components.length - 1]
  } else {
    // try integrationapps pattern
    const integrationAppsIndex = components.indexOf('integrationapps')
    if (integrationAppsIndex !== -1) {
      // Pattern: /integrationapps/AppName/IntegrationId/flows/...
      // We want the IntegrationId which is at index integrationAppsIndex + 2
      resourceId = components[integrationAppsIndex + 2]
      resource = 'integrations'
    }

    // try integration
    if (!resourceId) {
      for (let i = 0; i < components.length; i++) {
        if (components[i] === 'integrations') {
          resource = 'integrations'
          resourceId = components[i + 1]
          if (resource && resourceId) break; else return
        }
      }
    }
  }
  const urlToBeOpenedInNewTab = baseURI + '/api/' + (resource === 'flowBuilder' ? 'flows' : resource) + '/' + resourceId
  GM_openInTab(urlToBeOpenedInNewTab, { active: true, insert: true, setParent: true })
}

document.addEventListener('keyup', main_ok, false)
