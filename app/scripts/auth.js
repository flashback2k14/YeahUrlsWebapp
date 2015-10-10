class Auth {
  /**
   * auth with password
   * @param userObj
   * @return {Promise}
   */
  static authWithEmailaddress(userObj) {
    return new Promise((resolve, reject) => {
      let rootRef = new Firebase(Util.getBaseUrl());
      rootRef.authWithPassword(userObj, function onAuth(err, user) {
        if (err) reject(err);
        if (user) resolve(user);
      });
    })
  }
  /**
   * logout from firebase
   */
  static logout() {
    new Firebase(Util.getBaseUrl()).unauth();
  }
}
