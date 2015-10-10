class Util {
  /**
   * Get Firebase Base URL
   * @return {string} BaseURL
   */
  static getBaseUrl() {
    return 'https://yeah-url-extension.firebaseio.com/';
  }
  /**
   * toggle single Menu Item
   * @param mItem
   * @private
   */
  static _toggleMI(mItem) {
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
  static toggleMenuItems(menuItemLogin, menuItemUrls, menuItemNotes) {
    Util._toggleMI(menuItemLogin);
    Util._toggleMI(menuItemUrls);
    Util._toggleMI(menuItemNotes);
  }
  /**
   * show info toast
   * @param toast
   * @param text
   * @param bgColor
   * @param color
   */
  static showToast(toast, text, bgColor, color) {
    toast.text = text;
    toast.style.background = bgColor;
    toast.style.color = color;
    toast.toggle();
  }
}
