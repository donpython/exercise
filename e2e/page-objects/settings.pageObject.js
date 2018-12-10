'use strict'

var Settings = function() {
    this.addEmailButton = element(by.binding('buttons.addEmail'))
    this.changeEmailButton = element(by.binding('buttons.changeEmail'))
    this.changePasswordButton = element(by.binding('buttons.changePassword'))
    this.changePhoneNumberButton = element(by.binding('buttons.addPhoneNumber'))
    this.goBackButton = element(by.binding('buttons.exit'))
    this.saveButton = element(by.cssContainingText('button', 'Zapisz'))
    this.savePhoneNumberButton = element(by.binding('buttons.savePhoneNumber'))

    this.currentPasswordInputField = element(by.model('currentPassword'))
    this.newEmailAddressInputField = element(by.model('newEmail'))
    this.newPasswordInputField = element(by.model('newPassword'))
    this.newRepeatedPasswordInputField = element(by.model('repeatedPassword'))

    this.numberInputField = element(by.model('account.phoneNumber'))

    this.pageHeader = element(by.binding("settings.settings"))

    /* 
        As I mentioned in spec.js - the bindings buttons.addEmail and buttons.changeEmail are 
        always suitable for revealing Email Update/Change Form.
        Therefore I could use only one method for both actions, however I decided 
        to separate them.
    */
    this.addEmail = function(emailAddress, password) {
        return this.addEmailButton.click().then(() => {
            this.newEmailAddressInputField.sendKeys(emailAddress)
            this.currentPasswordInputField.sendKeys(password)
            this.saveButton.click()
        })
    }
    
    this.changeEmail = function(newEmailAddress, password) {
        return this.changeEmailButton.click().then(() => {
            this.newEmailAddressInputField.sendKeys(newEmailAddress)
            this.currentPasswordInputField.sendKeys(password)
            this.saveButton.click()
        })
    }

    this.changePassword = function(newPassword, currentPassword) {
        return this.changePasswordButton.click().then(() => {
            this.newPasswordInputField.sendKeys(newPassword)
            this.newRepeatedPasswordInputField.sendKeys(newPassword)
            this.currentPasswordInputField.sendKeys(currentPassword)
            this.saveButton.click()
        })
    }

    this.changePhoneNumber = function(phoneNumber) {
        return this.changePhoneNumberButton.click().then(() => {
            this.numberInputField.clear().then(() => {
                this.numberInputField.sendKeys(phoneNumber)
                this.savePhoneNumberButton.click()
            })
        })
    }
};
module.exports = Settings;