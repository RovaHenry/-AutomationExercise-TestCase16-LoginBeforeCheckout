const {By} = require('selenium-webdriver');

class FormRegisPage {
    constructor(driver) {
        this.driver = driver;
        this.enterAccHeader = By.css(".login-form > .title > b");
        this.mrClick = By.css("[value='Mr']");
        this.passwordInput = By.xpath("//input[@id='password']");
        this.daysInput = By.css("#days");
        this.monthsInput = By.css("#months");
        this.yearsInput = By.css("#years");
        this.newsletterInput = By.css("#newsletter");
        this.specialOfferInput = By.css("#optin");
        this.firstNameInput = By.css("#first_name");
        this.lastNameInput = By.css("#last_name");
        this.companyInput = By.css("#company");
        this.address1Input = By.css("[data-qa='address']");
        this.address2Input = By.css("[data-qa='address2']");
        this.countryInput = By.css("#country");
        this.stateInput = By.css("#state");
        this.cityInput = By.css("#city");
        this.zipcodeInput = By.css("#zipcode");
        this.phoneInput = By.css("#mobile_number");
        this.createButton = By.css("[data-qa='create-account']");
        this.accCreated = By.xpath("//b[.='Account Created!']");
        this.continue = By.css(".btn-primary");


    }
    async selectMr() {
        await this.driver.findElement(this.mrClick).click();
    }
    async newsletter() {
        await this.driver.findElement(this.newsletterInput).click();
    }
    async specialOffer() {
        await this.driver.findElement(this.specialOfferInput).click();
    }

    async fillForm(password) {
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.daysInput).sendKeys('1');
        await this.driver.findElement(this.monthsInput).sendKeys('1');
        await this.driver.findElement(this.yearsInput).sendKeys('1999');
        await this.driver.findElement(this.firstNameInput).sendKeys('Rova');
        await this.driver.findElement(this.lastNameInput).sendKeys('Henryawan');
        await this.driver.findElement(this.address1Input).sendKeys('Jl. Menur Raya 2A Gubeng, Surabaya, Jawa Timur');
        await this.driver.findElement(this.address2Input).sendKeys('India');
        await this.driver.findElement(this.countryInput).sendKeys('India');
        await this.driver.findElement(this.companyInput).sendKeys('RovaCompany');
        await this.driver.findElement(this.stateInput).sendKeys('India');
        await this.driver.findElement(this.cityInput).sendKeys('Surabaya');
        await this.driver.findElement(this.zipcodeInput).sendKeys('12345');
        await this.driver.findElement(this.phoneInput).sendKeys('08123456789');
    }
    async create() {
        await this.driver.findElement(this.createButton).click();
    }
    async verifyEnterAccHeader() {
        const title = await this.driver.findElement(this.enterAccHeader).getText();
        return title;
    }
    async verifyAccCreated() {
        const title = await this.driver.findElement(this.accCreated).getText();
        return title;
    }
    async continue() {
        await this.driver.findElement(this.continue).click();
    }
}

module.exports = FormRegisPage;