'use strict';

var FirebaseDAO = function FirebaseDAO(component, uId) {
  /**
   * Constuctor
   * context          = get context from element
   * userId           = User Login ID
   * firebaseBaseUrl  = firebase base URL
   */
  this.context = component;
  this.userId = uId;
  this.firebaseBaseUrl = 'https://yeah-url-extension.firebaseio.com/';

  this.test = [""];
};

/**
 * load Collection
 * @param route
 * @param pathToItems
 * @param pathToKeywords
 */
FirebaseDAO.prototype.loadCollections = function (route, pathToItems, pathToKeywords) {
  var dataRef = new Firebase(this.firebaseBaseUrl + this.userId + route);
  dataRef.on('value', (function (snapshot) {
    this.context.set(pathToItems, []);
    this.context.set(pathToKeywords, []);
    snapshot.forEach((function (child) {
      this.context.push(pathToItems, this._extractKeywords(child.val(), pathToKeywords));
    }).bind(this));
    //this._sortKeywords(pathToKeywords);
  }).bind(this));
};

/**
 * extract keywords from collections
 * @param items
 * @param pathToKeywords
 * @private
 */
FirebaseDAO.prototype._extractKeywords = function (items, pathToKeywords) {
  var kw = items[0].keywords;
  if (this.context.get(pathToKeywords).length === 0) {
    this.context.push(pathToKeywords, '');
  }
  if (this.context.get(pathToKeywords).indexOf(kw) === -1) {
    this.context.push(pathToKeywords, kw);
  }
  //if (this.test.indexOf(kw) === -1) {
  //  this.test.push(kw);
  //  this.test.sort();
  //}

  return items;
};

/**
 * sort keywords from collections
 * @param pathToKeywords
 * @private
 */
FirebaseDAO.prototype._sortKeywords = function (pathToKeywords) {
  var arr = this.context.get(pathToKeywords);
  this.context.set(pathToKeywords, []);
  this.context.set(pathToKeywords, arr.sort());
  //this.context.set(pathToKeywords, this.test);
};

/**
 * remove item from Collection
 * @param route
 * @param id
 * @param objId
 * @return {Promise}
 */
FirebaseDAO.prototype.removeItemFromCollection = function (route, id, objId) {
  return new Promise((function (resolve, reject) {
    var ref = new Firebase(this.firebaseBaseUrl + this.userId + route + '/' + objId + '/' + id);
    var onComplete = function onComplete(error) {
      if (error) {
        reject(error);
      } else {
        resolve({ 'value': 'remove was successful' });
      }
    };
    ref.remove(onComplete);
  }).bind(this));
};

/**
 * edit item in Collection
 * @param route
 * @param id
 * @param objId
 * @param item
 */
FirebaseDAO.prototype.editItemFromCollection = function (route, id, objId, item) {
  return new Promise((function (resolve, reject) {
    var ref = new Firebase(this.firebaseBaseUrl + this.userId + route + '/' + objId + '/' + id);
    var onComplete = function onComplete(error) {
      if (error) {
        reject(error);
      } else {
        resolve({ 'value': 'edit was successful' });
      }
    };
    ref.update(item, onComplete);
  }).bind(this));
};

//# sourceMappingURL=firebase-prototype-dao-compiled.js.map