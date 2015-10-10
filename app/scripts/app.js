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

  var docReady = false;
  var tbUsername = null;
  var tbUserEmailAddress = null;
  var imgUserProfilePicture = null;
  var menuItemLogin = null;
  var menuItemUrls = null;
  var menuItemNotes = null;
  var infoToast = null;
  var elUrls = null;
  var elNotes = null;

  app.addEventListener('dom-change', function() {
    console.log('Yeah! URLs Webapp is ready to perform awesome stuff!');
  });

  window.addEventListener('WebComponentsReady', function() {
    docReady = true;
    // get elements from dom
    tbUsername = document.querySelector('#tbUserName');
    tbUserEmailAddress = document.querySelector('#tbUserEmailAddress');
    imgUserProfilePicture = document.querySelector('#imgUserProfilePicture');
    menuItemLogin = document.querySelector('#menuItemLogin');
    menuItemUrls = document.querySelector('#menuItemUrls');
    menuItemNotes = document.querySelector('#menuItemNotes');
    infoToast = document.querySelector('#info-toast');
    elUrls = document.querySelector('#elUrls');
    elNotes = document.querySelector('#elNotes');
    // check if user login is expired
    if (UserInfo.isLoginExpired(UserInfo.get(UserInfo.EXPIREDATE))) {
      app.route = 'login';
    } else {
      tbUsername.innerHTML = UserInfo.get(UserInfo.USERNAME);
      tbUserEmailAddress.innerHTML = UserInfo.get(UserInfo.EMAILADDRESS);
      imgUserProfilePicture.src = UserInfo.get(UserInfo.PROFILEIMAGE);
      // toggle menu drawer items
      Util.getInstance().toggleMenuItems(menuItemLogin, menuItemUrls, menuItemNotes);
      // go to urls page
      app.route = 'urls';
      // load data from firebase
      elUrls.loadUrlCollection();
      elNotes.loadNotesCollection();
    }
  });

  app.handleLoginSuccessful = function(e) {
    // declare variable
    var userObj;
    var userName;
    var userEmailAddress;
    var userProfilePicture;
    // init variable
    userObj = e.detail;
    // get emailaddress, username, profileUrl
    switch(userObj.provider) {
      case 'password':
        userEmailAddress = userObj.password.email;
        userName = UserInfo.getUsernameFromMailAddress(userEmailAddress);
        userProfilePicture = userObj.password.profileImageURL;
        break;
    }
    // set user info to local storage
    UserInfo.set(UserInfo.USERID, userObj.uid);
    UserInfo.set(UserInfo.EXPIREDATE, userObj.expires);
    UserInfo.set(UserInfo.USERNAME, userName);
    UserInfo.set(UserInfo.EMAILADDRESS, userEmailAddress);
    UserInfo.set(UserInfo.PROFILEIMAGE, userProfilePicture);
    // set user info to toolbar menu
    tbUsername.innerHTML = userName;
    tbUserEmailAddress.innerHTML = userEmailAddress;
    imgUserProfilePicture.src = userProfilePicture;
    // toggle Menu Items
    Util.getInstance().toggleMenuItems(menuItemLogin, menuItemUrls, menuItemNotes);
    // go to the home element
    app.route = 'urls';
    // Load Url and Note Collection
    elUrls.loadUrlCollection();
    elNotes.loadNotesCollection();
    // show toast to inform the user
    Util.getInstance()
      .showToast(infoToast, 'User ' + userEmailAddress + ' is logged in!', '#2EB82E', '#EEEEEE');
  };

  app.handleLoginFailed = function(e) {
    // show toast to inform the user
    var errorObj = e.detail;
    Util.getInstance()
      .showToast(infoToast, 'Login failed! Please retry! Error Code: ' + errorObj.code + ', Error: ' + errorObj.message, '#FF3333', '#EEEEEE');
  };

  app.handleLoginExpired = function() {
    Util.getInstance()
      .showToast(infoToast, 'Login is expired! Please log in!', '#FF3333', '#EEEEEE');
    // go to login page
    app.route = 'login';
  };

  app.handleEditItemSuccessful = function(e) {
    var successObj = e.detail.detail;
    if (successObj)
      Util.getInstance().showToast(infoToast, 'URL Item ' + successObj.value + '.', '#2EB82E', '#EEEEEE');
  };

  app.handleEditItemFailed = function(e) {
    var errorObj = e.detail.detail;
    if (errorObj)
      Util.getInstance().showToast(infoToast, 'Edit URL Item is failed! Error: ' + errorObj.value, '#FF3333', '#EEEEEE');
  };

  app.handleRemoveItemSuccessful = function(e) {
    var successObj = e.detail.detail;
    if (successObj)
      Util.getInstance().showToast(infoToast, 'URL Item ' + successObj.value + '.', '#2EB82E', '#EEEEEE');
  };

  app.handleRemoveItemFailed = function(e) {
    var errorObj = e.detail.detail;
    if (errorObj)
      Util.getInstance().showToast(infoToast, 'Remove URL Item is failed! Error: ' + errorObj.value, '#FF3333', '#EEEEEE');
  };

  app.logoutUser = function() {
    Util.getInstance()
      .showToast(infoToast, 'Logging out...', '#333333', '#EEEEEE');
    // log user out
    Auth.getInstance().logout();
    // set Placedolder to toolbar menu
    tbUsername.innerHTML = 'Your Username...';
    tbUserEmailAddress.innerHTML = 'Your Emailaddress...';
    imgUserProfilePicture.src = '../images/touch/icon-128x128.png';
    // toggle Menu Items
    Util.getInstance().toggleMenuItems(menuItemLogin, menuItemUrls, menuItemNotes);
    // delete localStorage and clear listviews
    UserInfo.deleteAllItems();
    elUrls.clearListview();
    elNotes.clearListview();
    // go to login page
    app.route = 'login';
  };

  app.onMenuSelect = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (docReady) {
      if (drawerPanel.narrow) {
        drawerPanel.closeDrawer();
      }
    }
  };
})(document);
