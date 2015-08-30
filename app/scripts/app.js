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
  var infoToast = null;
  var elOverview = null;
  var elNotes = null;

  app.addEventListener('dom-change', function() {
    console.log('Yeah! URLs Webapp is ready to perform awesome stuff!');
  });

  window.addEventListener('WebComponentsReady', function() {
    docReady = true;
    //
    tbUsername = document.querySelector('#tbUserName');
    tbUserEmailAddress = document.querySelector('#tbUserEmailAddress');
    imgUserProfilePicture = document.querySelector('#imgUserProfilePicture');
    infoToast = document.querySelector('#info-toast');
    elOverview = document.querySelector('#elOverview');
    elNotes = document.querySelector('#elNotes');
    //
    if (Util.isUserLoginExpired(UserInfo.get(UserInfo.EXPIREDATE))) {
      app.route = 'login';
    } else {
      tbUsername.innerHTML = UserInfo.get(UserInfo.USERNAME);
      tbUserEmailAddress.innerHTML = UserInfo.get(UserInfo.EMAILADDRESS);
      imgUserProfilePicture.src = UserInfo.get(UserInfo.PROFILEIMAGE);
      //
      app.route = 'overview';
      //
      elOverview.reloadOverview();
      elNotes.reloadNotes();
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
        userName = Util.getUsernameFromMailAddress(userEmailAddress);
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
    // go to the home element
    app.route = 'overview';
    // Load Url and Note Collection
    elOverview.reloadOverview();
    elNotes.reloadNotes();
    // show toast to inform the user
    infoToast.text = 'User ' + userEmailAddress + ' is logged in!';
    infoToast.style.background = '#2EB82E';
    infoToast.style.color = '#EEEEEE';
    infoToast.toggle();
  };

  app.handleLoginFailed = function(e) {
    // show toast to inform the user
    var errorObj = e.detail;
    infoToast.text = 'Login failed! Please retry! Error Code: ' + errorObj.code + ', Error: ' + errorObj.message;
    infoToast.style.background = '#FF3333';
    infoToast.style.color = '#EEEEEE';
    infoToast.toggle();
  };

  app.handleLoginExpired = function() {
    infoToast.text = 'Login is expired! Please log in!';
    infoToast.style.background = '#FF3333';
    infoToast.style.color = '#EEEEEE';
    infoToast.toggle();
    //
    app.route = 'login';
  };

  app.handleRemoveItemSuccessful = function(e) {
    var successObj = e.detail;
    infoToast.text = 'URL Item ' + successObj.value + ' was successful';
    infoToast.style.background = '#2EB82E';
    infoToast.style.color = '#EEEEEE';
    infoToast.toggle();
  };

  app.handleRemoveItemFailed = function(e) {
    var errorObj = e.detail;
    infoToast.text = 'Remove URL Item is failed! Error: ' + errorObj.value;
    infoToast.style.background = '#FF3333';
    infoToast.style.color = '#EEEEEE';
    infoToast.toggle();
  };

  app.logoutUser = function() {
    infoToast.text = 'Logging out...';
    infoToast.toggle();
    //
    var rootRef = new Firebase('https://yeah-url-extension.firebaseio.com/');
    rootRef.unauth();
    // set Placedolder to toolbar menu
    tbUsername.innerHTML = 'Your Username...';
    tbUserEmailAddress.innerHTML = 'Your Emailaddress...';
    imgUserProfilePicture.src = '../images/touch/icon-128x128.png';
    //
    UserInfo.deleteAll();
    elOverview.clearListview();
    elNotes.clearListview();
    //
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
