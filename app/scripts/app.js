/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function(document) {
  'use strict';

  var app = document.querySelector('#app');
  var infoToast = null;
  var userId = undefined;
  var expiresDate = undefined;

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Yeah! URLs Webapp is ready to perform awesome stuff!');
    infoToast = document.querySelector('#info-toast');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  app.showLogoutMessage = function() {
    infoToast.text = 'Logging out...';
    infoToast.toggle();

    var rootRef = new Firebase('https://yeah-url-extension.firebaseio.com/');
    rootRef.unauth();
    userId = undefined;
    expiresDate = undefined;

    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('expiresDate');
  };

  function calcCurrentExpiresDate() {
    return Math.round(new Date().getTime() / 1000.0);
  }

  app.setUserId = function(value) {
    if (userId !== value) {
      userId = value;
      window.localStorage.setItem('userId', userId);
    }
  };

  app.getUserId = function() {
    if ((expiresDate !== calcCurrentExpiresDate()) && (typeof userId === 'undefined')) {
      userId = window.localStorage.getItem('userId');
    }
    return userId;
  };

  app.setExpiresDate = function(value) {
    if (expiresDate !== value) {
      expiresDate = value;
      window.localStorage.setItem('expiresDate', expiresDate);
    }
  };

  app.getExpiresDate = function() {
    if ((expiresDate !== calcCurrentExpiresDate()) && (typeof userName === 'undefined')) {
      expiresDate = window.localStorage.getItem('expiresDate');
    }
    return expiresDate;
  };
})(document);
