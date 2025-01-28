const {By} = require('selenium-webdriver');

class AddProduct {
    constructor(driver) {
        this.driver = driver;
        this.addcartBtn = By.css(".features_items .productinfo > [data-product-id='1']");
        this.viewCart = By.css("u");
        this.cartBtn = By.css("[href='/view_cart']");
        this.proceedCo = By.css(".check_out");
        this.registerBtn = By.css("p:nth-of-type(2) u");
        this.description = By.css("[name='message']");
    }

    async addcartButton(){
        await this.driver.findElement(this.addcartBtn).click();
    }
    async cartButton(){
        await this.driver.findElement(this.cartBtn).click();
    }
    async viewCartPage(){
        await this.driver.findElement(this.viewCart).click();
    }
    async COProceed(){
        await this.driver.findElement(this.proceedCo).click();
    }
    async registerButton(){
        await this.driver.findElement(this.registerBtn).click();
    }
    async fillDescription(){
        await this.driver.findElement(this.description).sendKeys("Test");
    }
}

module.exports = AddProduct;