var FirebaseDAO = (function() {
  /**
   * Instance stores a reference to the Singleton
   */
  var instance;
  /**
   * public Util functions
   * @return {*}
   */
  function init(component, userId) {
    /**
     * get context from element
     */
    var context = component;
    /**
     * User Login ID
     */
    var uId = userId;
    /**
     * firebase base URL
     */
    var firebaseBaseUrl = 'https://yeah-url-extension.firebaseio.com/';
    /**
     * load Collection
     * @param route
     * @param pathToItems
     * @param pathToKeywords
     */
    function loadCollections(route, pathToItems, pathToKeywords) {
      var dataRef = new Firebase(firebaseBaseUrl + uId + route);
      dataRef.on("value", function(snapshot) {
        context.set(pathToItems, []);
        snapshot.forEach(function (child) {
          context.push(pathToItems, _extractKeywords(child.val(), pathToKeywords));
        });
      });
    }
    /**
     * extract keywords from urlcollections
     * @param items
     * @param pathToKeywords
     * @private
     */
    function _extractKeywords(items, pathToKeywords) {
      var kw = items[0].keywords;
      if (context.get(pathToKeywords).length === 0) {
        context.push(pathToKeywords, "");
      }
      if (context.get(pathToKeywords).indexOf(kw) === -1) {
        context.push(pathToKeywords, kw);
      }
      return items;
    }
    /**
     * remove it from Collection
     * @param route
     * @param id
     * @param objId
     * @return {Promise}
     * @private
     */
    function removeItemFromCollection(route, id, objId) {
      return new Promise(function(resolve, reject) {
        var ref = new Firebase(firebaseBaseUrl + uId + route + '/' + objId + '/' + id);
        var onComplete = function(error) {
          if (error) {
            reject(error);
          } else {
            resolve({'value':'remove successful'});
          }
        };
        ref.remove(onComplete);
      });
    }
    /**
     * provide functions to the public
     */
    return {
      loadCollections           : loadCollections,
      removeItemFromCollection  : removeItemFromCollection
    };
  }

  return {
    /**
     * Get the Singleton instance if one exists
     * or create one if it doesn't
     * @return {Object} instance
     */
    getInstance: function(component, uId) {
      if (!instance) {
        instance = init(component, uId);
      }
      return instance;
    }
  };
})();
