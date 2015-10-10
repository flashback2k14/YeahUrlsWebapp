/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';

(function (document) {
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

  var userInfo = null;

  app.addEventListener('dom-change', function () {
    console.log('Yeah! URLs Webapp is ready to perform awesome stuff!');
  });

  window.addEventListener('WebComponentsReady', function () {
    docReady = true;
    // init UserInfo
    userInfo = new UserInfo();
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
    if (userInfo.isLoginExpired(userInfo.getInfo(userInfo.expireDate))) {
      app.route = 'login';
    } else {
      tbUsername.innerHTML = userInfo.getInfo(userInfo.userName);
      tbUserEmailAddress.innerHTML = userInfo.getInfo(userInfo.emailAddress);
      imgUserProfilePicture.src = userInfo.getInfo(userInfo.profileImage);
      // toggle menu drawer items
      Util.toggleMenuItems(menuItemLogin, menuItemUrls, menuItemNotes);
      // go to urls page
      app.route = 'urls';
      // load data from firebase
      elUrls.loadUrlCollection();
      elNotes.loadNotesCollection();
    }
  });

  app.handleLoginSuccessful = function (e) {
    // declare variable
    var userObj = undefined;
    var userName = undefined;
    var userEmailAddress = undefined;
    var userProfilePicture = undefined;
    // init variable
    userObj = e.detail;
    // get emailaddress, username, profileUrl
    switch (userObj.provider) {
      case 'password':
        userEmailAddress = userObj.password.email;
        userName = UserInfo.getUsernameFromMailAddress(userEmailAddress);
        userProfilePicture = userObj.password.profileImageURL;
        break;
    }
    // set user info to local storage
    userInfo.setInfo(userInfo.userId, userObj.uid);
    userInfo.setInfo(userInfo.expireDate, userObj.expires);
    userInfo.setInfo(userInfo.userName, userName);
    userInfo.setInfo(userInfo.emailAddress, userEmailAddress);
    userInfo.setInfo(userInfo.profileImage, userProfilePicture);
    // set user info to toolbar menu
    tbUsername.innerHTML = userName;
    tbUserEmailAddress.innerHTML = userEmailAddress;
    imgUserProfilePicture.src = userProfilePicture;
    // toggle Menu Items
    Util.toggleMenuItems(menuItemLogin, menuItemUrls, menuItemNotes);
    // go to the home element
    app.route = 'urls';
    // Load Url and Note Collection
    elUrls.loadUrlCollection();
    elNotes.loadNotesCollection();
    // show toast to inform the user
    Util.showToast(infoToast, 'User ' + userEmailAddress + ' is logged in!', '#2EB82E', '#EEEEEE');
  };

  app.handleLoginFailed = function (e) {
    // show toast to inform the user
    var errorObj = e.detail;
    Util.showToast(infoToast, 'Login failed! Please retry! Error Code: ' + errorObj.code + ', Error: ' + errorObj.message, '#FF3333', '#EEEEEE');
  };

  app.handleLoginExpired = function () {
    Util.showToast(infoToast, 'Login is expired! Please log in!', '#FF3333', '#EEEEEE');
    // go to login page
    app.route = 'login';
  };

  app.handleEditItemSuccessful = function (e) {
    var successObj = e.detail.detail;
    if (successObj) Util.showToast(infoToast, 'URL Item ' + successObj.value + '.', '#2EB82E', '#EEEEEE');
  };

  app.handleEditItemFailed = function (e) {
    var errorObj = e.detail.detail;
    if (errorObj) Util.showToast(infoToast, 'Edit URL Item is failed! Error: ' + errorObj.value, '#FF3333', '#EEEEEE');
  };

  app.handleRemoveItemSuccessful = function (e) {
    var successObj = e.detail.detail;
    if (successObj) Util.showToast(infoToast, 'URL Item ' + successObj.value + '.', '#2EB82E', '#EEEEEE');
  };

  app.handleRemoveItemFailed = function (e) {
    var errorObj = e.detail.detail;
    if (errorObj) Util.showToast(infoToast, 'Remove URL Item is failed! Error: ' + errorObj.value, '#FF3333', '#EEEEEE');
  };

  app.logoutUser = function () {
    Util.showToast(infoToast, 'Logging out...', '#333333', '#EEEEEE');
    // log user out
    Auth.logout();
    // set Placedolder to toolbar menu
    tbUsername.innerHTML = 'Your Username...';
    tbUserEmailAddress.innerHTML = 'Your Emailaddress...';
    imgUserProfilePicture.src = '../images/touch/icon-128x128.png';
    // toggle Menu Items
    Util.toggleMenuItems(menuItemLogin, menuItemUrls, menuItemNotes);
    // delete localStorage and clear listviews
    userInfo.deleteAllItems();
    elUrls.clearListview();
    elNotes.clearListview();
    // go to login page
    app.route = 'login';
  };

  app.onMenuSelect = function () {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (docReady) {
      if (drawerPanel.narrow) {
        drawerPanel.closeDrawer();
      }
    }
  };
})(document);

//# sourceMappingURL=app-compiled.js.map