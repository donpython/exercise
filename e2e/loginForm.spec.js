var LoginForm = require('./page-objects/loginForm.pageObject');
var Menu = require('./page-objects/menu.pageObject');
var Settings = require('./page-objects/settings.pageObject');
var Notifications = require('./page-objects/notifications.pageObject')
var EC = protractor.ExpectedConditions;

describe("NUADU LoginForm ", function() {

    var loginForm = new LoginForm();
    var notifications = new Notifications()

    /*
    Helper variables below.
    They are used both for fulfilling the forms and reverting the state of User Account Settings
    */

    var loginName = "01597075"
    var wrongPassword = "wrongPassword"
    var email = "piotr.juchniewicz@gmail.com"
    var password = "zadanierekrutacyjne"

    beforeAll(function() {
        browser.driver.manage().window().maximize();
    });

    beforeEach(function() {
        /*
        I found that many apps follow the idea to logout the user on /login route.
        Nuadu is not working this way, although when user passes wrong credentials (s)he log outs automatically.
        Therefore I used it as a quick solution for clearing up notifications - that's why in this test suite you won't 
        find clearNotification() method used.
        */
        browser.get('https://app.nuadu.pl/login');
    });

    it('should not login using wrong password', function() {
        loginForm.login(loginName, wrongPassword).then(() => {
            expect(notifications.wrongUsernameOrPasswordNotification.isDisplayed()).toBeTruthy()
        })
    });

    it('should inform about disallowed characters in email address', function() {
        loginForm.inputAndConfirmUsername('1fds@@gmail.com').then(function() {
            expect(notifications.wrongEmailFormatNotification.isDisplayed()).toBeTruthy()
        })
    });

    it('should login with uppercased email', function() {
        loginForm.login(email.toUpperCase(), password).then(() => {
            expect(notifications.loginConfirmNotification.isDisplayed()).toBeTruthy()
        })
    });

    it('should login using enter', function() {
        loginForm.loginUsingEnter(loginName, password).then(function() {
            expect(notifications.getCurrentNotification().getText()).toEqual(notifications.loginConfirmMessage)
        })
    })

});