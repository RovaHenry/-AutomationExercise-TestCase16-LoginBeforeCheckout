const {By} = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.registerMenu = By.css("[href='/login']");
        this.passwordInput = By.css("[name='password']");
        this.emailInput = By.css("[data-qa='login-email']");
        this.loginBtn = By.css("[data-qa='login-button']");
        this.loginAsUser = By.css("li:nth-of-type(10) > a");
    }

    async login(email, password) {
        await this.driver.findElement(this.emailInput).sendKeys(email);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginBtn).click();
    }
    async registerPageMenu() {
        await this.driver.findElement(this.registerMenu).click();
    }
    async verifyUserLogin() {
        const title = await this.driver.findElement(this.loginAsUser).getText();
        return title;
    }
}

module.exports = LoginPage;