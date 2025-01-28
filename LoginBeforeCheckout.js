const {Builder, By} = require('selenium-webdriver');
const LoginPage = require ('./WebComponent/LoginPage');
const DashboardPage = require ('./WebComponent/DashboardPage');
const AddProduct = require ('./WebComponent/AddProduct');
const FillPayment = require ('./WebComponent/FillPayment');

const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseURL = process.env.BASE_URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

const elementsToVerify = [
    { locator: By.css("#address_delivery > .address_firstname"), expectedValue: ". Rova Henryawan" },
    { locator: By.css("#address_delivery > li:nth-of-type(3)"), expectedValue: "RovaCompany" },
    { locator: By.css("#address_delivery > li:nth-of-type(4)"), expectedValue: "Tritunggal, Tesan, RT13/RW06, Kec.Babat, Kab.Lamongan, Jawa Timur" },
    { locator: By.css("#address_delivery > .address_city"), expectedValue: "Surabaya JAWA TIMUR 62271" },
    { locator: By.css("#address_delivery > .address_country_name"), expectedValue: "India" },
    { locator: By.css("#address_delivery > .address_phone"), expectedValue: "085156208670" },
];

describe('TestCase 16 [Login Before Checkout]', function(){
    this.timeout(50000);
    let driver;

    switch (browser) {
        case 'chrome' :
        default :
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            // options.addArguments('--headless');
        break;
    }

    //Run setiap mulai test, satu kali saja paling awal
    before(async function () {
        //Run tanpa membuka chorome dengan menggunakan --headless
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    it('Verify dashboard', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.navigate(baseURL);
        const dashboardTitle = await dashboardPage.verifyFeaturesItemsHeader();
        assert.strictEqual(dashboardTitle, 'FEATURES ITEMS','We are not in dashboard page');   
    });

    it('Login as user', async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.registerPageMenu();
        await loginPage.login(email, password);
        await loginPage.verifyUserLogin();
    });
    
    it('Add Product', async function () {
        const addProduct = new AddProduct(driver);
        await addProduct.addcartButton();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await addProduct.viewCartPage();
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, `${baseURL}/view_cart`, 'URL does not match');
        await addProduct.COProceed();
        await new Promise(resolve => setTimeout(resolve, 2000));
    });

    it('Proceed to CheckOut', async function () {
        const addProduct2 = new AddProduct(driver);
        await addProduct2.cartButton();
        await addProduct2.COProceed();
        elementsToVerify.forEach(async (element) => {
            const actualValue = await driver.findElement(element.locator).getText();
            if (actualValue === element.expectedValue) {
                console.log(`Verification passed for: "${element.expectedValue}" and got ${actualValue}`);
            } else {
                console.error(`Verification failed for: "${element.expectedValue}", Got: ${actualValue}`);
            }
        });
        await addProduct2.fillDescription();
        await addProduct2.COProceed();
    });

    it('Fill Payment Details', async function () {
        const fillPayment = new FillPayment(driver);
        await fillPayment.fillPaymentDetails();
        await fillPayment.submitPayment();
        const succesAlert = await fillPayment.verifyPaymentSuccess();
        assert.strictEqual(succesAlert, 'Congratulations! Your order has been confirmed!', 'Payment not success');
        await fillPayment.deleteAccount();
        const deleteAlert = await fillPayment.deleteAccountAlert();
        assert.strictEqual(deleteAlert, 'ACCOUNT DELETED!', 'Delete account not success');
        await fillPayment.nextButton();
    });

    //Assertion atau validasi
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log('Screenshot succesfully saved');
    });
    
    after(async function () {
        await driver.quit()
    });
});