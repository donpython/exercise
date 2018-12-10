'use strict'

var LoginForm = function() {
    this.username = element(by.model('usernameOrEmail'))
    this.password = element(by.model('password'))
    this.buttonNext = element(by.binding("'buttons.next' | translate"))

    this.inputAndConfirmUsername = function (usernameOrEmail) {
        this.username.sendKeys(usernameOrEmail)
        return this.buttonNext.click()
    }

    this.login = function(usernameOrEmail, password) {
        return this.inputAndConfirmUsername(usernameOrEmail).then(() => {
            this.password.sendKeys(password)
            this.buttonNext.click()
        })
    }

    this.loginUsingEnter = function(usernameOrEmail, password) {
        return this.username.sendKeys(usernameOrEmail).sendKeys(protractor.Key.ENTER).then(() => {
            this.password.sendKeys(password).sendKeys(protractor.Key.ENTER)
        })
    }
};
module.exports = LoginForm;