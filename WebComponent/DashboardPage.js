const {By} = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
    }
    async navigate(baseURL){
        await this.driver.get(baseURL);
    }

    async verifyFeaturesItemsHeader() {
        const title = await this.driver.findElement(By.css(".features_items > .title"));
        return title.getText();
    }
}

module.exports = DashboardPage;