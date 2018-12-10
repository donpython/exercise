var LoginForm = require('./page-objects/loginForm.pageObject');
var Settings = require('./page-objects/settings.pageObject');
var Notifications = require('./page-objects/notifications.pageObject')

describe("NUADU Settings Page ", function() {

    var loginForm = new LoginForm();
    var settings = new Settings()
    var notifications = new Notifications()

    /*
    Helper variables below.
    They are used both for fulfilling the forms and reverting the state of User Account Settings
    */

    var loginName = "01597075"
    var password = "zadanierekrutacyjne"

    beforeAll(function() {
        browser.driver.manage().window().maximize();
        browser.get('https://app.nuadu.pl/login');
        loginForm.login(loginName, password).then(() => {
            notifications.closeCurrentNotification()
        })
    });

    beforeEach(function() {
        browser.get('https://app.nuadu.pl/account/settings')
    })

    it('should not allow to save wrong formatted email', function() {
        /* 
        ng-bind value of (add/change)Email button is: account.email === null ? 'buttons.addEmail' : 'buttons.changeEmail' | translate
        The condition should evaluate to true - email is set when I am writing this comment - however it works both for (add/change)Email
        Maybe it's because my lack of knowledge about Angular, although I consider this important to note down
        */
        settings.addEmail("1fds@@gmail.com", password).then(() => {
            expect(notifications.wrongEmailFormatNotification.isDisplayed()).toBeTruthy()
        })

    })

    it('should not allow to save number as email address', function() {
        settings.changeEmail(032143, password).then(() => {
            expect(notifications.wrongEmailFormatNotification.isDisplayed()).toBeTruthy()
        })
    })

    it('should display human readable message when user try to save too long password', function() {
        settings.changePassword(123456789123456789123, password).then(() => {
            expect(notifications.getCurrentNotification().getText()).not.toEqual(notifications.humanUnfriendlyTooLongPasswordMessage)
        })
    })

    it('should not allow to change password when providing wrong current password value', function() {
        settings.changePassword("test1234", "wrongPassword").then(function() {
            expect(notifications.wrongPasswordNotification.isDisplayed()).toBeTruthy()
        })
    })

    it('should display human readable message when user try to save too short password', function() {
        settings.changePassword("123", password).then(() => {
            expect(notifications.getCurrentNotification().getText()).toEqual(notifications.tooShortPasswordMessage)
        })
    })

     // Additional negative tests for telephone number insertion 
     it('should not allow to save string as telephone number', function() {
        settings.changePhoneNumber('siedemDwaSiedem').then(() => {
            expect(notifications.wrongPhoneNumberFormatNotification.isDisplayed()).toBeTruthy()
        })
    })

    it('should not allow to save special characters as telephone number', function() {
        settings.changePhoneNumber('#!@$!#@').then(() => {
            expect(notifications.wrongPhoneNumberFormatNotification.isDisplayed()).toBeTruthy()
        })
    })

    it('should not allow to save number with less than 9 characters', function() {
        // Test assumes that application is used only in Poland where length is unified to 9 characters
        settings.changePhoneNumber(41236).then(() => {
            expect(notifications.wrongPhoneNumberFormatNotification.isDisplayed()).toBeTruthy()
        })
    })

});