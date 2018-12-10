'use strict'

var Notifications = function() {
    /*
    I know that this page object should be cleaned up - ex. I could use only getCurrentNotification() and compare it to *Message
    which would be much cleaner but it's 3 AM and I am currently sleeping, sorry
    Let's say I wanted to show you that there are always different paths to go :))
    */
    this.passwordChangeMessage = 'Hasło zostało zmienione'
    this.emailChangeMessage = 'Wysłaliśmy link aktywacyjny, który jest ważny 24 godziny.'
    this.loginConfirmMessage = 'Witamy w NUADU :-)'
    this.wrongPhoneNumberFormatMessage = 'Numer telefonu może zawierać tylko cyfry i -.'
    this.wrongUsernameOrPasswordMessage = "Błędny login lub hasło. Sprawdź czy dobrze je wpisujesz lub napisz do nas na czacie."
    this.wrongEmailFormatMessage = "Takiego adresu email jeszcze nie widzieliśmy, sprawdź czy nie ma w nim błędów."
    this.wrongPasswordMessage = "Błędne hasło. Spróbuj ponownie lub spróbuj odzyskać hasło."
    this.tooLongPasswordMessage = "messages.error.invalidSize.newPassword" // I guess it would have another value in the real world
    this.humanUnfriendlyTooLongPasswordMessage = "messages.error.invalidSize.newPassword" //  Oh, not wrong.. Just not "humanized" :-)
    this.tooShortPasswordMessage = "To hasło jest za krótkie, wymyśl hasło z minimum 8 znaków."

    this.getNotificationContainingText = function (notificationText) {
        return element(by.cssContainingText('.growl-message', notificationText))
    }

    this.emailChangeNotification = this.getNotificationContainingText(this.emailChangeMessage)
    this.passwordChangeNotification = this.getNotificationContainingText(this.passwordChangeMessage)
    this.loginConfirmNotification = this.getNotificationContainingText(this.loginConfirmMessage)
    this.emailChangeNotification = this.getNotificationContainingText(this.emailChangeMessage)
    this.wrongPhoneNumberFormatNotification = this.getNotificationContainingText(this.wrongPhoneNumberFormatMessage)
    this.wrongUsernameOrPasswordNotification = this.getNotificationContainingText(this.wrongUsernameOrPasswordMessage)
    this.wrongEmailFormatNotification = this.getNotificationContainingText(this.wrongEmailFormatMessage)
    this.wrongPasswordNotification = this.getNotificationContainingText(this.wrongPasswordMessage)
    this.tooLongPasswordNotification = this.getNotificationContainingText(this.humanUnfriendlyTooLongPasswordMessage)
    this.tooShortPasswordNotification = this.getNotificationContainingText(this.tooShortPasswordMessage)
    this.allNotifications = element.all(by.css('.growl-message'))

    this.getCurrentNotification = function () {
        return element(by.css('.growl-message'))
    }

    this.closeCurrentNotification = function () {
        return element(by.css('.growl-item > .close')).click()
    }

};
module.exports = Notifications;