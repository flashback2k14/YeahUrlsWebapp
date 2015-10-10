var Util = (function() {
  /**
   * Instance stores a reference to the Singleton
   */
  var instance;
  /**
   * public Util functions
   * @return {{toggleMenuItems: toggleMenuItems}}
   */
  function init() {
    /**
     * toggle single Menu Item
     * @param mItem
     * @private
     */
    function _toggleMI(mItem) {
      if (mItem.classList.contains('show-menu-item')) {
        mItem.classList.remove('show-menu-item');
        mItem.classList.add('hide-menu-item');
      } else {
        mItem.classList.remove('hide-menu-item');
        mItem.classList.add('show-menu-item');
      }
    }
    /**
     * toggle all Menu Items
     * @param menuItemLogin
     * @param menuItemUrls
     * @param menuItemNotes
     */
    function toggleMenuItems(menuItemLogin, menuItemUrls, menuItemNotes) {
      _toggleMI(menuItemLogin);
      _toggleMI(menuItemUrls);
      _toggleMI(menuItemNotes);
    }
    /**
     * show info toast
     * @param toast
     * @param text
     * @param bgColor
     * @param color
     */
    function showToast(toast, text, bgColor, color) {
      toast.text = text;
      toast.style.background = bgColor;
      toast.style.color = color;
      toast.toggle();
    }
    /**
     * provide functions to the public
     */
    return {
      toggleMenuItems : toggleMenuItems,
      showToast       : showToast
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
