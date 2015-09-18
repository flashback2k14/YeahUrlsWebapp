var UserInfo = (function() {
  /**
   * local storage keys
   */
  var USEROBJECT = 'UserObj';
  var USERID = 'Id';
  var EXPIREDATE = 'ExpireDate';
  var USERNAME = 'Username';
  var EMAILADDRESS = 'EmailAddress';
  var PROFILEIMAGE = 'ProfileImage';
  /**
   * set user info to local storage
   * @param key
   * @param value
   */
  function set(key, value) {
    window.localStorage.setItem(key, value);
  }
  /**
   * get user info from local storage
   * @param key
   * @return {String, Number, Object}
   */
  function get(key) {
    return window.localStorage.getItem(key);
  }
  /**
   * remove specific user info from local storage
   * @param key
   */
  function deleteItem(key) {
    window.localStorage.removeItem(key);
  }
  /**
   * remove all user infos from local storage
   */
  function deleteAllItems() {
    deleteItem(USEROBJECT);
    deleteItem(USERID);
    deleteItem(EXPIREDATE);
    deleteItem(USERNAME);
    deleteItem(EMAILADDRESS);
    deleteItem(PROFILEIMAGE);
  }
  /**
   * util function to extract the user name from the emailaddress
   * @param email
   * @returns {String}
   */
  function getUsernameFromMailAddress(email) {
    return email.split('@')[0];
  }
  /**
   * get current timestamp
   * @return {number}
   * @private
   */
  function _getCurrentTimestamp() {
    return Math.round(new Date().getTime() / 1000.0);
  }
  /**
   * check if user login is expired
   * @param expireDate
   * @return {boolean}
   */
  function isLoginExpired(expireDate) {
    return expireDate === null || _getCurrentTimestamp() >= expireDate;
  }
  /**
   * make const variables and functions public
   */
  return {
    USEROBJECT    : USEROBJECT,
    USERID        : USERID,
    EXPIREDATE    : EXPIREDATE,
    USERNAME      : USERNAME,
    EMAILADDRESS  : EMAILADDRESS,
    PROFILEIMAGE  : PROFILEIMAGE,
    set             : set,
    get             : get,
    deleteItem      : deleteItem,
    deleteAllItems  : deleteAllItems,
    getUsernameFromMailAddress : getUsernameFromMailAddress,
    isLoginExpired  : isLoginExpired
  };
})();
