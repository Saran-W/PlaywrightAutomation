const {test,expect} = require('@playwright/test');

// Quiz automate this page https://rahulshettyacademy.com/client

// test('Client registration test', async ({page}) => {
//     await page.goto('https://rahulshettyacademy.com/client');
//     console.log(await page.title());
//     await page.locator('.text-reset').click();
//     await page.locator('#firstName').type(Saran);
//     await page.locator('#lastName').type(Saran);
//     await page.locator('#userEmail').type(Saran);
//     await page.locator('#userMobile').type(Saran);
//     await page.locator('#userMobile').type(Saran);
//     await page.click('[formcontrolname="occupation"]');
//     await page.selectOption('[formcontrolname="occupation"]', { value: '1: Doctor' });
//     const alloptions = await page.selectOption('[formcontrolname="occupation"]', { value: '1: Doctor' });
//     console.log (alloptions);
//     // await page.click('[formcontrolname="occupation"]');
//     // await page.selectOption('[formcontrolname="occupation"]', { label: 'Doctor' }); 
//     await page.click('[value="Female"]');
//     await page.locator('#userPassword').type('Test@123456');
//     await page.locator('#confirmPassword').type('Test@123456');
//     await page.click('[type="checkbox"]');
//     await page.locator('#login').click();

// });

test.only('Client login test', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle'); //when all the call are made and everything open on a page 
    const titles= await page.locator(".card-body b").allTextContents();
    console.log(titles);


});