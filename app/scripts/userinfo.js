var UserInfo = function() {
  /**
   * local storage keys
   */
  this.USERID = 'Id';
  this.EXPIREDATE = 'ExpireDate';
  this.USERNAME = 'Username';
  this.EMAILADDRESS = 'EmailAddress';
  this.PROFILEIMAGE = 'ProfileImage';
};
/**
 * set user info to local storage
 * @param key
 * @param value
 */
UserInfo.prototype.set = function(key, value) {
  window.localStorage.setItem(key, value);
};
/**
 * get user info from local storage
 * @param key
 * @return {String, Number, Object}
 */
UserInfo.prototype.get = function(key) {
  return window.localStorage.getItem(key);
};
/**
 * remove specific user info from local storage
 * @param key
 */
UserInfo.prototype.deleteItem = function(key) {
  window.localStorage.removeItem(key);
};
/**
 * remove all user infos from local storage
 */
UserInfo.prototype.deleteAll = function() {
  window.localStorage.removeItem(UserInfo.USERID);
  window.localStorage.removeItem(UserInfo.EXPIREDATE);
  window.localStorage.removeItem(UserInfo.USERNAME);
  window.localStorage.removeItem(UserInfo.EMAILADDRESS);
  window.localStorage.removeItem(UserInfo.PROFILEIMAGE);
};
/**
 * util function to extract the user name from the emailaddress
 * @param email
 * @returns {String}
 */
UserInfo.prototype.getUsernameFromMailAddress = function(email) {
  return email.split('@')[0];
};
/**
 * get current timestamp
 * @return {number}
 * @private
 */
UserInfo.prototype._getCurrentTimestamp = function() {
  return Math.round(new Date().getTime() / 1000.0);
};
/**
 * check if user login is expired
 * @param expireDate
 * @return {boolean}
 */
UserInfo.prototype.isLoginExpired = function(expireDate) {
  return expireDate === null || this._getCurrentTimestamp() >= expireDate;
};
