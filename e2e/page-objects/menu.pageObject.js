'use strict'

var Menu = function() {
    this.userAvatar = element.all(by.binding("user.firstName[0] + ' ' + user.lastName[0]"))
    this.userContainerArrow = element(by.css(".user-container > .down-grey-arrow"))
    this.logoutLink = element(by.binding('topbar.logout'))

    this.selectOptionFromUserDropdown = function(optionBinding) {
        return this.userContainerArrow.click().then(function() {
            element(by.binding(optionBinding)).click()
        })
    }

    this.logout = function() {
        this.userContainerArrow.click()
        this.logoutLink.click()
    }
};
module.exports = Menu;