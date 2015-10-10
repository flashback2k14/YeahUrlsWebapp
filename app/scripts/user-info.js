class UserInfo {
  /**
   * local storage keys
   */
  constructor() {
    this._userObject = 'UserObj';
    this._userId = 'Id';
    this._expireDate = 'ExpireDate';
    this._userName = 'Username';
    this._emailAddress = 'EmailAddress';
    this._profileImage = 'ProfileImage';
  }

  get userObject() {
    return this._userObject;
  }

  get userId() {
    return this._userId;
  }

  get expireDate() {
    return this._expireDate;
  }

  get userName() {
    return this._userName;
  }

  get emailAddress() {
    return this._emailAddress;
  }

  get profileImage() {
    return this._profileImage;
  }

  /**
   * set user info to local storage
   * @param key
   * @param value
   */
  setInfo(key, value) {
    window.localStorage.setItem(key, value);
  }
  /**
   * get user info from local storage
   * @param key
   * @return {String, Number, Object}
   */
  getInfo(key) {
    return window.localStorage.getItem(key);
  }
  /**
   * remove specific user info from local storage
   * @param key
   */
  deleteItem(key) {
    window.localStorage.removeItem(key);
  }
  /**
   * remove all user infos from local storage
   */
  deleteAllItems() {
    this.deleteItem(this._userObject);
    this.deleteItem(this._userId);
    this.deleteItem(this._expireDate);
    this.deleteItem(this._userName);
    this.deleteItem(this._emailAddress);
    this.deleteItem(this._profileImage);
  }
  /**
   * util function to extract the user name from the emailaddress
   * @param email
   * @returns {String}
   */
  getUsernameFromMailAddress(email) {
    return email.split('@')[0];
  }
  /**
   * get current timestamp
   * @return {number}
   * @private
   */
  _getCurrentTimestamp() {
    return Math.round(new Date().getTime() / 1000.0);
  }
  /**
   * check if user login is expired
   * @param expireDate
   * @return {boolean}
   */
  isLoginExpired(expireDate) {
    return expireDate === null || this._getCurrentTimestamp() >= expireDate;
  }
}




//var UserInfo = (function() {
//  /**
//   * local storage keys
//   */
//  var USEROBJECT = 'UserObj';
//  var USERID = 'Id';
//  var EXPIREDATE = 'ExpireDate';
//  var USERNAME = 'Username';
//  var EMAILADDRESS = 'EmailAddress';
//  var PROFILEIMAGE = 'ProfileImage';
//  /**
//   * set user info to local storage
//   * @param key
//   * @param value
//   */
//  function set(key, value) {
//    window.localStorage.setItem(key, value);
//  }
//  /**
//   * get user info from local storage
//   * @param key
//   * @return {String, Number, Object}
//   */
//  function get(key) {
//    return window.localStorage.getItem(key);
//  }
//  /**
//   * remove specific user info from local storage
//   * @param key
//   */
//  function deleteItem(key) {
//    window.localStorage.removeItem(key);
//  }
//  /**
//   * remove all user infos from local storage
//   */
//  function deleteAllItems() {
//    deleteItem(USEROBJECT);
//    deleteItem(USERID);
//    deleteItem(EXPIREDATE);
//    deleteItem(USERNAME);
//    deleteItem(EMAILADDRESS);
//    deleteItem(PROFILEIMAGE);
//  }
//  /**
//   * util function to extract the user name from the emailaddress
//   * @param email
//   * @returns {String}
//   */
//  function getUsernameFromMailAddress(email) {
//    return email.split('@')[0];
//  }
//  /**
//   * get current timestamp
//   * @return {number}
//   * @private
//   */
//  function _getCurrentTimestamp() {
//    return Math.round(new Date().getTime() / 1000.0);
//  }
//  /**
//   * check if user login is expired
//   * @param expireDate
//   * @return {boolean}
//   */
//  function isLoginExpired(expireDate) {
//    return expireDate === null || _getCurrentTimestamp() >= expireDate;
//  }
//  /**
//   * make const variables and functions public
//   */
//  return {
//    USEROBJECT    : USEROBJECT,
//    USERID        : USERID,
//    EXPIREDATE    : EXPIREDATE,
//    USERNAME      : USERNAME,
//    EMAILADDRESS  : EMAILADDRESS,
//    PROFILEIMAGE  : PROFILEIMAGE,
//    set             : set,
//    get             : get,
//    deleteItem      : deleteItem,
//    deleteAllItems  : deleteAllItems,
//    getUsernameFromMailAddress : getUsernameFromMailAddress,
//    isLoginExpired  : isLoginExpired
//  };
//})();
