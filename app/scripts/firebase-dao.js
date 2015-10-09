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
      dataRef.on('value', function(snapshot) {
        context.set(pathToItems, []);
        snapshot.forEach(function (child) {
          context.push(pathToItems, _extractKeywords(child.val(), pathToKeywords));
        });
        //_sortKeywords(pathToKeywords);
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
        context.push(pathToKeywords, '');
      }
      if (context.get(pathToKeywords).indexOf(kw) === -1) {
        context.push(pathToKeywords, kw);
      }
      return items;
    }

    /**
     * Sort Keyword Collection -> but not sorting :-/
     * @param pathToKeywords
     * @private
     */
    function _sortKeywords(pathToKeywords) {
      var arr = context.get(pathToKeywords);
      context.set(pathToKeywords, []);
      context.push(pathToKeywords, arr.sort());
    }

    /**
     * remove item from Collection
     * @param route
     * @param id
     * @param objId
     * @return {Promise}
     */
    function removeItemFromCollection(route, id, objId) {
      return new Promise(function(resolve, reject) {
        var ref = new Firebase(firebaseBaseUrl + uId + route + '/' + objId + '/' + id);
        var onComplete = function(error) {
          if (error) {
            reject(error);
          } else {
            resolve({'value':'remove was successful'});
          }
        };
        ref.remove(onComplete);
      });
    }
    /**
     * edit item in Collection
     * @param route
     * @param id
     * @param objId
     * @param item
     */
    function editItemFromCollection(route, id, objId, item) {
      return new Promise(function(resolve, reject) {
        var ref = new Firebase(firebaseBaseUrl + uId + route + '/' + objId + '/' + id);
        var onComplete = function(error) {
          if (error) {
            reject(error);
          } else {
            resolve({'value':'edit was successful'});
          }
        };
        ref.update(item, onComplete);
      });
    }
    /**
     * provide functions to the public
     */
    return {
      loadCollections           : loadCollections,
      removeItemFromCollection  : removeItemFromCollection,
      editItemFromCollection    : editItemFromCollection
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
