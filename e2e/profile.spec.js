var LoginForm = require('./page-objects/loginForm.pageObject');
var Menu = require('./page-objects/menu.pageObject');
var Settings = require('./page-objects/settings.pageObject');
var Notifications = require('./page-objects/notifications.pageObject')

describe("NUADU Profile ", function() {

    var loginForm = new LoginForm();
    var menu = new Menu();
    var settings = new Settings()
    var notifications = new Notifications()

    /*
    Helper variables below.
    They are used both for fulfilling the forms and reverting the state of User Account Settings
    */

    var loginName = "01597075"
    var newPasswordToBeSet = "test1234"
    var emailToBeSet = "piotr.juchniewicz@gmail.com"
    var password = "zadanierekrutacyjne"

    beforeAll(function() {
        browser.driver.manage().window().maximize();
        browser.get('https://app.nuadu.pl/login');
    });

    it('should login using username', function() {
        loginForm.login(loginName, password).then(() => {
            expect(notifications.loginConfirmNotification.isDisplayed()).toBeTruthy()
            expect(menu.userAvatar.getText()).toContain("S T")
        })
    });

    it('should navigate to Settings page', function() {
        menu.selectOptionFromUserDropdown("topbar.settings").then(
            expect(settings.pageHeader.getText()).toEqual('Ustawienia')
        )
    });

    /* 
    email change/add requires the confirmation link sent to new email address to be clicked
    Next actions assume that email address is confirmed as soon as user requests change
    */

    it('should save email address', function() {
        /* 
        ng-bind value of (add/change)Email button is: account.email === null ? 'buttons.addEmail' : 'buttons.changeEmail' | translate
        The condition should evaluate to true - email is set when I am writing this comment - however it works both for (add/change)Email
        Maybe it's because my lack of knowledge about Angular, although I consider this important to note down
        */
        settings.addEmail(emailToBeSet, password).then(() => {
            expect(notifications.emailChangeNotification.isDisplayed()).toBeTruthy()
            expect(element(by.cssContainingText('.account-details-box > span', emailToBeSet)))
        })
    })

    it('should change email address', function() {
        settings.changeEmail(emailToBeSet, password).then(() => {
            expect(notifications.emailChangeNotification.isDisplayed()).toBeTruthy()
            expect(element(by.cssContainingText('.account-details-box > span', emailToBeSet)))
        })
    })

    it('should change password', function() {
        settings.changePassword(newPasswordToBeSet, password).then(function() {
            expect(notifications.passwordChangeNotification.isDisplayed()).toBeTruthy()
        })
    })

    it('should logout', function() {
        menu.logout()
        expect(element(by.binding('loginSteps.loginForm.loginNote')).getText()).toEqual('Zaloguj się')
    })

    it('should login using new email and new password', function() {
        loginForm.login(emailToBeSet, newPasswordToBeSet)
        expect(menu.userAvatar.getText()).toContain("S T")
        expect(notifications.loginConfirmNotification.isDisplayed()).toBeTruthy()
    })

    it('should set up password to default', function() {
        menu.selectOptionFromUserDropdown("topbar.settings")
        settings.changePassword(password, newPasswordToBeSet).then(function() {
            expect(notifications.passwordChangeNotification.isDisplayed()).toBeTruthy()
        })
    })
 
});