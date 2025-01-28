const {By} = require('selenium-webdriver');

class FillPayment {
    constructor(driver) {
        this.driver = driver;
        this.cardName = By.css("[name='name_on_card']");
        this.cardNumber = By.css("[name='card_number']");
        this.expMonth = By.css("[name='expiry_month']");
        this.expYear = By.css("[name='expiry_year']");
        this.cvv = By.css("[name='cvc']");
        this.alert = By.css(".col-sm-9 > p");
        this.paymentSubmit = By.css("#submit");
        this.deleteAcc = By.css("[href='/delete_account']");
        this.deleteAlert = By.css("b");
        this.next = By.css(".btn-primary");
    }

    async fillPaymentDetails() {
        await this.driver.findElement(this.cardName).sendKeys("Rova Henryawan");
        await this.driver.findElement(this.cardNumber).sendKeys("1234567890123456");
        await this.driver.findElement(this.expMonth).sendKeys("12");
        await this.driver.findElement(this.expYear).sendKeys("2023");
        await this.driver.findElement(this.cvv).sendKeys("123");
    }
    async submitPayment() {
        await this.driver.findElement(this.paymentSubmit).click();
    }
    async verifyPaymentSuccess() {
        const title = await this.driver.findElement(this.alert).getText();
        return title;
    }
    async deleteAccount() {
        await this.driver.findElement(this.deleteAcc).click();
    }
    async deleteAccountAlert() {
        const title = await this.driver.findElement(this.deleteAlert).getText();
        return title;
    }
    async nextButton() {
        await this.driver.findElement(this.next).click();
    }
}

module.exports = FillPayment;