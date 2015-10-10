var Auth = (function() {
  /**
   * Instance stores a reference to the Singleton
   */
  var instance;
  /**
   * public Util functions
   * @return {*}
   */
  function init() {
    /**
     * firebase base URL
     */
    var firebaseBaseUrl = 'https://yeah-url-extension.firebaseio.com/';
    /**
     * auth with password
     * @param userObj
     * @return {Promise}
     */
    function authWithPassword(userObj) {
      return new Promise(function(resolve, reject) {
        var rootRef = new Firebase(firebaseBaseUrl);
        rootRef.authWithPassword(userObj, function onAuth(err, user) {
          if (err) reject(err);
          if (user) resolve(user);
        });
      });
    }
    /**
     * logout from firebase
     */
    function logout() {
      new Firebase(firebaseBaseUrl).unauth();
    }
    /**
     * provide functions to the public
     */
    return {
      authWithPassword : authWithPassword,
      logout: logout
    };
  }

  return {
    /**
     * Get the Singleton instance if one exists
     * or create one if it doesn't
     * @return {Object} instance
     */
    getInstance: function() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();
